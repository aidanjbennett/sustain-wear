"use server";

import { db } from "@/lib/prisma";

export async function getUnacknowledgedDonations(page = 1, limit = 10) {

    const skip = (page - 1) * limit

  const donations = await db.donation.findMany({
    include: { user: true },
    where: { acknowledged: false },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  const total = await db.donation.count({
    where: { acknowledged: false }
    })
  
  return {
    donations,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}