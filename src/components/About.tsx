import { AnimatedSection } from "./ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";
import {
    SiPython,
    SiFastapi,
    SiReact,
    SiNextdotjs,
    SiOpenai,
    SiNodedotjs,
    SiDocker,
    SiVercel,
    SiPostgresql
} from "react-icons/si";
import { FaDatabase, FaLink } from "react-icons/fa6";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

const skills = [
    { name: "Python", Icon: SiPython, color: "#3776AB" },
    { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
    { name: "ChromaDB", Icon: FaDatabase, color: "#FF5733" },
    { name: "OpenAI", Icon: SiOpenai, color: "#412991" },
    { name: "LangChain", Icon: FaLink, color: "#111111" },
    { name: "Node.js", Icon: SiNodedotjs, color: "#43853D" },
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "Vercel", Icon: SiVercel, color: "#000000" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" }
];

export function About() {
    return (
        <section id="about" className="min-h-[100dvh] w-full flex flex-col justify-center relative bg-[#FAFAFA] border-t border-black/5 snap-start snap-always py-24 md:py-0">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col md:flex-row gap-16 md:gap-24 items-start">

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
                                    <div key={skill.name} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 text-xs md:text-sm font-semibold text-[#18181B] bg-white shadow-sm hover:scale-105 hover:shadow-md transition-all cursor-default">
                                        <skill.Icon style={{ color: skill.color }} className="w-4 h-4" />
                                        {skill.name}
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
