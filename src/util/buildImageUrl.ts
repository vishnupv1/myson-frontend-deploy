export function buildImageUrl(image?: string): string {
    if (!image) return "/brand.icon.png";
    if (image.startsWith("http://") || image.startsWith("https://")) return image;
    return `${import.meta.env.VITE_API_URL}/public/images/${image}`;
} 