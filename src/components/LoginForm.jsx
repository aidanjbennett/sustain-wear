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
        <div className="h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit}
         className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-xs">
            {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

<p className="font-bold text-center text-2xl mb-6">Welcome back!</p>

  
            <input
                id="email"
                type="email"
                placeholder="Your email here"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded w-full py-2 px-3 mb-6 bg-gray-100"
            />

           
            <input
                id="password"
                type="password"
                placeholder="Your password here"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="border rounded w-full py-2 px-3 mb-6 bg-gray-100"
            />

            <button type="submit" disabled={loading}
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded w-full">
                {loading ? "Logging in..." : "Log in"}
            </button>
            <a href="/signup" className="text-xs flex items-center justify-center my-4 text-green-700">Not a member yet? Sign up here.</a>
        </form>
        </div>
    )
}