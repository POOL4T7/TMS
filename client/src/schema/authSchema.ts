import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email is required').trim(),
  password: z.string().min(3, 'Password must be at least 3 characters long'),
});

export const signupSchema = z.object({
  email: z.string().email('Email is required').trim(),
  name: z.string().min(3, 'Company name is required').trim(),
  password: z.string().min(3, 'Password must be at least 3 characters long'),
});
export const forgotPasswordSchema = z.object({
  email: z.string().email('Email is required').trim(),
});
export const resetPasswordSchema = z.object({
  password: z.string().min(3, 'Password must be at least 3 characters long'),
  confirmPassword: z
    .string()
    .min(3, 'Password must be at least 3 characters long'),
});
