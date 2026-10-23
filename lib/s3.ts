import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { getImageUrl } from "./imageUrl";

export interface S3UploadOptions {
  buffer: Buffer;
  fileName: string;
  contentType: string;
  folder?: "products" | "categories" | "blogs" | "general" | string;
}

export interface S3UploadResult {
  success: boolean;
  key: string;
  fileKey: string;
  url: string;
  bucket: string;
  region: string;
}

/**
 * Check if the required AWS S3 environment variables are defined.
 */
export function isS3Configured(): boolean {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_S3_BUCKET_NAME &&
      (process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION)
  );
}

/**
 * Initialize and return an S3Client instance.
 */
export function getS3Client(): S3Client {
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "ap-south-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "AWS credentials missing. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your environment (.env)."
    );
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Sanitize filename to ensure safe S3 storage.
 */
export function sanitizeFileName(fileName: string): string {
  const extIndex = fileName.lastIndexOf(".");
  const name = extIndex !== -1 ? fileName.substring(0, extIndex) : fileName;
  const ext = extIndex !== -1 ? fileName.substring(extIndex).toLowerCase() : "";

  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${cleanName || "file"}${ext}`;
}

/**
 * Generate a unique S3 object key.
 * Pattern: {folder}/{timestamp}-{randomId}-{sanitizedFileName}
 */
export function generateS3Key(fileName: string, folder: string = "products"): string {
  const sanitized = sanitizeFileName(fileName);
  const cleanFolder = folder.replace(/^\/+|\/+$/g, "");
  const randomSuffix = crypto.randomUUID().slice(0, 8);
  const timestamp = Date.now();

  return `${cleanFolder}/${timestamp}-${randomSuffix}-${sanitized}`;
}

/**
 * Upload a file buffer to AWS S3 using Method 1 (backend upload).
 */
export async function uploadFileToS3({
  buffer,
  fileName,
  contentType,
  folder = "products",
}: S3UploadOptions): Promise<S3UploadResult> {
  const rawBucket = (process.env.AWS_S3_BUCKET_NAME || "").trim();
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "ap-south-1";

  if (!rawBucket) {
    throw new Error(
      "AWS_S3_BUCKET_NAME is not configured. Please define it in your environment variables (.env)."
    );
  }

  // Handle nested bucket prefixes gracefully (e.g. "av-rone/miraya/" -> bucket: "av-rone", basePrefix: "miraya")
  const parts = rawBucket.split("/").filter(Boolean);
  const bucketName = parts[0];
  const basePrefix = parts.slice(1).join("/");

  const s3Client = getS3Client();
  const fileKey = generateS3Key(fileName, folder);
  const s3Key = basePrefix ? `${basePrefix}/${fileKey}` : fileKey;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // Build public image URL through CloudFront CDN via centralized getImageUrl helper
  const url = getImageUrl(fileKey);

  return {
    success: true,
    key: s3Key,
    fileKey,
    url,
    bucket: bucketName,
    region,
  };
}

