import { apiFetch } from "./api";

// =====================================================
// REQUEST
// =====================================================

export interface GenerateLogoRequest {

    prompt: string;

    style: string;

}

// =====================================================
// RESPONSE
// =====================================================

export interface LogoResponse {

    id: number;

    prompt: string;

    style: string;

    image_path: string;

    created_at: string;

}

// =====================================================
// GENERATE LOGO
// =====================================================

export async function generateLogo(
    data: GenerateLogoRequest
): Promise<LogoResponse> {

    return apiFetch<LogoResponse>(
        "/logo/generate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

}

// =====================================================
// GET LOGO HISTORY
// =====================================================

export async function getLogoHistory(): Promise<LogoResponse[]> {

    return apiFetch<LogoResponse[]>(
        "/logo/history"
    );

}

// =====================================================
// DELETE LOGO
// =====================================================

export async function deleteLogo(
    id: number
): Promise<{ message: string }> {

    return apiFetch<{ message: string }>(
        `/logo/${id}`,
        {
            method: "DELETE",
        }
    );

}

// =====================================================
// REGENERATE LOGO
// (Simply generates another logo with same prompt/style)
// =====================================================

export async function regenerateLogo(
    prompt: string,
    style: string
): Promise<LogoResponse> {

    return generateLogo({
        prompt,
        style,
    });

}

// =====================================================
// IMAGE URL HELPER
// =====================================================

export function getLogoImageUrl(
    imagePath: string
) {

    return `http://127.0.0.1:8000${imagePath}`;

}