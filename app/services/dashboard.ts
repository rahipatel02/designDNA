import { apiFetch } from "./api";
import { DashboardResponse } from "../types/dashboard";

// =====================================================
// DASHBOARD
// =====================================================

export async function getDashboard(): Promise<DashboardResponse> {

    return apiFetch<DashboardResponse>(
        "/dashboard"
    );

}