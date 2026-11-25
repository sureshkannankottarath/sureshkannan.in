"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/data/profile";

const format = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: profile.timezone,
});

function subscribe(onChange: () => void) {
    const id = setInterval(onChange, 15_000);
    return () => clearInterval(id);
}

// Minute-resolution string so the snapshot is stable between ticks
const getSnapshot = () => format.format(new Date());
const getServerSnapshot = () => "--:--";

export function LocalTime() {
    const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    return <span suppressHydrationWarning>{time} IST</span>;
}
