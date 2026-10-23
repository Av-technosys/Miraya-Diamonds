

export const DEFAULT_FALLBACK_IMAGE = "/customize/custom1.png";

function getCdnBaseUrl(): string {
  const cdnUrl =
    process.env.NEXT_PUBLIC_S3_URL ||
    process.env.AWS_S3_CUSTOM_DOMAIN ||
    "";

  return cdnUrl.trim().replace(/\/+$/, "");
}

export function getImageUrl(
  keyOrUrl: string | null | undefined,
  fallback: string = DEFAULT_FALLBACK_IMAGE
): string {
  if (!keyOrUrl || typeof keyOrUrl !== "string") {
    return fallback;
  }

  const trimmed = keyOrUrl.trim();
  if (!trimmed) {
    return fallback;
  }

  // 1. Already a full absolute URL (CloudFront, S3 direct, external CDN, etc.)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // 2. Local public asset path (e.g., starts with '/' such as '/Images/Header_ring.png')
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // 3. Relative S3 key (e.g. "products/1729-item.png" or "categories/banner.png")
  const baseCdnUrl = getCdnBaseUrl();
  let cleanKey = trimmed.replace(/^\/+/, "");

  if (!baseCdnUrl) {
    // If environment variable is unset, fallback to relative path
    return `/${cleanKey}`;
  }

  // Normalize key to avoid duplicate folder prefix (e.g. if CDN URL has '/miraya' and key starts with 'miraya/')
  if (baseCdnUrl.endsWith("/miraya") && cleanKey.startsWith("miraya/")) {
    cleanKey = cleanKey.replace(/^miraya\//, "");
  }

  return `${baseCdnUrl}/${cleanKey}`;
}
