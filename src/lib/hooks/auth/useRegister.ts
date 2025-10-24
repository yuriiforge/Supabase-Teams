import { useMutation } from "@tanstack/react-query";
import type { RegisterSchema } from "../../schemas/register-schema";
import { supabaseAuthService } from "../../../services/supabase-auth-service";
import toast from "react-hot-toast";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterSchema) =>
      supabaseAuthService.register(data),
    onSuccess: () => {
      toast.success("Registration successful! Please check your email.");
    },
    onError: () => {
      toast.error("Registration failed:");
    },
  });
};
