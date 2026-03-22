"use client";

import { useState } from "react";

export default function ImageInputWithPreview({
    name = "image",
    label = "Upload Image",
    currentImageUrl = ""
}: {
    name?: string,
    label?: string,
    currentImageUrl?: string
}) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const imageUrlToShow = preview || currentImageUrl;

    return (
        <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#18181B] mb-2 block">{label}</label>

            <input
                className="w-full p-4 bg-[#FAFAFA] border border-black/10 rounded-xl focus:border-[#18181B] focus:outline-none text-sm"
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />

            {imageUrlToShow && (
                <div className="mt-4 relative aspect-[16/9] w-full max-w-md rounded-xl overflow-hidden bg-gray-100 border border-black/5 shadow-sm">
                    <img src={imageUrlToShow} alt="Preview" className="object-cover w-full h-full" />
                </div>
            )}

            {currentImageUrl && <input type="hidden" name="currentImage" value={currentImageUrl} />}
        </div>
    );
}
