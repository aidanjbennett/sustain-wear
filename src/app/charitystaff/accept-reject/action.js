"use server";

import { db } from "@/lib/prisma";

export async function getAcknowledgedDonations(page = 1, limit = 10) {
  const skip = (page - 1) * limit

  const donations = await db.donation.findMany({
    include: { user: true },
    where: {
      acknowledged: true,
      status: "Acknowledged"
    },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit,
  });

  const total = await db.donation.count({
    where: {
      acknowledged: true,
      status: "Acknowledged"
    }
  })

  return {
    donations,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}

export async function acceptDonation(donationId, charityStaffMemberId) {
  try {
    await db.donation.update({
      where: { id: donationId },
      data: {
        status: "Accepted",
        charityStaffMemberId: charityStaffMemberId,
        processedAt: new Date()
      }
    });

    return { success: true, message: "Donation Accepted" };
  } catch (error) {
    console.error("Error accepting donation:", error);
    return { success: false, message: "Failed to update donation status. Try again." };
  }
}

export async function rejectDonation(donationId, charityStaffMemberId, rejectionReason) {
  try {
    await db.donation.update({
      where: { id: donationId },
      data: {
        status: "Rejected",
        charityStaffMemberId: charityStaffMemberId,
        rejectionReason: rejectionReason,
        processedAt: new Date()
      }
    });

    return { success: true, message: "Donation Rejected" };
  } catch (error) {
    console.error("Error rejecting donation:", error);
    return { success: false, message: "Failed to update donation status. Try again." };
  }
}