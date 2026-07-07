// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";

    const navItems = [
        { label: "Home", href: "#home", id: "home" },
        { label: "About", href: "#about" , id: "about" },
        { label: "Projects", href: "#projects" , id: "projects" },
        { label: "Experience", href: "#experience" , id: "experience" },
        { label: "Contact", href: "#contact" , id: "contact" },
    ];


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activesection, setActiveSection] = useState("home");


        useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px" }
        );

        navItems.forEach((item) => {
            const section = document.getElementById(item.id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="relative px-8 py-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Abyasa.</h1>

                {/* Menu versi desktop, disembunyikan di layar kecil */}
                <ul className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a href={item.href} className="hover:text-blue-400 transition-colors">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Tombol hamburger, cuma muncul di layar kecil */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col gap-1.5 w-8"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`h-0.5 bg-white transition-transform ${
                            isOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                    />
                    <span
                        className={`h-0.5 bg-white transition-opacity ${
                            isOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`h-0.5 bg-white transition-transform ${
                            isOpen ? "-rotate-45 -translate-y-2" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Dropdown menu mobile, cuma muncul kalau isOpen true */}
            {isOpen && (
                <ul className="md:hidden flex flex-col gap-4 mt-4 pb-4">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block hover:text-blue-400 transition-colors"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}