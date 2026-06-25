"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "../services/auth";
import Navbar from "../components/Navbar";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("designdna_token")) {
            router.replace("/");
        }
    }, [router]);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
        await registerUser({
            name,
            email,
            password,
        });

        alert("Registration successful!");

        router.push("/login");
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

            <h1 className="text-3xl font-bold mb-6 text-center">
            Create Account
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
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                setName(e.target.value)
                }
                required
                className="w-full rounded bg-zinc-800 p-3 outline-none border border-zinc-700 focus:border-blue-500"
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                setEmail(e.target.value)
                }
                required
                className="w-full rounded bg-zinc-800 p-3 outline-none border border-zinc-700 focus:border-blue-500"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                setPassword(e.target.value)
                }
                required
                className="w-full rounded bg-zinc-800 p-3 outline-none border border-zinc-700 focus:border-blue-500"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-blue-600 py-3 font-semibold hover:bg-blue-700 transition"
            >
                {loading
                ? "Creating Account..."
                : "Register"}
            </button>
            </form>

        </div>
        </main>
    );
}