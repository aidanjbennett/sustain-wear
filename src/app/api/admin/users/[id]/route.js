import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const ALLOWED_ROLES = ["Donor", "Charity Staff", "Admin"];

async function getAdminSession(req) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session.user.role !== "Admin") {
    return null;
  }
  return session;
}

export async function GET(req, { params }) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorised" },
        { status: 403 }
      );
    }

    const userId = params.id;

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error loading user:", err);
    return NextResponse.json(
      { error: "Failed to load user" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const session = await getAdminSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorised" },
        { status: 403 }
      );
    }

    const admin = session.user;
    const userId = params.id;

    const body = await req.json();
    const newRole = body.role;

    if (!ALLOWED_ROLES.includes(newRole)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.id === admin.id) {
      return NextResponse.json(
        { error: "Admins cannot change their own role" },
        { status: 400 }
      );
    }

    if (user.role === "Admin") {
      return NextResponse.json(
        { error: "Admins cannot change another admin's role" },
        { status: 400 }
      );
    }

    if (user.role === newRole) {
      return NextResponse.json(
        { error: "Role is already set to this value" },
        { status: 400 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        role: newRole,
      },
    });

    const adminName = admin.name || "An admin";
    const userName = user.name || user.email;
    const message = `${adminName} has changed ${userName} role from ${user.role} to ${newRole}.`;

    await db.notification.createMany({
      data: [
        {
          userId: admin.id,
          message,
        },
        {
          userId: user.id,
          message,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message,
    });
  } catch (err) {
    console.error("Error updating user role:", err);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 }
    );
  }
}