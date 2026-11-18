import { randomUUID } from "node:crypto";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { submitProductEnquiry } from "@/lib/actions/enquiries";
import { designBudgets, designCountryCodes, designJewelleryTypes, designReferenceTypes, maxDesignFileSize, maxDesignMessageLength } from "@/lib/design-enquiry";
import type { ProductSelection } from "@/lib/enquiries";
import { getImageUrl } from "@/lib/imageUrl";
import { getS3Client, getS3Location, isS3Configured } from "@/lib/s3";

export const runtime = "nodejs";

const requests = new Map<string, { count: number; expires: number }>();

export async function POST(request: Request) {
  const fail = (error: string, status = 400) => Response.json({ success: false, error }, { status });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return fail("Please submit your enquiry from our website.", 403);
  if (Number(request.headers.get("content-length")) > maxDesignFileSize + 64 * 1024) return fail("Please choose a reference image up to 10 MB.", 413);

  const now = Date.now();
  for (const [key, entry] of requests) if (entry.expires <= now) requests.delete(key);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  const previous = requests.get(ip);
  if (previous && previous.count >= 10) return fail("Please wait a few minutes before sending another enquiry.", 429);
  if (!previous && requests.size >= 5000) return fail("Please try sending your enquiry again in a few minutes.", 429);
  requests.set(ip, { count: (previous?.count || 0) + 1, expires: previous?.expires || now + 15 * 60 * 1000 });

  let uploaded: { bucket: string; key: string } | null = null;
  async function removeUpload() {
    if (!uploaded) return;
    try {
      await getS3Client().send(new DeleteObjectCommand({ Bucket: uploaded.bucket, Key: uploaded.key }));
    } catch (error) {
      console.error("Design reference cleanup failed:", error);
    }
  }

  try {
    const data = await request.formData();
    const read = (name: string) => typeof data.get(name) === "string" ? String(data.get(name)).trim() : "";
    const name = read("fullName");
    const email = read("email");
    const nationalPhone = read("phone");
    const countryCode = read("countryCode");
    const phone = countryCode + nationalPhone.replace(/\D/g, "");
    const jewelleryType = read("jewelleryType");
    const budget = read("budget");
    const referenceLink = read("referenceLink");
    const message = read("message");
    const sku = read("sku");

    if (!name || name.length > 120) return fail("Please enter your full name (up to 120 characters).");
    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email address.");
    if (!designCountryCodes.includes(countryCode) || !/^[\d\s()-]+$/.test(nationalPhone) || !/^\+\d{10,15}$/.test(phone)) return fail("Please enter a valid phone number and country code.");
    if (!sku || sku.length > 120) return fail("Please reopen the enquiry from your selected product.");
    if (!message || message.length > maxDesignMessageLength) return fail("Please describe your design in up to 2,000 characters.");
    if ((jewelleryType && !designJewelleryTypes.includes(jewelleryType)) || (budget && !designBudgets.includes(budget))) return fail("Please choose a valid jewellery type and budget.");
    if (referenceLink) {
      let url: URL;
      try { url = new URL(referenceLink); } catch { return fail("Please enter a valid design reference link."); }
      if (referenceLink.length > 500 || !["https:", "http:"].includes(url.protocol) || url.username || url.password) return fail("Please use an http or https reference link up to 500 characters.");
    }

    let selection: ProductSelection;
    try { selection = JSON.parse(read("selection") || "{}"); } catch { return fail("Please check your product options."); }
    if (!selection || [selection.metalColour, selection.diamondGrade, selection.metalPurity, selection.size].some((value) => typeof value !== "string" || value.length > 100) || typeof selection.engravingRequested !== "boolean" || typeof selection.engravingText !== "string" || selection.engravingText.length > 24) return fail("Please check your product options.");

    const details = ["Design enquiry", `Jewellery type: ${jewelleryType || "Not specified"}`, `Approximate budget: ${budget || "Not specified"}`, referenceLink ? `Reference link: ${referenceLink}` : ""];
    const reference = data.get("referenceFile");
    if (reference instanceof File && reference.name && reference.size === 0) return fail("The reference image is empty. Please choose another image.");
    if (reference instanceof File && reference.size > 0) {
      const extension = reference.name.split(".").pop()?.toLowerCase() || "";
      const contentType = Object.hasOwn(designReferenceTypes, extension) ? designReferenceTypes[extension] : undefined;
      if (!contentType || reference.size > maxDesignFileSize) return fail("Choose a JPG, JPEG, PNG, GIF or SVG reference image up to 10 MB.");
      const buffer = Buffer.from(await reference.arrayBuffer());
      const validImage = contentType === "image/jpeg" ? buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
        : contentType === "image/png" ? buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
        : contentType === "image/gif" ? /^GIF8[79]a/.test(buffer.subarray(0, 6).toString())
        : /<svg[\s>]/i.test(buffer.subarray(0, 2048).toString());
      if (!validImage) return fail("The reference image could not be read. Please choose another image.");
      if (!isS3Configured()) return fail("We couldn't upload your reference image. Please try again or use a reference link.", 503);
      const { bucketName, basePrefix } = getS3Location();
      const fileKey = `design-references/${randomUUID()}.${extension}`;
      const key = basePrefix ? `${basePrefix}/${fileKey}` : fileKey;
      const url = getImageUrl(fileKey, "");
      if (!/^https?:\/\//.test(url)) return fail("We couldn't upload your reference image. Please try again or use a reference link.", 503);
      await getS3Client().send(new PutObjectCommand({ Bucket: bucketName, Key: key, Body: buffer, ContentType: contentType, ContentDisposition: `attachment; filename="design-reference.${extension}"`, CacheControl: "private, no-store" }));
      uploaded = { bucket: bucketName, key };
      details.push(`Reference image: ${url}`);
    } else if (reference !== null && !(reference instanceof File)) {
      return fail("Please choose a valid reference image.");
    }

    const brief = [...details.filter(Boolean), "", "Design brief:", message].join("\n");
    if (brief.length > 3000) {
      await removeUpload();
      return fail("Please shorten your design brief or reference link so all details can be saved.");
    }
    const result = await submitProductEnquiry({ ...selection, name, email, phone, message: brief, sku });
    if (!result.success) {
      await removeUpload();
      return fail(result.error || "We couldn't save your design enquiry. Please try again.");
    }
    return Response.json({ success: true, message: "Thank you. Your design enquiry has been saved. Our team will contact you to discuss the details." });
  } catch (error) {
    await removeUpload();
    console.error("Design enquiry failed:", error);
    return fail("We couldn't save your design enquiry. Please try again.", 500);
  }
}
