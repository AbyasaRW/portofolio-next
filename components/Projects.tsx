// components/Projects.tsx
import profile from "@/data/profile";

export default function Projects() {
  return (
    <section id="projects" className="px-8 py-20">
      <h2 className="text-3xl font-bold mb-10">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.projects.map((project) => (
          <div
            key={project.title}
            className="border border-gray-700 rounded-xl p-6 flex flex-col gap-3 hover:border-blue-500 transition-colors"
          >
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
        ))}
      </div>
    </section>
  );
}