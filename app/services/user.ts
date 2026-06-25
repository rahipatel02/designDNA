import { apiFetch } from "./api";

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export async function getCurrentUser(): Promise<User> {
    return apiFetch<User>("/auth/me");
}