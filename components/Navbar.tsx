// components/Navbar.tsx
export default function Navbar() {
    const navItems = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <nav className="flex justify-between items-center px-8 py-4">
            <h1 className="text-2xl font-bold">Abyasa.</h1>

            <ul className="flex gap-8">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <a href={item.href} className="hover:text-blue-400 transition-colors">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}