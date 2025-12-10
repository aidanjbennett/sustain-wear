import { describe, it, expect, vi, beforeEach } from "vitest";
import { acceptDonation, rejectDonation } from "@/app/charitystaff/accept-reject/action";
import { db } from "@/lib/prisma";

vi.mock("@/lib/prisma", () => ({
  db: {
    donation: {
      update: vi.fn(),
    },
  },
}));

vi.spyOn(console, "error").mockImplementation(() => { });

describe("Donation Status Update Actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("acceptDonation: updates donation and returns success", async () => {
    db.donation.update.mockResolvedValue({});

    const result = await acceptDonation(1, 10);

    expect(db.donation.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        status: "Accepted",
        charityStaffMemberId: 10,
        processedAt: expect.any(Date),
      },
    });

    expect(result).toEqual({
      success: true,
      message: "Donation Accepted",
    });
  });

  it("acceptDonation: returns failure on error", async () => {
    db.donation.update.mockRejectedValue(new Error("DB error"));

    const result = await acceptDonation(1, 10);

    expect(result).toEqual({
      success: false,
      message: "Failed to update donation status. Try again.",
    });
  });


  it("rejectDonation: updates donation and returns success", async () => {
    db.donation.update.mockResolvedValue({});

    const result = await rejectDonation(2, 20, "Damaged items");

    expect(db.donation.update).toHaveBeenCalledWith({
      where: { id: 2 },
      data: {
        status: "Rejected",
        charityStaffMemberId: 20,
        rejectionReason: "Damaged items",
        processedAt: expect.any(Date),
      },
    });

    expect(result).toEqual({
      success: true,
      message: "Donation Rejected",
    });
  });

  it("rejectDonation: returns failure on error", async () => {
    db.donation.update.mockRejectedValue(new Error("DB error"));

    const result = await rejectDonation(2, 20, "Damaged items");

    expect(result).toEqual({
      success: false,
      message: "Failed to update donation status. Try again.",
    });
  });
});
