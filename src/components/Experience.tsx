import { AnimatedSection } from "./ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400"], style: ["italic"] });

export function Experience() {
    return (
        <section id="experience" className="min-h-[100dvh] w-full flex flex-col justify-center relative bg-[#FAFAFA] border-t border-black/5 snap-start snap-always py-24 md:py-0">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col md:flex-row gap-16 md:gap-24 items-start">

                {/* Left Column: Huge Editorial Header */}
                <div className="w-full md:w-1/3 md:sticky md:top-32 mb-12 md:mb-0 z-10">
                    <AnimatedSection>
                        <h2 className="text-[4rem] sm:text-[5rem] lg:text-[7rem] font-black uppercase text-[#18181B] tracking-tighter leading-[0.8] mb-4">
                            CAREER
                            <br />
                            <span className={`text-[3.5rem] sm:text-[4rem] lg:text-[6rem] font-light lowercase text-[#71717A] tracking-normal ${cormorant.className}`}>path.</span>
                        </h2>
                    </AnimatedSection>
                </div>

                {/* Right Column: Content */}
                <div className="w-full md:w-2/3">
                    <div className="space-y-16">
                        <AnimatedSection delayMs={100}>
                            <div className="relative group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                    <h3 className="text-3xl font-bold text-[#18181B] uppercase tracking-tight">Bobcares</h3>
                                    <span className="text-sm font-semibold text-[#71717A] tracking-widest uppercase mt-2 md:mt-0">2020 – Present</span>
                                </div>
                                <div className="h-px w-full bg-black/10 mb-6 group-hover:bg-[#BAE6FD] transition-colors duration-500"></div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#18181B] mb-2">AI Engineer & PM <span className="text-sm font-medium text-[#71717A] ml-2 font-mono">2022 - Present</span></h4>
                                        <p className="text-[#71717A] text-base leading-relaxed font-medium">Building AI-powered support systems, semantic search, and LLM infrastructure for a global managed hosting company. Leading teams to deploy scalable intelligent systems.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#18181B] mb-2">Software Engineer <span className="text-sm font-medium text-[#71717A] ml-2 font-mono">2020 - 2021</span></h4>
                                        <p className="text-[#71717A] text-base leading-relaxed font-medium">Developed secure and resilient web applications. Focused on backend automation using Python and cloud deployments.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delayMs={200}>
                            <div className="relative group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                    <h3 className="text-3xl font-bold text-[#18181B] uppercase tracking-tight">TechNova Solutions</h3>
                                    <span className="text-sm font-semibold text-[#71717A] tracking-widest uppercase mt-2 md:mt-0">2019 – 2020</span>
                                </div>
                                <div className="h-px w-full bg-black/10 mb-6 group-hover:bg-[#BAE6FD] transition-colors duration-500"></div>

                                <div>
                                    <h4 className="text-xl font-semibold text-[#18181B] mb-2">Full Stack Developer</h4>
                                    <p className="text-[#71717A] text-base leading-relaxed font-medium">Built end-to-end data analytics and monitoring dashboards using React and Node.js.</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delayMs={300}>
                            <div className="relative group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                    <h3 className="text-3xl font-bold text-[#18181B] uppercase tracking-tight">InitVentures</h3>
                                    <span className="text-sm font-semibold text-[#71717A] tracking-widest uppercase mt-2 md:mt-0">2017 – 2018</span>
                                </div>
                                <div className="h-px w-full bg-black/10 mb-6 group-hover:bg-[#BAE6FD] transition-colors duration-500"></div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#18181B] mb-2">Junior Developer <span className="text-sm font-medium text-[#71717A] ml-2 font-mono">2018 - 2018</span></h4>
                                        <p className="text-[#71717A] text-base leading-relaxed font-medium">Assisted in migrating legacy systems to microservices architecture.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#18181B] mb-2">Intern QA <span className="text-sm font-medium text-[#71717A] ml-2 font-mono">2017 - 2017</span></h4>
                                        <p className="text-[#71717A] text-base leading-relaxed font-medium">Started out in QA and automated web testing.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
}
