import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
    endpoint: "https://s3.eu-central-2.idrivee2.com",
    region: "eu-central-2",
    credentials: {
        accessKeyId: "2gcN74ULmWCAwe7rglSe",
        secretAccessKey: "cVpUMWCNYQcAU6aPFXIajU2ZTD9sVIyvEbYXuFi4"
    }
});

const command = new GetObjectCommand({
    Bucket: "sureshkannan.in",
    Key: "blogs/1774181090665-img_2910-1.jpg"
});

try {
    const url = await client.send(command); // test direct fetch or sign
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
    console.log("SIGNED_URL:");
    console.log(signedUrl);
} catch (e) {
    console.error("ERROR:", e.message);
}
