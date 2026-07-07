// components/Footer.tsx
import profile from "@/data/profile";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="px-8 py-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
                © {year} {profile.name}. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm">
                
                  <a  href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                    Github
                </a>
                
                 <a   href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                    LinkedIn
                </a>
                
                  <a  href={`mailto:${profile.email}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                    Email
                </a>
            </div>
        </footer>
    );
}