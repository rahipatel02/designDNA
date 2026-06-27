"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getLogoHistory,
    deleteLogo,
    LogoResponse,
} from "../services/logo";

export default function LogoHistoryPage() {

    const [logos, setLogos] =
        useState<LogoResponse[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function loadHistory() {

        try {

            const data = await getLogoHistory();

            setLogos(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadHistory();

    }, []);

    async function handleDelete(id: number) {

        if (!confirm("Delete this logo?")) return;

        try {

            await deleteLogo(id);

            setLogos((prev) =>
                prev.filter((logo) => logo.id !== id)
            );

        }

        catch (err) {

            console.error(err);

            alert("Failed to delete logo.");

        }

    }

    return (

        <>
            <Navbar />

            <main className="min-h-screen bg-black text-white px-8 py-10">

                <div className="mb-10">

                    <h1 className="text-5xl font-bold">

                        Logo History

                    </h1>

                    <p className="text-gray-400 mt-3">

                        All AI generated logos.

                    </p>

                </div>

                {loading ? (

                    <div className="text-center py-20">

                        Loading...

                    </div>

                ) : logos.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-gray-700 p-16 text-center text-gray-500">

                        No logos generated yet.

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                        {logos.map((logo) => (

                            <div
                                key={logo.id}
                                className="rounded-2xl bg-neutral-900 border border-gray-800 overflow-hidden hover:border-blue-500 transition"
                            >

                                <img
                                    src={`http://127.0.0.1:8000${logo.image_path}`}
                                    alt={logo.prompt}
                                    className="w-full h-72 object-contain bg-neutral-950"
                                />

                                <div className="p-6">

                                    <h2 className="font-bold text-xl">

                                        {logo.prompt}

                                    </h2>

                                    <p className="text-blue-400 mt-2">

                                        {logo.style}

                                    </p>

                                    <p className="text-gray-500 text-sm mt-2">

                                        {new Date(
                                            logo.created_at
                                        ).toLocaleDateString()}

                                    </p>

                                    <div className="flex gap-3 mt-6">

                                        <a
                                            href={`http://127.0.0.1:8000${logo.image_path}`}
                                            download
                                            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3"
                                        >
                                            Download
                                        </a>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    logo.id
                                                )
                                            }
                                            className="flex-1 bg-red-600 hover:bg-red-700 transition rounded-xl py-3"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </>

    );

}