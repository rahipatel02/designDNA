import { apiFetch } from "./api";
import { DashboardResponse } from "../types/dashboard";

export async function getDashboard() {
    return apiFetch<DashboardResponse>("/dashboard");
}