import { API_URL } from "../utils/config";
import { AnalysisResponse } from "../types/analysis";

// =========================================
// Generic API
// =========================================

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const token = localStorage.getItem("designdna_token");

    const headers = new Headers(options.headers);

    if (token) {
        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }

    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers,
        }
    );

    if (!response.ok) {

        const error = await response.json();

        throw new Error(
            error.detail || "API Error"
        );

    }

    return await response.json();

}

// =========================================
// Analyze Image
// =========================================

export async function analyzeImage(
    file: File
): Promise<AnalysisResponse> {

    const formData = new FormData();

    formData.append(
        "file",
        file
    );

    return apiFetch<AnalysisResponse>(
        "/analyze",
        {
            method: "POST",
            body: formData,
        }
    );

}