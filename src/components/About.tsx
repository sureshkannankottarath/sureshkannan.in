import { AnimatedSection } from "./ui/AnimatedSection";
import { PillTag } from "./ui/PillTag";

const skills = [
    "Python", "FastAPI", "React", "Next.js", "ChromaDB",
    "OpenAI", "LangChain", "Node.js", "Docker", "Vercel", "PostgreSQL"
];

export function About() {
    return (
        <section id="about" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-5xl font-bold font-syne mb-16 inline-block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-muted">
                            About Me
                        </span>
                        <div className="h-1 w-1/3 bg-accent-blue mt-2 rounded-full opacity-50"></div>
                    </h2>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <AnimatedSection delayMs={100}>
                        <div className="space-y-6 text-lg text-text-muted leading-relaxed font-light">
                            <p>
                                I&apos;m a Kerala-based AI Engineer building production RAG systems and
                                AI agents. I bridge the gap between model research and real-world
                                deployment — from LLM pipelines to full-stack product delivery.
                            </p>
                            <p>
                                Currently, I work as an AI Engineer & Project Manager at Bobcares,
                                where I architect intelligent systems that solve complex support and
                                operational challenges.
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delayMs={200}>
                        <div className="glass-card p-8 rounded-2xl relative overflow-hidden group border-white/5">
                            {/* Subtle accent glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-accent-green/20 transition-colors duration-500" />

                            <h3 className="text-xl font-syne font-medium text-text-primary mb-6 relative z-10">
                                Core Stack
                            </h3>

                            <div className="flex flex-wrap gap-3 relative z-10">
                                {skills.map((skill) => (
                                    <PillTag key={skill}>{skill}</PillTag>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
