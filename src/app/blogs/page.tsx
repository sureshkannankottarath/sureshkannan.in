import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { JournalList } from "@/components/JournalList";
import { createPublicClient, type Blog } from "@/lib/supabase/public";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Journal | Suresh Kannan",
    description: "Notes on project delivery, AI products and automation.",
};

export default async function BlogsPage() {
    const supabase = createPublicClient();
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });

    return (
        <Shell>
            <JournalList blogs={(data as Blog[] | null) ?? []} />
        </Shell>
    );
}
