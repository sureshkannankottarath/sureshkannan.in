// Samples a transparent PNG into particle positions and colours.

export type PortraitSample = {
    uv: Float32Array; // xy in [-0.5, 0.5] across the image's width and height
    color: Float32Array; // rgb 0–1
    coverage: number; // fraction of the image covered by the figure
};

const SAMPLE_WIDTH = 240;

export async function samplePortrait(src: string, count: number, rand: () => number): Promise<PortraitSample> {
    const img = new Image();
    img.src = src;
    await img.decode();

    const w = SAMPLE_WIDTH;
    const h = Math.round((w * img.naturalHeight) / img.naturalWidth);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    // Candidate pixels with an acceptance weight: opaque figure, fading out at the bottom edge
    const candidates: number[] = [];
    const weights: number[] = [];
    for (let y = 0; y < h; y++) {
        const fade = Math.min(1, Math.max(0, (0.97 - y / h) / 0.25));
        for (let x = 0; x < w; x++) {
            const a = data[(y * w + x) * 4 + 3] / 255;
            if (a > 0.5 && fade > 0) {
                candidates.push(y * w + x);
                weights.push(a * fade);
            }
        }
    }

    const uv = new Float32Array(count * 2);
    const color = new Float32Array(count * 3);
    for (let i = 0; i < count; ) {
        const k = Math.floor(rand() * candidates.length);
        if (rand() > weights[k]) continue;
        const px = candidates[k] % w;
        const py = Math.floor(candidates[k] / w);
        uv[i * 2] = (px + rand()) / w - 0.5;
        uv[i * 2 + 1] = 0.5 - (py + rand()) / h;
        const o = candidates[k] * 4;
        color[i * 3] = data[o] / 255;
        color[i * 3 + 1] = data[o + 1] / 255;
        color[i * 3 + 2] = data[o + 2] / 255;
        i++;
    }

    return { uv, color, coverage: candidates.length / (w * h) };
}
