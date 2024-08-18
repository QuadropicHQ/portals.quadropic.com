import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});
