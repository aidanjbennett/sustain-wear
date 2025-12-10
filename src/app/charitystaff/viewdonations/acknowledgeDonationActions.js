"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAcknowledgedDonations(id) {
    const acknowledgeDonation = await db.donation.update({
        where: { id: id },
        data: { acknowledged: true }
    });

    revalidatePath('charitystaff/viewdonations');

    return {
        acknowledgeDonation
    }
}