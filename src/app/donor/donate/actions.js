"use server";

import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { donationFormSchema } from "@/lib/schemas";

export async function addDonation(formData) {

  const session = await auth.api.getSession({
    headers: await headers(),
    cookies: await cookies(),
  });

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;

  const rawData = {
    type: formData.get("type"),
    category: formData.get("category"),
    size: formData.get("size"),
    brand: formData.get("brand"),
    colour: formData.get("colour"),
    condition: formData.get("condition"),
  };

  const result = donationFormSchema.safeParse(rawData);

  if (!result.success) {
    const error = result.error.issues[0].message;
    console.log(error);
    return error;
  }

  await db.donation.create({
    data: {
      userId: userId,
      type: result.data.type,
      category: result.data.category,
      size: result.data.size,
      brand: result.data.brand,
      colour: result.data.colour,
      condition: result.data.condition,
    },
  });

  revalidatePath("/dashboard");
}
