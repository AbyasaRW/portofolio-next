import profile from "@/data/profile";
import FadeIn from "./FadeIn";

export default function About() {
    return (
        <section id="about" className="px-8 py-20 flex flex-col gap-12">
            <FadeIn>
            <div>
                <h2 className="text-3xl font-bold mb-4">About Me</h2>
                <p className="text-gray-400 max-w-2xl">{profile.summary}</p>
            </div>
            </FadeIn>

            <FadeIn delay={0.2}>
            <div>
                <h3 className="text-xl font-semibold mb-4">Pendidikan</h3>
                <div className="flex flex-col gap-4">
                    {profile.education.map((edu) => (
                        <div key={edu.school}>
                            <p className="font-medium">{edu.school}</p>
                            <p className="text-sm text-gray-400">
                                {edu.detail} · {edu.period}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            </FadeIn>
            <FadeIn delay={0.3}>
            <div>
                <h3 className="text-xl font-semibold mb-4">Keahlian</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SkillGroup title="Bahasa Pemrograman" items={profile.skills.languages} />
                    <SkillGroup title="Tools & Software" items={profile.skills.tools} />
                    <SkillGroup title="Multimedia" items={profile.skills.multimedia} />
                    <SkillGroup title="Soft Skills" items={profile.skills.soft} />
                </div>
            </div>
            </FadeIn>

            <FadeIn delay={0.4}>
            <div>
                <h3 className="text-xl font-semibold mb-4">Sertifikasi</h3>
                <div className="flex flex-col gap-2">
                    {profile.certifications.map((cert) => (
                        <p key={cert.name} className="text-gray-400">
                            {cert.name} — <span className="text-white">{cert.org} {cert.year}</span>
                        </p>
                    ))}
                </div>
            </div>
            </FadeIn>
        </section>
    );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <p className="font-medium mb-2">{title}</p>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <span
                        key={item}
                        className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}