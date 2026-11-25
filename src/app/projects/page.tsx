import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
    title: "Work | Suresh Kannan",
    description: "AI products, platforms and web projects led and delivered by Suresh Kannan.",
};

export default function ProjectsPage() {
    return (
        <Shell>
            <ProjectArchive projects={projectsData} />
        </Shell>
    );
}
