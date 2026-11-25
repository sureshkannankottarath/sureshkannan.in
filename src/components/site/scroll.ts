import type Lenis from "lenis";

// The active Lenis instance, if smooth scrolling is running
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function scrollToTarget(selector: string) {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return false;
    if (scroller.lenis) scroller.lenis.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: "smooth" });
    return true;
}
