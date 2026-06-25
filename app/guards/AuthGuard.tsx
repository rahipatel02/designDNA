"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

type Props = {
    children: ReactNode;
};

export default function AuthGuard({
    children,
}: Props) {

    const router = useRouter();

    const { isAuthenticated } = useAuth();

    useEffect(() => {

        if (!isAuthenticated) {
            router.replace("/login");
        }

    }, [isAuthenticated, router]);

    const { loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}