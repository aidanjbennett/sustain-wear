import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAcknowledgedDonations } from "@/app/charitystaff/viewdonations/acknowledgeDonationActions";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

vi.mock("@/lib/prisma", () => ({
  db: {
    donation: {
      update: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.spyOn(console, "error").mockImplementation(() => { });

describe("getAcknowledgedDonations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("marks donation as acknowledged and returns updated donation", async () => {
    const mockUpdatedDonation = {
      id: 1,
      acknowledged: true,
    };

    db.donation.update.mockResolvedValue(mockUpdatedDonation);

    const result = await getAcknowledgedDonations(1);

    expect(db.donation.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { acknowledged: true },
    });

    expect(revalidatePath).toHaveBeenCalledWith("charitystaff/viewdonations");

    expect(result).toEqual({
      acknowledgeDonation: mockUpdatedDonation,
    });
  });

  it("returns an error if prisma update fails", async () => {
    db.donation.update.mockRejectedValue(new Error("DB error"));

    await expect(getAcknowledgedDonations(1)).rejects.toThrow("DB error");
  });
});
