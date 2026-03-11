import { AnimatedSection } from "./ui/AnimatedSection";
import { GlassCard } from "./ui/GlassCard";
import { PillTag } from "./ui/PillTag";

const projects = [
    {
        title: "L1 AI Agent",
        description: "Internal AI support agent for Bobcares L1 teams. ChromaDB + Qwen RAG pipeline handling 14 control panel domains.",
        tags: ["RAG", "Python", "ChromaDB", "Qwen"],
    },
    {
        title: "Smart Search V3",
        description: "Perplexity-style full-page AI search experience for Bobcares.com with intent detection, complexity scoring, and clarification engine.",
        tags: ["Next.js", "OpenAI", "FastAPI", "Semantic Search"],
    },
    {
        title: "AI VAPT Platform",
        description: "Automated vulnerability assessment platform with Docker-isolated tool runners, Celery/Redis orchestration, and AI-generated reports.",
        tags: ["FastAPI", "Docker", "Celery", "Security"],
    }
];

export function Projects() {
    return (
        <section id="projects" className="py-24 relative">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection>
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-syne">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-muted">
                                Featured Work
                            </span>
                            <div className="h-1 w-1/3 bg-accent-green mt-2 rounded-full opacity-50"></div>
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <AnimatedSection key={project.title} delayMs={index * 150}>
                            <GlassCard hasTopAccent className="h-full">
                                <h3 className="text-2xl font-syne font-semibold text-text-primary mb-4 group-hover:text-accent-blue transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-text-muted text-sm md:text-base mb-8 flex-grow leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag) => (
                                        <PillTag key={tag}>{tag}</PillTag>
                                    ))}
                                </div>
                            </GlassCard>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
