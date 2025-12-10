import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUnacknowledgedDonations } from "@/app/charitystaff/viewdonations/viewDonationsActions";
import { db } from "@/lib/prisma";

vi.mock("@/lib/prisma", () => ({
  db: {
    donation: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

describe("getUnacknowledgedDonations", () => {
  const mockDonations = [
    { id: 1, acknowledged: false, createdAt: new Date(), user: { id: 1, name: "Alice" } },
    { id: 2, acknowledged: false, createdAt: new Date(), user: { id: 2, name: "Bob" } },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns paginated unacknowledged donations", async () => {
    db.donation.findMany.mockResolvedValue(mockDonations);
    db.donation.count.mockResolvedValue(20);

    const result = await getUnacknowledgedDonations(1, 2);

    expect(db.donation.findMany).toHaveBeenCalledWith({
      include: { user: true },
      where: { acknowledged: false },
      orderBy: { createdAt: "desc" },
      skip: 0,
      take: 2,
    });

    expect(db.donation.count).toHaveBeenCalledWith({
      where: { acknowledged: false },
    });

    expect(result).toEqual({
      donations: mockDonations,
      total: 20,
      page: 1,
      totalPages: 10,
    });
  });

  it("calculates skip correctly for other pages", async () => {
    db.donation.findMany.mockResolvedValue(mockDonations);
    db.donation.count.mockResolvedValue(25);

    const result = await getUnacknowledgedDonations(2, 10);

    expect(db.donation.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 10, take: 10 })
    );

    expect(result.totalPages).toBe(3);
  });
});
