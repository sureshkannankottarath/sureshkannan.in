"use client";

import { AnimatedSection } from "./ui/AnimatedSection";
import { Cormorant_Garamond } from "next/font/google";
import { motion } from "framer-motion";

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
                                    <span className="text-sm font-semibold text-[#71717A] tracking-widest uppercase mt-2 md:mt-0">2023 – Present</span>
                                </div>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-px w-full bg-black/10 mb-6 group-hover:bg-[#BAE6FD] transition-colors duration-500 origin-left"
                                ></motion.div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#18181B] mb-2">AI R&D Team Lead – Dream Makers <span className="text-sm font-medium text-[#71717A] ml-2 font-mono">Oct 2024 - Present</span></h4>
                                        <p className="text-[#71717A] text-base leading-relaxed font-medium">Providing Team Leadership, Business Process Automation, and orchestrating strategic AI integration roadmaps.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#18181B] mb-2">Project Manager <span className="text-sm font-medium text-[#71717A] ml-2 font-mono">Oct 2023 - Oct 2024</span></h4>
                                        <p className="text-[#71717A] text-base leading-relaxed font-medium">Overseeing Jira board agile frames, Proposal Preparation, and building streamlined technical deliverables setups.</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delayMs={200}>
                            <div className="relative group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                    <h3 className="text-3xl font-bold text-[#18181B] uppercase tracking-tight">FineKube</h3>
                                    <span className="text-sm font-semibold text-[#71717A] tracking-widest uppercase mt-2 md:mt-0">2020 – 2023</span>
                                </div>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-px w-full bg-black/10 mb-6 group-hover:bg-[#BAE6FD] transition-colors duration-500 origin-left"
                                ></motion.div>

                                <div>
                                    <h4 className="text-xl font-semibold text-[#18181B] mb-2">Project Manager <span className="text-sm font-medium text-[#71717A] ml-2 font-mono">Oct 2020 - Sep 2023</span></h4>
                                    <p className="text-[#71717A] text-base leading-relaxed font-medium">Utilized a range of project management approaches (WBS/RBS) to effectively oversee planning and implementation of complex difficult deployment rollouts to guarantee successful delivery setups.</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delayMs={300}>
                            <div className="relative group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                    <h3 className="text-3xl font-bold text-[#18181B] uppercase tracking-tight">Calcus Technologies</h3>
                                    <span className="text-sm font-semibold text-[#71717A] tracking-widest uppercase mt-2 md:mt-0">2017 – 2020</span>
                                </div>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-px w-full bg-black/10 mb-6 group-hover:bg-[#BAE6FD] transition-colors duration-500 origin-left"
                                ></motion.div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#18181B] mb-2">Project Manager <span className="text-sm font-medium text-[#71717A] ml-2 font-mono">Feb 2018 - Oct 2020</span></h4>
                                        <p className="text-[#71717A] text-base leading-relaxed font-medium">Led development and implementation of software projects using both Agile and Waterfall methodologies. Responsible for preparing proposals, and conducting technical interviews.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-[#18181B] mb-2">Software Developer <span className="text-sm font-medium text-[#71717A] ml-2 font-mono">Jul 2017 - Jan 2018</span></h4>
                                        <p className="text-[#71717A] text-base leading-relaxed font-medium">Played a key role in the design and development of various web applications using PHP and MySQL. Worked closely with clients to iterate requirements and deliverables workflows.</p>
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
