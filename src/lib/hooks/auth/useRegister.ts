import { useMutation } from "@tanstack/react-query";
import type { RegisterSchema } from "../../schemas/register-schema";
import { supabaseAuthService } from "../../../services/supabase-auth-service";
import toast from "react-hot-toast";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      return supabaseAuthService.register(data);
    },
    onSuccess: () => {
      toast.success("Registered successfully !");
    },
    onError: () => {
      toast.error("Registration failed:");
    },
  });
};
