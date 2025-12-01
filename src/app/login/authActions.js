"use server";

import { db } from "@/lib/prisma";
import { authClient } from "@/lib/auth-client";

export async function loginAction(email, password) {
    const { data, error } = await authClient.signIn.email({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    const authUser = data.user;

    const dbUser = await db.user.findUnique({
        where: {id: authUser.id}
    });

    if (!dbUser) {
        return { error: "User not found in database" };
    }

    return {
        success: true,
        role: dbUser.role,
    }
}