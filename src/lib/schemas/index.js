import { z } from 'zod'

const upperLowerRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
const specialChars = /[^A-Za-z0-9]/g;

export const passwordSchema = z
  .string()
  .min(1, "Password cannot be empty")
  .min(8, "Password must be longer than 8 letters")
  .regex(upperLowerRegex, "Must include both upper and lower case letters")
  .refine(
    (val) => {
      const matches = val.match(specialChars);
      return matches && matches.length >= 2;
    },
    {
      message: "Must include at least 2 special characters",
    }
  );
