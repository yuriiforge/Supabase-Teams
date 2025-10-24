import z from "zod";

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password too long"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
