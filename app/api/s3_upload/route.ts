import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3Client, sanitizeFileName } from "@/lib/s3";
import { getImageUrl } from "@/lib/imageUrl";
import crypto from "crypto";

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
          error: "Unauthorized: You must be signed in as an administrator to generate upload URLs.",
        },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await req.json().catch(() => ({}));
    const rawFileName = body.fileName || `image-${Date.now()}`;
    const contentType = body.contentType || "image/jpeg";
    const rawFolder = (body.folder || "products").toLowerCase().trim();

    // 3. Validate content type
    if (!ALLOWED_MIME_TYPES.has(contentType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type "${contentType}". Please upload a JPG, PNG, WebP, AVIF, GIF, or SVG image.`,
        },
        { status: 400 }
      );
    }

    const folder = ALLOWED_FOLDERS.has(rawFolder) ? rawFolder : "products";

    // 4. Generate relative fileKey (e.g., "products/172967-xxxx-diamond.png")
    const sanitizedName = sanitizeFileName(rawFileName);
    const randomSuffix = crypto.randomUUID().slice(0, 8);
    const timestamp = Date.now();
    const fileKey = `${folder}/${timestamp}-${randomSuffix}-${sanitizedName}`;

    // 5. Determine S3 bucket and object key (respecting root prefix like "miraya" from AWS_S3_BUCKET_NAME)
    const rawBucket = (process.env.AWS_S3_BUCKET_NAME || "").trim();
    if (!rawBucket) {
      return NextResponse.json(
        {
          success: false,
          error: "AWS_S3_BUCKET_NAME environment variable is not defined.",
        },
        { status: 500 }
      );
    }

    const parts = rawBucket.split("/").filter(Boolean);
    const bucketName = parts[0];
    const basePrefix = parts.slice(1).join("/");

    // The actual S3 key inside the bucket (e.g. "miraya/products/172967-xxxx-diamond.png")
    const s3Key = basePrefix ? `${basePrefix}/${fileKey}` : fileKey;

    // 6. Generate 60-second Presigned PUT URL for direct client-to-S3 upload
    const s3Client = getS3Client();
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    const cloudfrontUrl = getImageUrl(fileKey);

    return NextResponse.json({
      success: true,
      uploadUrl, // 60-second presigned URL for direct browser PUT upload
      fileKey, // Relative key to store in the database (e.g. "products/1729-item.png")
      s3Key, // Exact full S3 object key
      cloudfrontUrl, // Live CDN URL via CloudFront
      expiresIn: 60,
    });
  } catch (error: any) {
    console.error("[S3 Presigned Upload API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to generate presigned upload URL.",
      },
      { status: 500 }
    );
  }
}

