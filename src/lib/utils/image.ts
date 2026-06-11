// Utility functions for Next.js Image optimization

export const FALLBACK_IMAGE = '/phone-placeholder.webp';

/**
 * Generates a tiny, highly blurred version of a Cloudinary image to use as a placeholder
 */
export function getCloudinaryBlurUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  
  // Only apply to cloudinary images
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    // Replace the upload/ part with upload/e_blur:1000,q_1,f_webp/ to generate a tiny blurred image
    return url.replace('/upload/', '/upload/e_blur:1000,q_1,w_100,f_webp/');
  }
  
  return undefined;
}

/**
 * Returns a generic solid color base64 blurDataURL for non-cloudinary images
 */
export const defaultBlurDataURL = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=='; // 1x1 grey webp

/**
 * Helper to get the SEO friendly alt text for an image
 */
export function getDynamicAltText(phoneName: string, index: number = 0): string {
  if (!phoneName) return 'Smartphone';
  
  const altVariations = [
    `${phoneName} Price, Specifications, Camera and Design`,
    `${phoneName} Official Render and Display`,
    `${phoneName} Back Panel and Camera Module`,
    `${phoneName} Side Profile and Thickness`,
    `${phoneName} Color Variants and Options`
  ];
  
  return altVariations[index % altVariations.length];
}
