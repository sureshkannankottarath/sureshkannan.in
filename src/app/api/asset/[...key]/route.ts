import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(request: Request, props: { params: Promise<{ key: string[] }> }) {
    const params = await props.params;
    const key = params.key.join('/');

    if (!key) {
        return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const s3Client = new S3Client({
        endpoint: process.env.IDRIVEE2_ENDPOINT,
        region: process.env.IDRIVEE2_REGION,
        credentials: {
            accessKeyId: process.env.IDRIVEE2_ACCESS_KEY_ID!,
            secretAccessKey: process.env.IDRIVEE2_SECRET_ACCESS_KEY!,
        },
    });

    const command = new GetObjectCommand({
        Bucket: process.env.IDRIVEE2_BUCKET!,
        Key: key
    });

    try {
        const response = await s3Client.send(command);
        const buffer = await response.Body?.transformToByteArray();

        return new Response(buffer as any, {
            headers: {
                "Content-Type": response.ContentType || "image/jpeg",
                "Cache-Control": "public, max-age=3600"
            }
        });
    } catch (e: any) {
        console.error("PROXY_ERROR:", e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
