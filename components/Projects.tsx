// components/Projects.tsx
import profile from "@/data/profile";
import FadeIn from "./FadeIn";
import ProjectImage from "./ProjectImage";

export default function Projects() {
    return (
        <section id="projects" className="px-8 py-20">
            <h2 className="text-3xl font-bold mb-10">Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.projects.map((project, index) => (
                    <FadeIn key={project.title} delay={index * 0.1}>
                        <div className="border border-gray-700 rounded-xl overflow-hidden flex flex-col hover:border-blue-500 transition-colors">
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
                                        className="text-sm text-blue-500 hover:underline mt-auto"
                                    >
                                        Lihat Proyek →
                                    </a>
                                )}
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}