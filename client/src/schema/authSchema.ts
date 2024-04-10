import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required").trim(),
  password: z.string().min(3, "Password must be at least 3 characters long"),
  remember: z.boolean(),
});

export const signupSchema = z.object({
  email: z.string().email("Email is required").trim(),
  name: z.string().min(3, "Company name is required").trim(),
  // industryList: z
  //   .string()
  //   .array()
  //   .nonempty("Please select at least One technology"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});
