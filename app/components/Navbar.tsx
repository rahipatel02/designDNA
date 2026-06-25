"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const {
        isAuthenticated,
        user,
        logout,
    } = useAuth();

    const router = useRouter();

    function handleLogout() {
        logout();

        router.push("/");
    }
    console.log("Navbar authenticated:", isAuthenticated);

    return (
        <nav className="flex justify-between items-center p-6 border-b border-gray-800">

        <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">
            DesignDNA
            </h1>
        </Link>

        <div className="flex gap-4 items-center">

            <Link
            href="/upload"
            className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-900 transition"
            >
            Upload
            </Link>

            {!isAuthenticated ? (
            <>
                <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
                >
                Login
                </Link>

                <Link
                href="/register"
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-900 transition"
                >
                Register
                </Link>
            </>
            ) : (
            <>
                <Link
                href="/profile"
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition"
                >
                Profile
                </Link>

                <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
                >
                Logout
                </button>
            </>
            )}

        </div>

        </nav>
    );
}