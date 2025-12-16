"use server";

import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function loginAction(email, password) {
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    });

    const authUser = data.user;

    const dbUser = await db.user.findUnique({
        where: { id: authUser.id }
    });

    if (!dbUser) {
        return { error: "User not found in database" };
    }

    return {
        success: true,
        role: dbUser.role,
    }
}