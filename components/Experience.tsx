import profile from "@/data/profile";
import FadeIn from "./FadeIn";

export default function Experience() {
    return (
        <section id="experience" className="px-8 py-20">
            <h2 className="text-3xl font-bold mb-10">Experience</h2>

            <FadeIn delay={0.1}>
            <div className="flex flex-col gap-10">
                {profile.experience.map((exp) => (
                    <div key={exp.role + exp.period} className="flex flex-col gap-2">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                            <h3 className="text-xl font-semibold">{exp.role}</h3>
                            <span className="text-sm text-gray-400">{exp.period}</span>
                        </div>

                        <p className="text-blue-400 text-sm">{exp.company}</p>

                        <ul className="list-disc list-inside text-gray-400 flex flex-col gap-1 mt-2">
                            {exp.points.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            </FadeIn>
        </section>
    );
}