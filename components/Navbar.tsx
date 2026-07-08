// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";

const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [scrolled, setScrolled] = useState(false);

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

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 px-8 py-4 transition-colors duration-300 ${
                scrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
            }`}
        >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Abyasa.</h1>

                <ul className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={`transition-colors ${
                                    activeSection === item.id
                                        ? "text-blue-400 font-medium"
                                        : "hover:text-blue-400"
                                }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col gap-1.5 w-8"
                    aria-label="Toggle menu"
                >
                    <span className={`h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`} />
                    <span className={`h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {isOpen && (
                <ul className="md:hidden flex flex-col gap-4 mt-4 pb-4">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a  
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`block transition-colors ${
                                    activeSection === item.id
                                        ? "text-blue-400 font-medium"
                                        : "hover:text-blue-400"
                                }`}
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