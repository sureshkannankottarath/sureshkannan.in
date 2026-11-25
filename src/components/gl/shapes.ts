// Particle formations for the WebGL field. Each returns `count` xyz triples.
// 0 chaos   — raw ideas and constraints
// 1 lattice — WBS / plan structure
// 2 network — AI & automation
// 3 ring    — the calm orbit of a shipped product (contact)

type Rand = () => number;

export function mulberry32(seed: number): Rand {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function gauss(r: Rand) {
    // Box–Muller
    const u = Math.max(r(), 1e-6);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
}

function randomInSphere(r: Rand, radius: number): [number, number, number] {
    const u = r();
    const v = r();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const rad = radius * Math.cbrt(r());
    return [rad * Math.sin(phi) * Math.cos(theta), rad * Math.sin(phi) * Math.sin(theta), rad * Math.cos(phi)];
}

function fibonacciSphere(n: number, radius: number): [number, number, number][] {
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const theta = golden * i;
        pts.push([Math.cos(theta) * rad * radius, y * radius, Math.sin(theta) * rad * radius]);
    }
    return pts;
}

export function chaos(count: number, r: Rand) {
    const out = new Float32Array(count * 3);
    const blobs = Array.from({ length: 9 }, () => randomInSphere(r, 2.6));
    for (let i = 0; i < count; i++) {
        let p: [number, number, number];
        if (r() < 0.55) {
            const b = blobs[Math.floor(r() * blobs.length)];
            const s = 0.25 + r() * 0.45;
            p = [b[0] + gauss(r) * s, b[1] + gauss(r) * s, b[2] + gauss(r) * s];
        } else {
            p = randomInSphere(r, 3.6);
        }
        out.set(p, i * 3);
    }
    return out;
}

export function lattice(count: number, r: Rand) {
    const out = new Float32Array(count * 3);
    const cells = 5;
    const size = 4.2;
    const step = size / cells;
    const half = size / 2;
    for (let i = 0; i < count; i++) {
        const a = Math.floor(r() * (cells + 1)) * step - half;
        const b = Math.floor(r() * (cells + 1)) * step - half;
        let p: [number, number, number];
        if (r() < 0.22) {
            // Nodes at the intersections
            const c = Math.floor(r() * (cells + 1)) * step - half;
            const j = 0.035;
            p = [a + gauss(r) * j, b + gauss(r) * j, c + gauss(r) * j];
        } else {
            // Points running along one of the three axis-aligned grid lines
            const t = r() * size - half;
            const axis = Math.floor(r() * 3);
            p = axis === 0 ? [t, a, b] : axis === 1 ? [a, t, b] : [a, b, t];
        }
        out.set(p, i * 3);
    }
    return out;
}

export function network(count: number, r: Rand) {
    const out = new Float32Array(count * 3);
    const nodes = fibonacciSphere(96, 1).map(([x, y, z]) => {
        const rad = 2.0 + r() * 0.7;
        return [x * rad, y * rad, z * rad] as [number, number, number];
    });
    // Connect each node to its three nearest neighbours
    const edges: [number, number][] = [];
    nodes.forEach((n, i) => {
        nodes
            .map((m, j) => ({ j, d: (n[0] - m[0]) ** 2 + (n[1] - m[1]) ** 2 + (n[2] - m[2]) ** 2 }))
            .filter(({ j }) => j !== i)
            .sort((x, y) => x.d - y.d)
            .slice(0, 3)
            .forEach(({ j }) => edges.push([i, j]));
    });
    const shell = fibonacciSphere(4000, 2.35);
    for (let i = 0; i < count; i++) {
        const k = r();
        let p: [number, number, number];
        if (k < 0.28) {
            const n = nodes[Math.floor(r() * nodes.length)];
            const s = 0.06;
            p = [n[0] + gauss(r) * s, n[1] + gauss(r) * s, n[2] + gauss(r) * s];
        } else if (k < 0.78) {
            const [ia, ib] = edges[Math.floor(r() * edges.length)];
            const a = nodes[ia];
            const b = nodes[ib];
            const t = r();
            p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
        } else {
            const s = shell[Math.floor(r() * shell.length)];
            p = [s[0], s[1], s[2]];
        }
        out.set(p, i * 3);
    }
    return out;
}

export function ring(count: number, r: Rand) {
    const out = new Float32Array(count * 3);
    const tilt = 1.18;
    const cos = Math.cos(tilt);
    const sin = Math.sin(tilt);
    for (let i = 0; i < count; i++) {
        const theta = r() * Math.PI * 2;
        const inner = r() < 0.12;
        const rad = inner ? 0.6 + r() * 2.0 : 3.1 + gauss(r) * (r() < 0.8 ? 0.12 : 0.4);
        const x = Math.cos(theta) * rad;
        const z = Math.sin(theta) * rad;
        const y = gauss(r) * (inner ? 0.12 : 0.04);
        // Tilt around the x axis so the ring reads as an orbit
        out.set([x, y * cos - z * sin, y * sin + z * cos], i * 3);
    }
    return out;
}
