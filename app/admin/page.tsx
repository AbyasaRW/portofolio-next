"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
    ID: number;
    title: string;
    stack: string;
    description: string;
    link?: string | null;
    image?: string | null;
}

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // CRUD state
    const [editMode, setEditMode] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
    const [formTitle, setFormTitle] = useState("");
    const [formStack, setFormStack] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formLink, setFormLink] = useState("");
    const [formImage, setFormImage] = useState("");
    const [showForm, setShowForm] = useState(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

    // Check token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("admin_token");
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
            fetchProjects();
        }
    }, []);

    // Fetch projects
    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiUrl}/projects`);
            if (res.ok) {
                const data = await res.json();
                setProjects(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error("Gagal fetch projects", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-fetch when logged in
    useEffect(() => {
        if (isLoggedIn) {
            fetchProjects();
        }
    }, [isLoggedIn]);

    // Handle login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const res = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login gagal");
            }

            localStorage.setItem("admin_token", data.token);
            setToken(data.token);
            setIsLoggedIn(true);
            setSuccess("Login berhasil!");
            setUsername("");
            setPassword("");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        setToken(null);
        setIsLoggedIn(false);
        setProjects([]);
        setSuccess("Berhasil logout!");
        setTimeout(() => setSuccess(null), 3000);
    };

    // Handle submit form (Create/Update)
    const handleSubmitProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const projectPayload = {
            title: formTitle,
            stack: formStack,
            description: formDescription,
            link: formLink || null,
            image: formImage || null,
        };

        const url = editMode 
            ? `${apiUrl}/projects/${editingProjectId}`
            : `${apiUrl}/projects`;

        const method = editMode ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(projectPayload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Gagal menyimpan project");
            }

            setSuccess(editMode ? "Project berhasil diupdate!" : "Project berhasil ditambahkan!");
            resetForm();
            fetchProjects();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan");
        }
    };

    // Set form to edit mode
    const handleEditClick = (project: Project) => {
        setEditMode(true);
        setEditingProjectId(project.ID);
        setFormTitle(project.title);
        setFormStack(project.stack);
        setFormDescription(project.description);
        setFormLink(project.link || "");
        setFormImage(project.image || "");
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Delete project
    const handleDeleteProject = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus project ini?")) return;
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`${apiUrl}/projects/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Gagal menghapus project");
            }

            setSuccess("Project berhasil dihapus!");
            fetchProjects();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError(err.message || "Terjadi kesalahan");
        }
    };

    const resetForm = () => {
        setFormTitle("");
        setFormStack("");
        setFormDescription("");
        setFormLink("");
        setFormImage("");
        setEditMode(false);
        setEditingProjectId(null);
        setShowForm(false);
    };

    return (
        <div className="min-h-screen text-gray-100 flex flex-col items-center justify-start p-6 md:p-12">
            {/* Background elements */}
            <div className="absolute inset-0 bg-radial from-blue-900/10 via-transparent to-transparent pointer-events-none z-0" />

            <header className="w-full max-w-6xl flex justify-between items-center mb-8 relative z-10">
                <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                    ← Halaman Utama
                </Link>
                <h1 className="text-2xl font-black tracking-wider uppercase text-gray-200">
                    Admin Panel
                </h1>
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600/30 border border-red-500/50 hover:bg-red-600/50 hover:border-red-400 rounded-lg text-sm text-red-200 font-semibold transition-all duration-200"
                    >
                        Logout
                    </button>
                )}
            </header>

            {/* Notification messages */}
            <div className="w-full max-w-md relative z-10">
                {error && (
                    <div className="mb-4 p-4 rounded-xl border border-red-500/50 bg-red-500/10 text-red-200 text-sm animate-pulse">
                        ⚠️ {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-4 rounded-xl border border-green-500/50 bg-green-500/10 text-green-200 text-sm">
                        ✅ {success}
                    </div>
                )}
            </div>

            {/* MAIN CONTENT SECTION */}
            <main className="w-full max-w-6xl relative z-10 flex flex-col items-center">
                {!isLoggedIn ? (
                    /* LOGIN FORM VIEW */
                    <div className="w-full max-w-md p-8 rounded-2xl border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl flex flex-col gap-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">Masuk Admin</h2>
                            <p className="text-sm text-gray-400">Silakan login untuk mengelola project</p>
                        </div>
                        
                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username</label>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Masukkan username"
                                    className="px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password"
                                    className="px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="mt-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                {isLoading ? "Memproses..." : "Sign In"}
                            </button>
                        </form>
                    </div>
                ) : (
                    /* DASHBOARD VIEW */
                    <div className="w-full flex flex-col gap-8">
                        {/* Control buttons */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Project List</h2>
                            {!showForm ? (
                                <button
                                    onClick={() => { resetForm(); setShowForm(true); }}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg cursor-pointer transition-colors"
                                >
                                    + Add New Project
                                </button>
                            ) : (
                                <button
                                    onClick={resetForm}
                                    className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold rounded-xl cursor-pointer transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                        {/* FORM CONTAINER (Add/Edit) */}
                        {showForm && (
                            <div className="w-full p-6 md:p-8 rounded-2xl border border-gray-800 bg-black/40 backdrop-blur-xl shadow-xl flex flex-col gap-6">
                                <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
                                    {editMode ? `Edit Project: ${formTitle}` : "Create New Project"}
                                </h3>

                                <form onSubmit={handleSubmitProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formTitle}
                                            onChange={(e) => setFormTitle(e.target.value)}
                                            placeholder="e.g. Sistem Pemesanan Vape"
                                            className="px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none text-white transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tech Stack *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formStack}
                                            onChange={(e) => setFormStack(e.target.value)}
                                            placeholder="e.g. Next.js, Go, PostgreSQL"
                                            className="px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none text-white transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description *</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formDescription}
                                            onChange={(e) => setFormDescription(e.target.value)}
                                            placeholder="Tuliskan deskripsi lengkap project di sini..."
                                            className="px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none text-white transition-colors resize-none"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Link (URL)</label>
                                        <input
                                            type="url"
                                            value={formLink}
                                            onChange={(e) => setFormLink(e.target.value)}
                                            placeholder="https://example.com"
                                            className="px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none text-white transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Image (URL / Path)</label>
                                        <input
                                            type="text"
                                            value={formImage}
                                            onChange={(e) => setFormImage(e.target.value)}
                                            placeholder="e.g. /Projects/pitstop-vape.png"
                                            className="px-4 py-3 bg-gray-900/60 border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none text-white transition-colors"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 md:col-span-2 border-t border-gray-800 pt-4 mt-2">
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold rounded-xl cursor-pointer transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer shadow-lg transition-colors"
                                        >
                                            {editMode ? "Save Changes" : "Create Project"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* PROJECTS DATA TABLE */}
                        <div className="w-full rounded-2xl border border-gray-800 bg-black/30 backdrop-blur-md overflow-hidden">
                            {isLoading ? (
                                <div className="p-12 text-center text-gray-400">
                                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    Loading projects...
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="p-12 text-center text-gray-500">
                                    Belum ada project yang disimpan di database.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-800 bg-gray-900/40 text-xs font-bold uppercase tracking-wider text-gray-400">
                                                <th className="p-4 w-24">Image</th>
                                                <th className="p-4">Title</th>
                                                <th className="p-4">Tech Stack</th>
                                                <th className="p-4 max-w-xs hidden md:table-cell">Description</th>
                                                <th className="p-4 w-40 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800/60">
                                            {projects.map((project) => (
                                                <tr key={project.ID} className="hover:bg-gray-900/10 transition-colors text-sm">
                                                    <td className="p-4">
                                                        <div className="w-16 h-12 rounded bg-gray-800/80 overflow-hidden flex items-center justify-center border border-gray-700">
                                                            {project.image ? (
                                                                <img
                                                                    src={project.image}
                                                                    alt={project.title}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        // fallback text if image fails to load
                                                                        (e.target as HTMLElement).style.display = 'none';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <span className="text-[10px] text-gray-600">No Image</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 font-bold text-white">{project.title}</td>
                                                    <td className="p-4 text-blue-400 font-mono text-xs">{project.stack}</td>
                                                    <td className="p-4 max-w-xs text-gray-400 truncate hidden md:table-cell">
                                                        {project.description}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                onClick={() => handleEditClick(project)}
                                                                className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500/40 text-yellow-300 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProject(project.ID)}
                                                                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-300 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
