"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const {
        isAuthenticated,
        user,
        logout,
    } = useAuth();

    const router = useRouter();
    const pathname = usePathname();

    function handleLogout() {

        logout();

        router.push("/");

    }

    function navClass(path: string) {

        const active = pathname === path;

        return `
            px-4 py-2 rounded-lg transition-all duration-300
            ${
                active
                    ? "bg-blue-600 text-white"
                    : "hover:bg-neutral-900 hover:text-blue-400"
            }
        `;

    }

    return (

        <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800">

            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                {/* Logo */}

                <Link href="/">

                    <h1 className="text-3xl font-bold tracking-wide text-white hover:text-blue-400 transition">

                        DesignDNA

                    </h1>

                </Link>

                {/* Navigation */}

                <div className="flex items-center gap-3">

                    <Link
                        href="/"
                        className={navClass("/")}
                    >
                        Home
                    </Link>

                    {isAuthenticated && (

                        <>

                            <Link
                                href="/upload"
                                className={navClass("/upload")}
                            >
                                Upload
                            </Link>

                            <Link
                                href="/generate-logo"
                                className={navClass("/generate-logo")}
                            >
                                AI Logo
                            </Link>

                            <Link
                                href="/logo-history"
                                className={navClass("/logo-history")}
                            >
                                Logo History
                            </Link>

                            <Link
                                href="/profile"
                                className={navClass("/profile")}
                            >
                                Profile
                            </Link>

                            {user?.role === "admin" && (

                                <Link
                                    href="/admin"
                                    className="
                                        px-4 py-2 rounded-lg
                                        bg-red-600
                                        hover:bg-red-700
                                        transition
                                    "
                                >
                                    Admin
                                </Link>

                            )}

                            <button
                                onClick={handleLogout}
                                className="
                                    px-4 py-2
                                    rounded-lg
                                    bg-red-600
                                    hover:bg-red-700
                                    transition
                                "
                            >
                                Logout
                            </button>

                        </>

                    )}

                    {!isAuthenticated && (

                        <>

                            <Link
                                href="/login"
                                className="
                                    px-4 py-2
                                    rounded-lg
                                    bg-white
                                    text-black
                                    hover:bg-gray-200
                                    transition
                                "
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="
                                    px-4 py-2
                                    rounded-lg
                                    border
                                    border-gray-700
                                    hover:bg-neutral-900
                                    transition
                                "
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );

}