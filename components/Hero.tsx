"use client";

import profile from "@/data/profile";
import Button from "./Button";

export default function Hero() {
    const handleClick = (type: string) => {
        if (type === "cv") {
            window.open("/CV_Abyasa_Reksa_W.pdf", "_blank");
        }

        if (type === "linkedin") {
            window.open("https://linkedin.com/in/abyasa-reksa-wibawadi", "_blank");
        }

        if (type === "github") {
            window.open("https://github.com/AbyasaRW", "_blank");
        }
    };

    return (
        <section className="flex flex-col gap-4 px-8 py-20">
            <h1 className="text-4xl font-bold">
                {profile.name}
            </h1>

            <p className="text-lg">
                {profile.description}
            </p>

            <div className="flex gap-3">
                {profile.buttons.map((btn) => (
                    <Button
                        key={btn.type}
                        text={btn.label}
                        onClick={() => handleClick(btn.type)}
                    />
                ))}
            </div>
        </section>
    );
}