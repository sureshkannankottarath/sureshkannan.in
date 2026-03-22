import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    endpoint: process.env.IDRIVEE2_ENDPOINT,
    region: process.env.IDRIVEE2_REGION,
    credentials: {
        accessKeyId: process.env.IDRIVEE2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.IDRIVEE2_SECRET_ACCESS_KEY!,
    },
});

export async function uploadImage(file: File, folder: string = 'images') {
    if (!file || file.size === 0) return null;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    const command = new PutObjectCommand({
        Bucket: process.env.IDRIVEE2_BUCKET!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type || 'image/jpeg',
    });

    await s3Client.send(command);

    // Remote iDrive E2 URL format
    return `https://${process.env.IDRIVEE2_BUCKET}.s3.${process.env.IDRIVEE2_REGION}.idrivee2.com/${fileName}`;
}
