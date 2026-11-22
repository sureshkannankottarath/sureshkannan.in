import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    endpoint: process.env.IDRIVEE2_ENDPOINT,
    region: process.env.IDRIVEE2_REGION,
    credentials: {
        accessKeyId: process.env.IDRIVEE2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.IDRIVEE2_SECRET_ACCESS_KEY!,
    },
});

// Folders that may be read back through /api/asset
export const PUBLIC_ASSET_FOLDERS = ['projects', 'blogs'];

// SVG is deliberately excluded: it can carry script
export const IMAGE_TYPES: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    avif: 'image/avif',
};

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export async function uploadImage(file: File, folder: string = 'images') {
    if (!file || file.size === 0) return null;

    if (!PUBLIC_ASSET_FOLDERS.includes(folder)) {
        throw new Error(`Invalid upload folder: ${folder}`);
    }
    if (file.size > MAX_UPLOAD_BYTES) {
        throw new Error('Image must be 5 MB or smaller');
    }

    const ext = Object.keys(IMAGE_TYPES).find(e => IMAGE_TYPES[e] === file.type);
    if (!ext) {
        throw new Error('Unsupported image type. Use PNG, JPEG, GIF, WebP or AVIF.');
    }

    const baseName = file.name
        .replace(/\.[^.]*$/, '')
        .replace(/[^a-zA-Z0-9_-]+/g, '-')
        .slice(0, 80) || 'image';
    const fileName = `${folder}/${Date.now()}-${baseName}.${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const command = new PutObjectCommand({
        Bucket: process.env.IDRIVEE2_BUCKET!,
        Key: fileName,
        Body: buffer,
        ContentType: IMAGE_TYPES[ext],
    });

    await s3Client.send(command);

    // Remote iDrive E2 URL format
    return `https://${process.env.IDRIVEE2_BUCKET}.s3.${process.env.IDRIVEE2_REGION}.idrivee2.com/${fileName}`;
}
