import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { s3Client, PUBLIC_ASSET_FOLDERS, IMAGE_TYPES } from "@/lib/s3";

const notFound = () => NextResponse.json({ error: "Not found" }, { status: 404 });

export async function GET(request: Request, props: { params: Promise<{ key: string[] }> }) {
    const params = await props.params;
    const segments = params.key ?? [];

    // Only serve images from the public folders, and reject traversal or empty segments
    if (
        segments.length < 2 ||
        !PUBLIC_ASSET_FOLDERS.includes(segments[0]) ||
        segments.some(s => !s || s === '.' || s === '..' || s.includes('\\'))
    ) {
        return notFound();
    }

    const key = segments.join('/');
    const ext = key.split('.').pop()?.toLowerCase() ?? '';
    const contentType = IMAGE_TYPES[ext];
    if (!contentType) {
        return notFound();
    }

    const command = new GetObjectCommand({
        Bucket: process.env.IDRIVEE2_BUCKET!,
        Key: key
    });

    try {
        const response = await s3Client.send(command);
        const buffer = await response.Body?.transformToByteArray();
        if (!buffer) return notFound();

        return new Response(Buffer.from(buffer), {
            headers: {
                // Derived from the extension, not the stored metadata
                "Content-Type": contentType,
                "X-Content-Type-Options": "nosniff",
                "Cache-Control": "public, max-age=3600"
            }
        });
    } catch (e: unknown) {
        const name = (e as { name?: string })?.name;
        if (name === 'NoSuchKey' || name === 'NotFound') {
            return notFound();
        }
        console.error("PROXY_ERROR:", e);
        return NextResponse.json({ error: "Failed to load asset" }, { status: 500 });
    }
}
