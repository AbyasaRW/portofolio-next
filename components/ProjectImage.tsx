// components/ProjectImage.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

type ProjectImageProps = {
    src: string;
    alt: string;
};

export default function ProjectImage({ src, alt }: ProjectImageProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full h-48 bg-gray-900 overflow-hidden">
            {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-800" />
            )}

            <Image
                src={src}
                alt={alt}
                fill
                className={`object-cover transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}