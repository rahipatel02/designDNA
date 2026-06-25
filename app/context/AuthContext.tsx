"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { getCurrentUser } from "../services/user";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (token: string) => Promise<User>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "designdna_token";

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [user, setUser] = useState<User | null>(null);

    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    useEffect(() => {

        async function initializeAuth() {

            const token = localStorage.getItem(TOKEN_KEY);

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const currentUser = await getCurrentUser();

                setUser(currentUser);

            } catch {

                localStorage.removeItem(TOKEN_KEY);

                setUser(null);

            } finally {

                setLoading(false);

            }

        }

        initializeAuth();

    }, []);

    async function login(token: string) {

        localStorage.setItem(TOKEN_KEY, token);

        const currentUser = await getCurrentUser();

        setUser(currentUser);

        return currentUser;

    }

    function logout() {

        localStorage.removeItem(TOKEN_KEY);

        setUser(null);

    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}