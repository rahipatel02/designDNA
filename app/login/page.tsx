"use client";

import { useRouter } from "next/navigation";

import { loginUser } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/user";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("designdna_token")) {
            router.replace("/");
        }
    }, [router]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
        const response = await loginUser({
            email,
            password,
        });

        await login(response.access_token);

        // Get the logged-in user's information
        const user = await getCurrentUser();

        if (user.role === "admin") {
            router.push("/admin");
        } else {
            router.push("/profile");
        }

        } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
        } finally {
        setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <Navbar />
        <div className="w-full max-w-md rounded-xl bg-zinc-900 p-8 shadow-xl">

            <h1 className="text-3xl font-bold text-center mb-6">
            Login
            </h1>

            {error && (
            <div className="mb-4 rounded bg-red-600/20 border border-red-500 p-3 text-red-300">
                {error}
            </div>
            )}

            <form
            onSubmit={handleSubmit}
            className="space-y-4"
            >
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded bg-zinc-800 p-3 border border-zinc-700 outline-none"
            />

            <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded bg-zinc-800 p-3 border border-zinc-700 outline-none"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-blue-600 py-3 font-semibold hover:bg-blue-700"
            >
                {loading ? "Logging in..." : "Login"}
            </button>
            </form>

        </div>
        </main>
    );
}