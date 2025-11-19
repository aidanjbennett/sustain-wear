'use client'
import { authClient } from "@/lib/auth-client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        setLoading(true);

        try {
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
                callbackURL: "/donor/dashboard",
            });

            if (error) {
                setError(error.message || "Failed to log in");
                setLoading(false);
                return;
            }

            // Login successful - redirect
            router.push("/donor/dashboard");
            router.refresh();
        } catch (err) {
            setError("An unexpected error occurred");
            setLoading(false);
            console.error(err)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
            </button>
        </form>
    )
}