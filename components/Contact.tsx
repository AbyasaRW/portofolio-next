import profile from "@/data/profile";

export default function Contact() {
    return (
        <section id="contact" className="px-8 py-20 flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Contact</h2>

            <p className="text-gray-400 max-w-xl">
                Tertarik untuk berkolaborasi atau punya pertanyaan? Jangan ragu untuk menghubungi saya melalui salah satu channel di bawah.
            </p>

            <div className="flex flex-col gap-3">
                <a href={`mailto:${profile.email}`} className="text-blue-400 hover:underline w-fit">
                    {profile.email}
                </a>

                <a href={`tel:${profile.phone}`} className="text-gray-300 hover:underline w-fit">
                    {profile.phone}
                </a>

                <div className="flex gap-4 mt-2">
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                        Github
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
}