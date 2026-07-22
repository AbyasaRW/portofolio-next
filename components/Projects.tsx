// components/Projects.tsx
"use client";

import { useEffect, useState } from "react";
import profile from "@/data/profile";
import FadeIn from "./FadeIn";
import ProjectImage from "./ProjectImage";

interface Project {
    ID?: number;
    title: string;
    stack: string;
    description: string;
    link?: string | null;
    image?: string | null;
}

const SkeletonCard = () => (
    <div className="border border-gray-800 rounded-xl overflow-hidden flex flex-col animate-pulse bg-gray-900/20">
        <div className="h-48 bg-gray-800/50 w-full"></div>
        <div className="p-6 flex flex-col gap-3 flex-1">
            <div className="h-6 bg-gray-800/50 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800/50 rounded w-1/4"></div>
            <div className="h-4 bg-gray-800/50 rounded w-5/6"></div>
            <div className="h-4 bg-gray-800/50 rounded w-2/3"></div>
        </div>
    </div>
);

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
                const res = await fetch(`${apiUrl}/projects`);
                if (!res.ok) throw new Error("Gagal mengambil data");
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data);
                } else {
                    // Fallback to local profile projects if array is empty
                    setProjects(profile.projects);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                // Fallback to local profile projects on error
                setProjects(profile.projects);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="px-8 py-20">
            <h2 className="text-3xl font-bold mb-10">Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    projects.map((project, index) => (
                        <FadeIn key={project.title} delay={index * 0.1}>
                            <div className="border border-gray-700 rounded-xl overflow-hidden flex flex-col hover:border-blue-500 transition-colors h-full bg-gray-900/10 backdrop-blur-sm">
                                {project.image && (
                                    <ProjectImage src={project.image} alt={project.title} />
                                )}

                                <div className="p-6 flex flex-col gap-3 flex-1">
                                    <h3 className="text-xl font-semibold">{project.title}</h3>
                                    <p className="text-sm text-blue-400">{project.stack}</p>
                                    <p className="text-gray-400">{project.description}</p>

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-500 hover:underline mt-auto inline-block"
                                        >
                                            Lihat Proyek →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </FadeIn>
                    ))
                )}
            </div>
        </section>
    );
}