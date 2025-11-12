"use server";

import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function addDonation(formData) {

  const session = await auth.api.getSession({
    headers: await headers(),
    cookies: await cookies(),
  });

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;

  const type = formData.get("type");
  const size = formData.get("size");
  const brand = formData.get("brand");
  const colour = formData.get("colour");

  if (!type || !size || !brand || !colour) {
    throw new Error("All fields are required");
  }

  await db.donation.create({
    data: {
      userId,
      type,
      size,
      brand,
      colour,
    },
  });

  revalidatePath("/dashboard");
}
