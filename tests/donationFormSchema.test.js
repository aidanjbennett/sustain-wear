import { describe, it, expect } from "vitest";
import { donationFormSchema } from "@/lib/schemas/donation-form";

describe("donationFormSchema", () => {
  const validData = {
    type: "Clothing",
    category: "Shirt",
    size: "M",
    brand: "Nike",
    colour: "Red",
    condition: "New",
  };

  it("accepts valid data", () => {
    const result = donationFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails when a required field is empty", () => {
    for (const key of Object.keys(validData)) {
      const data = { ...validData, [key]: "" };
      const result = donationFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      // check that the error is the first one
      const issue = result.error?.issues.find(i => i.path[0] === key);
      expect(issue?.message).toMatch(/cannot be empty/i);
    }
  });

  it("fails when a field exceeds max length", () => {
    const longString = "a".repeat(27); // max is 26
    for (const key of Object.keys(validData)) {
      const data = { ...validData, [key]: longString };
      const result = donationFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      const issue = result.error?.issues.find(i => i.path[0] === key);
      expect(issue?.message).toMatch(/too long/i);
    }
  });
});
