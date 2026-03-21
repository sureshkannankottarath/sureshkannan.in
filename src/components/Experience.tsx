import { AnimatedSection } from "./ui/AnimatedSection";

export function Experience() {
    return (
        <section id="experience" className="py-24 relative">
            <div className="max-w-4xl mx-auto px-6">
                <AnimatedSection>
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold font-syne mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-accent-blue">
                                Experience
                            </span>
                        </h2>
                        <div className="h-1 w-24 bg-accent-blue mx-auto rounded-full opacity-50"></div>
                    </div>
                </AnimatedSection>

                <div className="relative border-l border-black/10 ml-4 md:ml-0 md:border-none">
                    {/* Central Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent -translate-x-1/2" />

                    {/* Timeline Item */}
                    <AnimatedSection delayMs={100} className="relative mb-12">
                        {/* Experience 1 */}
                        <div className="md:flex items-center justify-between w-full mb-12">
                            <div className="hidden md:block w-5/12 text-right pr-8">
                                <span className="text-accent-blue font-mono text-sm tracking-wider bg-accent-blue/10 px-4 py-1.5 rounded-full border border-accent-blue/20">
                                    2020 – Present
                                </span>
                            </div>

                            <div className="absolute left-[-5px] md:static md:left-auto w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-blue shadow-[0_0_15px_rgba(10,132,255,0.5)] z-10 mx-auto" />

                            <div className="md:hidden block pl-8 mb-4">
                                <span className="text-accent-blue font-mono text-sm tracking-wider">
                                    2020 – Present
                                </span>
                            </div>

                            <div className="w-full md:w-5/12 pl-8 md:pl-0 md:text-left">
                                <div className="glass-card p-6 rounded-2xl border-black/5 hover:border-accent-blue/30 transition-colors group">
                                    <h4 className="text-accent-green mb-4 text-sm font-medium border-b border-black/10 pb-2">
                                        Bobcares / Poornam Info Vision
                                    </h4>

                                    <div className="mb-4">
                                        <h3 className="text-xl font-syne font-semibold text-text-primary mb-1">
                                            AI Engineer & PM
                                        </h3>
                                        <span className="text-xs text-text-muted">Jan 2022 - Present</span>
                                        <p className="text-text-muted text-sm leading-relaxed mt-2">
                                            Building AI-powered support systems, semantic search, and LLM infrastructure for a global managed hosting company. Leading teams to deploy scalable intelligent systems.
                                        </p>
                                    </div>

                                    <div className="mb-2">
                                        <h3 className="text-xl font-syne font-semibold text-text-primary mb-1">
                                            Software Engineer
                                        </h3>
                                        <span className="text-xs text-text-muted">Feb 2020 - Dec 2021</span>
                                        <p className="text-text-muted text-sm leading-relaxed mt-2">
                                            Developed secure and resilient web applications. Focused on backend automation using Python and cloud deployments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience 2 */}
                        <div className="md:flex items-center justify-between w-full mb-12">
                            <div className="hidden md:block w-5/12 text-right pr-8 md:text-left md:order-3 md:pl-8 md:pr-0">
                                <span className="text-text-muted font-mono text-sm tracking-wider bg-black/5 px-4 py-1.5 rounded-full border border-black/10">
                                    2019 – 2020
                                </span>
                            </div>

                            <div className="absolute left-[-5px] md:static md:left-auto w-4 h-4 rounded-full bg-bg-primary border-2 border-text-muted z-10 mx-auto md:order-2" />

                            <div className="md:hidden block pl-8 mb-4">
                                <span className="text-text-muted font-mono text-sm tracking-wider">
                                    2019 – 2020
                                </span>
                            </div>

                            <div className="w-full md:w-5/12 pl-8 md:pl-0 md:text-right md:order-1 md:pr-8">
                                <div className="glass-card p-6 rounded-2xl border-black/5 hover:border-black/20 transition-colors group">
                                    <h4 className="text-accent-green mb-4 text-sm font-medium border-b border-black/10 pb-2">
                                        TechNova Solutions
                                    </h4>

                                    <div className="mb-2">
                                        <h3 className="text-xl font-syne font-semibold text-text-primary mb-1">
                                            Full Stack Developer
                                        </h3>
                                        <p className="text-text-muted text-sm leading-relaxed mt-2">
                                            Built end-to-end data analytics and monitoring dashboards using React and Node.js.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience 3 */}
                        <div className="md:flex items-center justify-between w-full mb-12">
                            <div className="hidden md:block w-5/12 text-right pr-8">
                                <span className="text-text-muted font-mono text-sm tracking-wider bg-black/5 px-4 py-1.5 rounded-full border border-black/10">
                                    2017 – 2018
                                </span>
                            </div>

                            <div className="absolute left-[-5px] md:static md:left-auto w-4 h-4 rounded-full bg-bg-primary border-2 border-text-muted z-10 mx-auto" />

                            <div className="md:hidden block pl-8 mb-4">
                                <span className="text-text-muted font-mono text-sm tracking-wider">
                                    2017 – 2018
                                </span>
                            </div>

                            <div className="w-full md:w-5/12 pl-8 md:pl-0 md:text-left">
                                <div className="glass-card p-6 rounded-2xl border-black/5 hover:border-black/20 transition-colors group">
                                    <h4 className="text-accent-green mb-4 text-sm font-medium border-b border-black/10 pb-2">
                                        InitVentures
                                    </h4>

                                    <div className="mb-4">
                                        <h3 className="text-xl font-syne font-semibold text-text-primary mb-1">
                                            Junior Developer
                                        </h3>
                                        <span className="text-xs text-text-muted">Jan 2018 - Dec 2018</span>
                                        <p className="text-text-muted text-sm leading-relaxed mt-2">
                                            Assisted in migrating legacy systems to microservices architecture.
                                        </p>
                                    </div>

                                    <div className="mb-2">
                                        <h3 className="text-xl font-syne font-semibold text-text-primary mb-1">
                                            Intern
                                        </h3>
                                        <span className="text-xs text-text-muted">Jul 2017 - Dec 2017</span>
                                        <p className="text-text-muted text-sm leading-relaxed mt-2">
                                            Started out in QA and automated web testing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
