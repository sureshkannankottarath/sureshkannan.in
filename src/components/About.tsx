import { AnimatedSection } from "./ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

const skills = [
    "Python", "FastAPI", "React", "Next.js", "ChromaDB",
    "OpenAI", "LangChain", "Node.js", "Docker", "Vercel", "PostgreSQL"
];

export function About() {
    return (
        <section id="about" className="py-24 relative bg-[#FAFAFA] border-t border-black/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-16 md:gap-24 items-start">

                {/* Left Column: Huge Editorial Header */}
                <div className="w-full md:w-1/3">
                    <AnimatedSection>
                        <h2 className="text-[5rem] lg:text-[7rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8] mb-4">
                            ABOUT
                            <br />
                            <span className={`text-[4rem] lg:text-[6rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>me.</span>
                        </h2>
                    </AnimatedSection>
                </div>

                {/* Right Column: Content */}
                <div className="w-full md:w-2/3">
                    <AnimatedSection delayMs={100}>
                        <div className="space-y-8 text-xl md:text-3xl text-[#18181B] leading-tight font-medium font-sans">
                            <p>
                                I am an AI Engineer & Project Manager based in Kerala, architecting intelligent systems that bridge the gap between applied research and real-world deployment.
                            </p>
                            <p className="text-[#71717A]">
                                I specialize in LLM pipelines, semantic search, and robust full-stack product delivery, solving complex operational challenges.
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delayMs={200}>
                        <div className="pt-12 mt-12 border-t border-black/10">
                            <h3 className="text-sm font-bold text-[#18181B] uppercase tracking-wider mb-6">Core Arsenal</h3>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {skills.map((skill) => (
                                    <div key={skill} className="px-5 py-2.5 rounded-full border border-black/10 text-xs md:text-sm font-semibold text-[#18181B] hover:bg-black hover:text-white transition-colors cursor-default">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
