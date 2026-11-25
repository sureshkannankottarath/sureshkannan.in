"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { LocalTime } from "./site/LocalTime";
import { scroller, scrollToTarget } from "./site/scroll";
import { glOverride } from "./gl/store";
import { profile } from "@/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

// Each destination has its own particle formation, previewed on hover
const MENU = [
    { label: "Index", href: "/", caption: "Where every project starts", formation: "Chaos", shape: 0 },
    { label: "Method", href: "/#method", caption: "Chaos to delivery in three moves", formation: "Lattice", shape: 1 },
    { label: "Work", href: "/projects", caption: "Selected products, shipped", formation: "Network", shape: 2 },
    { label: "Career", href: "/#experience", caption: "Eight years, one craft", formation: "In transition", shape: 1.5 },
    { label: "Journal", href: "/blogs", caption: "Notes from the noise", formation: "Half-formed", shape: 0.5 },
    { label: "Contact", href: "/#contact", caption: "Let’s build what’s next", formation: "Orbit", shape: 3 },
];

// Home page sections shown in the menu button as you scroll
const SECTIONS = [
    { id: "manifesto", label: "Manifesto" },
    { id: "method", label: "Method" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Career" },
    { id: "contact", label: "Contact" },
];

function pageLabel(pathname: string) {
    if (pathname.startsWith("/projects")) return "Work";
    if (pathname.startsWith("/blogs")) return "Journal";
    return "Index";
}

function activeIndex(pathname: string, section: string) {
    if (pathname !== "/") return MENU.findIndex((m) => m.label === pageLabel(pathname));
    const i = MENU.findIndex((m) => m.label === section);
    return i === -1 ? 0 : i;
}

// Label that rolls vertically when its text changes
function Ticker({ text }: { text: string }) {
    return (
        <span className="relative block h-[1.2em] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={text}
                    className="block"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.6, ease: EASE }}
                >
                    {text}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

export function Nav() {
    const pathname = usePathname();
    const router = useRouter();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [section, setSection] = useState("Index");
    const [hovered, setHovered] = useState<number | null>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const { scrollYProgress } = useScroll();

    const current = activeIndex(pathname, section);
    const focus = hovered ?? current;

    // Header visibility + which home section is in view
    useEffect(() => {
        let last = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 40);
            setHidden(y > last && y > 200);
            last = y;

            if (pathname !== "/") return setSection(pageLabel(pathname));
            let label = "Index";
            for (const s of SECTIONS) {
                const el = document.getElementById(s.id);
                if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) label = s.label;
            }
            setSection(label);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [pathname]);

    // While open: freeze the page, steer the particles, close on Escape
    useEffect(() => {
        if (!open) return;
        scroller.lenis?.stop();
        document.documentElement.style.overflow = "hidden";
        // Lifts the particle canvas above the menu backdrop (see globals.css)
        document.documentElement.dataset.menu = "open";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        const trigger = triggerRef.current;
        return () => {
            scroller.lenis?.start();
            document.documentElement.style.overflow = "";
            delete document.documentElement.dataset.menu;
            glOverride.current = null;
            window.removeEventListener("keydown", onKey);
            trigger?.focus({ preventScroll: true });
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const wide = window.innerWidth >= 1024;
        glOverride.current = { shape: MENU[focus].shape, x: wide ? 2.6 : 0, dim: wide ? 0.95 : 0.45 };
    }, [open, focus]);

    const go = useCallback(
        (e: React.MouseEvent, href: string) => {
            setOpen(false);
            setHovered(null);
            if (pathname !== "/") return; // Link handles cross-page navigation
            e.preventDefault();
            // Wait for the overlay to start closing and scrolling to unlock
            setTimeout(() => {
                if (href === "/") {
                    if (scroller.lenis) scroller.lenis.scrollTo(0, { duration: 1.6 });
                    else window.scrollTo({ top: 0, behavior: "smooth" });
                } else if (href.startsWith("/#")) scrollToTarget(href.slice(1));
                else router.push(href);
            }, 350);
        },
        [pathname, router]
    );

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[var(--ease-out-expo)] ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
            >
                <div
                    className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 transition-[background-color,backdrop-filter] duration-500 md:px-10 ${scrolled && !open ? "bg-ink/60 backdrop-blur-md" : ""}`}
                >
                    <Link href="/" className="group flex items-center gap-3" aria-label="Suresh Kannan, home">
                        <span className="display-italic grid h-9 w-9 place-items-center rounded-full border border-line text-lg text-bone transition-colors group-hover:border-amber group-hover:text-amber">
                            S
                        </span>
                        <span className="hidden text-sm font-medium text-bone sm:inline">{profile.name}</span>
                    </Link>

                    <div className="eyebrow hidden lg:block">
                        Kochi, IN · <LocalTime />
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/#contact"
                            onClick={(e) => {
                                if (pathname !== "/") return;
                                e.preventDefault();
                                scrollToTarget("#contact");
                            }}
                            className="hidden rounded-full px-4 py-2.5 text-sm text-bone transition-colors hover:text-amber md:block"
                        >
                            Let’s talk
                        </Link>

                        {/* Menu trigger: current section + page progress */}
                        <button
                            ref={triggerRef}
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            aria-controls="site-menu"
                            className={`group flex items-center gap-3 rounded-full border py-1.5 pl-4 pr-1.5 transition-colors duration-500 ${open ? "border-amber bg-amber text-ink" : "border-line bg-ink/40 text-bone backdrop-blur-md hover:border-bone-dim"}`}
                        >
                            <span className="flex items-baseline gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em]">
                                <span className={open ? "text-ink/60" : "text-amber"}>{open ? "Esc" : String(current + 1).padStart(2, "0")}</span>
                                <span className="w-[6.5rem] text-left">
                                    <Ticker text={open ? "Close" : section} />
                                </span>
                            </span>
                            <span className="relative grid h-9 w-9 place-items-center">
                                <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden>
                                    <circle cx="18" cy="18" r="16.5" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
                                    <motion.circle cx="18" cy="18" r="16.5" fill="none" stroke="currentColor" strokeWidth="1" style={{ pathLength: scrollYProgress }} />
                                </svg>
                                <span className="relative block h-2 w-3.5">
                                    <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`} />
                                    <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1 -rotate-45" : "top-2"}`} />
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Opaque backdrop; the particle canvas sits between it and the menu content */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="backdrop"
                        aria-hidden
                        initial={{ clipPath: "circle(0% at calc(100% - 5rem) 2.6rem)" }}
                        animate={{ clipPath: "circle(150% at calc(100% - 5rem) 2.6rem)" }}
                        exit={{ clipPath: "circle(0% at calc(100% - 5rem) 2.6rem)", transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1] } }}
                        transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-ink-2"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {open && (
                    <motion.div
                        id="site-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site menu"
                        data-lenis-prevent
                        initial={{ clipPath: "circle(0% at calc(100% - 5rem) 2.6rem)" }}
                        animate={{ clipPath: "circle(150% at calc(100% - 5rem) 2.6rem)" }}
                        exit={{ clipPath: "circle(0% at calc(100% - 5rem) 2.6rem)", transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1] } }}
                        transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
                        className="fixed inset-0 z-[42] overflow-y-auto bg-[linear-gradient(90deg,rgba(22,17,12,0.85)_0%,rgba(22,17,12,0.55)_55%,transparent_100%)]"
                    >
                        <div className="mx-auto grid min-h-full max-w-[1600px] grid-cols-1 content-between gap-10 px-5 pb-8 pt-28 md:px-10 lg:grid-cols-12">
                            <nav aria-label="Primary" className="lg:col-span-7" onPointerLeave={() => setHovered(null)}>
                                <ol>
                                    {MENU.map((item, i) => {
                                        const isFocus = focus === i;
                                        return (
                                            <li key={item.label} className="overflow-hidden border-b border-line">
                                                <motion.div
                                                    initial={{ y: "100%" }}
                                                    animate={{ y: "0%" }}
                                                    transition={{ duration: 1, ease: EASE, delay: 0.35 + i * 0.06 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        onClick={(e) => go(e, item.href)}
                                                        onPointerEnter={() => setHovered(i)}
                                                        onFocus={() => setHovered(i)}
                                                        aria-current={current === i ? "page" : undefined}
                                                        className={`group flex items-baseline gap-5 py-2 transition-opacity duration-500 md:py-3 ${hovered !== null && !isFocus ? "opacity-30" : "opacity-100"}`}
                                                    >
                                                        <span className="eyebrow w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                                                        {/* Upright label rolls away to reveal an italic amber twin */}
                                                        <span className="relative block overflow-hidden text-[14vw] leading-[0.95] md:text-[7vw] lg:text-[5.6vw]">
                                                            <span className={`display block transition-transform duration-700 ease-[var(--ease-out-expo)] ${isFocus && hovered !== null ? "-translate-y-full" : ""}`}>
                                                                {item.label}
                                                            </span>
                                                            <span
                                                                aria-hidden
                                                                className={`display-italic absolute inset-0 block text-amber transition-transform duration-700 ease-[var(--ease-out-expo)] ${isFocus && hovered !== null ? "translate-y-0" : "translate-y-full"}`}
                                                            >
                                                                {item.label}
                                                            </span>
                                                        </span>
                                                        {current === i && <span className="h-2 w-2 shrink-0 self-center rounded-full bg-amber" aria-hidden />}
                                                        <span
                                                            className={`ml-auto hidden max-w-[14rem] text-right text-sm text-bone-dim transition-[opacity,transform] duration-500 md:block ${isFocus ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                                                        >
                                                            {item.caption}
                                                        </span>
                                                    </Link>
                                                </motion.div>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </nav>

                            {/* Formation readout, sitting over the particles on wide screens */}
                            <motion.aside
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="flex flex-col justify-between gap-10 lg:col-span-4 lg:col-start-9"
                            >
                                <div className="hidden lg:block">
                                    <span className="eyebrow">Formation</span>
                                    <div className="display-italic mt-3 text-5xl text-bone">
                                        <Ticker text={MENU[focus].formation} />
                                    </div>
                                    <span className="eyebrow mt-3 block">Hover a destination to rearrange the field</span>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <a href={`mailto:${profile.email}`} className="display-italic text-2xl text-bone transition-colors hover:text-amber md:text-3xl">
                                        {profile.email}
                                    </a>
                                    <div className="eyebrow flex flex-wrap items-center justify-between gap-4">
                                        <span className="flex gap-5">
                                            {profile.socials.map((s) => (
                                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="!text-bone transition-colors hover:!text-amber">
                                                    {s.label}
                                                </a>
                                            ))}
                                        </span>
                                        <span>
                                            Kochi · <LocalTime />
                                        </span>
                                    </div>
                                </div>
                            </motion.aside>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
