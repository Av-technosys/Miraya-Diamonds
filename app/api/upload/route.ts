import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { uploadFileToS3 } from "@/lib/s3";

// Maximum allowed image size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed image MIME types
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
]);

// Allowed destination folders
const ALLOWED_FOLDERS = new Set(["products", "categories", "blogs", "general"]);

export async function POST(req: NextRequest) {
  try {
    // 1. Admin Authentication Check via Clerk
    const { userId } = await auth();
    if (!userId && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: You must be signed in as an administrator to upload images.",
        },
        { status: 401 }
      );
    }

    // 2. Parse multipart form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        {
          success: false,
          error: "No file was provided in the upload request.",
        },
        { status: 400 }
      );
    }

    // 3. Validate File Type
    const contentType = file.type || "application/octet-stream";
    if (!ALLOWED_MIME_TYPES.has(contentType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type "${contentType}". Please upload a JPG, PNG, WebP, AVIF, GIF, or SVG image.`,
        },
        { status: 400 }
      );
    }

    // 4. Validate File Size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 10MB limit. Current size: ${(file.size / (1024 * 1024)).toFixed(2)} MB.`,
        },
        { status: 400 }
      );
    }

    // 5. Validate and determine destination folder
    const rawFolder = (formData.get("folder")?.toString() || "products").toLowerCase().trim();
    const folder = ALLOWED_FOLDERS.has(rawFolder) ? rawFolder : "products";

    // 6. Convert file to buffer and upload to AWS S3
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = (file as File).name || `image-${Date.now()}`;

    const result = await uploadFileToS3({
      buffer,
      fileName,
      contentType,
      folder,
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      fileKey: result.fileKey,
      key: result.key,
      bucket: result.bucket,
      fileName,
      size: file.size,
      contentType,
      folder,
    });
  } catch (error: any) {
    console.error("[S3 Upload API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to upload image to AWS S3.",
      },
      { status: 500 }
    );
  }
}

