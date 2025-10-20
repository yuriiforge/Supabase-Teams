import { useMutation } from "@tanstack/react-query";
import type { RegisterSchema } from "../../schemas/register-schema";
import { supabaseAuthService } from "../../../services/supabase-auth-service";
import toast from "react-hot-toast";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterSchema) =>
      supabaseAuthService.register(data),
    onSuccess: () => {
      console.log("Registration successful! Please check your email.");
      toast.success("Registration successful! Please check your email.");
    },
    onError: (error) => {
      console.error("Registration failed:", error.message);
      toast.error("Registration failed:");
    },
  });
};
