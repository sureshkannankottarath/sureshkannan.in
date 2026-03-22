import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Initialize S3
const s3Client = new S3Client({
    endpoint: process.env.IDRIVEE2_ENDPOINT,
    region: process.env.IDRIVEE2_REGION,
    credentials: {
        accessKeyId: process.env.IDRIVEE2_ACCESS_KEY_ID,
        secretAccessKey: process.env.IDRIVEE2_SECRET_ACCESS_KEY
    }
});

// Initialize Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const images = [
    { key: "projects/clabs.png", path: "/home/dev/.gemini/antigravity/brain/45ee62b1-8b82-476a-aace-3c5599378655/clabs_dashboard_1774183651192.png" },
    { key: "projects/myg_online.png", path: "/home/dev/.gemini/antigravity/brain/45ee62b1-8b82-476a-aace-3c5599378655/myg_mobile_app_1774183670430.png" },
    { key: "projects/lions_club.png", path: "/home/dev/.gemini/antigravity/brain/45ee62b1-8b82-476a-aace-3c5599378655/lions_activity_manager_1774183687803.png" },
    { key: "projects/home2labs.png", path: "/home/dev/.gemini/antigravity/brain/45ee62b1-8b82-476a-aace-3c5599378655/home2labs_mockup_1774183710295.png" },
    { key: "projects/currency_exchange.png", path: "/home/dev/.gemini/antigravity/brain/45ee62b1-8b82-476a-aace-3c5599378655/currency_exchange_mockup_1774183729225.png" },
    { key: "projects/todaysdine.png", path: "/home/dev/.gemini/antigravity/brain/45ee62b1-8b82-476a-aace-3c5599378655/todaysdine_menu_1774183748338.png" },
    { key: "projects/bicycles.png", path: "/home/dev/.gemini/antigravity/brain/45ee62b1-8b82-476a-aace-3c5599378655/bicycles_affiliate_1774183779093.png" }
];

const projects = [
    {
        title: "cLabs",
        slug: "clabs",
        description: "Modern Laboratory Management Information System (LIMS) designed to automate operations, sample management, test results reporting, and quality control.",
        tags: ["CodeIgniter", "MySQL", "Agile", "LIMS"],
        image: "projects/clabs.png"
    },
    {
        title: "myG Online",
        slug: "myg-online",
        description: "Sleek mobile e-commerce mockup displaying digital gadgets interactive checkout setup with Smarty layout templates.",
        tags: ["CodeIgniter", "Smarty", "MySQL", "JavaScript"],
        image: "projects/myg_online.png"
    },
    {
        title: "Lions Club Manager",
        slug: "lions-club",
        description: "Activity Management software layout developed with prepared statements triggers and REST APIs that help manage club member workflows and blood bank.",
        tags: ["CodeIgniter", "MySQL", "AJAX", "PHP"],
        image: "projects/lions_club.png"
    },
    {
        title: "Home2Labs",
        slug: "home2labs",
        description: "Daily health testing diagnostics suite service utilizing innovative CodeIgniter setups with direct collective medical bookings diagnostics anchors.",
        tags: ["CodeIgniter", "MySQL", "Android", "REST API", "JavaScript"],
        image: "projects/home2labs.png"
    },
    {
        title: "Currency Exchange Software",
        slug: "currency-exchange",
        description: "Internal cash finance rates tracker dashboard layout display featuring Live FX currency rates trading management datasets records.",
        tags: ["PHP", "XML", "AJAX", "MySQL", "Finance"],
        image: "projects/currency_exchange.png"
    },
    {
        title: "TodaysDine",
        slug: "todaysdine",
        description: "Contactless QR digital menu platform tailored exclusively for hotels and resorts seamless traditional transforming interactive digital rollout workflows.",
        tags: ["CodeIgniter", "MySQL", "QR Menu", "Contactless"],
        image: "projects/todaysdine.png"
    },
    {
        title: "BiCycles",
        slug: "bicycles",
        description: "Parts-Based Affiliate Platform delivering a complete bicycle sparse parts ecosystem matching compatibility dynamically via Airtable integration setups.",
        tags: ["Node.js", "Express", "MongoDB", "Airtable", "Affiliate"],
        image: "projects/bicycles.png"
    }
];

async function run() {
    try {
        console.log("Uploading images to iDrive E2...");
        for (const img of images) {
            const body = fs.readFileSync(img.path);
            const cmd = new PutObjectCommand({
                Bucket: process.env.IDRIVEE2_BUCKET,
                Key: img.key,
                Body: body,
                ContentType: "image/png"
            });
            await s3Client.send(cmd);
            console.log(`Uploaded ${img.key}`);
        }

        console.log("Wiping existing projects on Supabase...");
        // Deletes all rows, since RLS is anon, test insert
        const { error: delError } = await supabase
            .from("projects")
            .delete()
            .neq("title", "KEEP_THIS_NEVER_MATCHING_VALUE_TRICK");

        if (delError) {
            throw new Error(`Delete Error: ${delError.message}`);
        }
        console.log("Cleared existing projects.");

        console.log("Inserting new projects...");
        const { error: insError } = await supabase
            .from("projects")
            .insert(projects);

        if (insError) {
            throw new Error(`Insert Error: ${insError.message}`);
        }
        console.log("All projects inserted successfully!");

    } catch (err) {
        console.error("SCRIPT FAILED:", err);
        process.exit(1);
    }
}

run();
