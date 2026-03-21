"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
];

export function Nav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);

            // Active section detection
            const sections = ["about", "projects", "experience", "contact"];
            let current = "";

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If section is upper middle of screen
                    if (rect.top <= 120 && rect.bottom >= 120) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        // Run once on mount to set initial state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 flex justify-center pointer-events-none"
            >
                <motion.div
                    className={`flex items-center justify-between gap-6 px-6 py-3 rounded-full border border-white/5 backdrop-blur-lg pointer-events-auto transition-all duration-300 ${isScrolled
                        ? "bg-[#080C14]/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-white/10"
                        : "bg-white/5"
                        }`}
                    style={{
                        boxShadow: isScrolled
                            ? "0 0 40px rgba(0, 212, 255, 0.05), inset 0 0 20px rgba(255,255,255,0.02)"
                            : "none",
                    }}
                >
                    <Link
                        href="/"
                        className="text-lg md:text-xl font-bold font-syne text-text-primary tracking-tight group flex items-center"
                    >
                        Suresh
                        <span className="text-accent-blue transition-all duration-300 group-hover:text-accent-green group-hover:drop-shadow-[0_0_8px_rgba(0,255,179,0.5)]">
                            .
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onMouseEnter={() => setHoveredItem(item.href)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${activeSection === item.href.substring(1)
                                    ? "text-accent-blue font-semibold"
                                    : "text-text-muted hover:text-text-primary"
                                    }`}
                            >
                                <span className="relative z-10">{item.label}</span>
                                {(hoveredItem === item.href || activeSection === item.href.substring(1)) && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-accent-blue/5 rounded-full border border-accent-blue/15"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        style={{
                                            boxShadow: hoveredItem === item.href
                                                ? "0 0 15px rgba(0, 212, 255, 0.1)"
                                                : "none"
                                        }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Contact Button & Mobile Trigger */}
                    <div className="flex items-center gap-2">
                        <a
                            href="#contact"
                            className={`hidden md:block px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${activeSection === "contact"
                                ? "bg-accent-blue text-[#080C14] border-accent-blue shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                                : "border-white/10 hover:border-accent-blue text-text-primary hover:bg-accent-blue/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.1)]"
                                }`}
                        >
                            Contact
                        </a>

                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 text-text-primary hover:bg-white/10 transition-colors"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={18} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </motion.div>
            </motion.nav>

            {/* Mobile Drawer (Overlay) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#080C14]/90 backdrop-blur-md md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        <div className="flex flex-col items-center gap-6">
                            {[...NAV_ITEMS, { label: "Contact", href: "#contact" }].map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.08, ease: "easeOut" }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`text-2xl font-semibold font-syne transition-colors ${activeSection === item.href.substring(1)
                                            ? "text-accent-blue text-glow-blue"
                                            : "text-text-primary hover:text-accent-green"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
