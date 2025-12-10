import { describe, it, expect } from "vitest";
import { passwordSchema } from "@/lib/schemas/password-schema";

describe("passwordSchema", () => {
  it("accepts a valid password", () => {
    const valid = "Aa!!abcd";
    const result = passwordSchema.safeParse(valid);

    expect(result.success).toBe(true);
  });

  it("fails when empty", () => {
    const result = passwordSchema.safeParse("");
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Password cannot be empty");
  });

  it("fails when shorter than 8 characters", () => {
    const result = passwordSchema.safeParse("Aa!a!");
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Password must be longer than 8 letters");
  });

  it("fails when missing uppercase", () => {
    const result = passwordSchema.safeParse("aa!!abcd");
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Must include both upper and lower case letters");
  });

  it("fails when missing lowercase", () => {
    const result = passwordSchema.safeParse("AA!!ABCD");
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Must include both upper and lower case letters");
  });

  it("fails when fewer than 2 special characters", () => {
    const result = passwordSchema.safeParse("Aa!abcde"); // only 1 special char
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Must include at least 2 special characters");
  });
});
