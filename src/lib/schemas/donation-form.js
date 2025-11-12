import { z } from "zod"

export const donationFormSchema = z.object({
  type: z.string().min(1, "Type cannot be empty").max(26, "Type is too long"),
  size: z.string().min(1, "Size cannot be empty").max(26, "Size is too long"),
  brand: z.string().min(1, "Brand cannot be empty").max(26, "Brand is too long"),
  colour: z.string().min(1, "Colour cannot be empty").max(26, "Colour is too long"),
  condition: z.string().min(1, "Condition cannot be empty").max(26, "Condition is too long"),
})