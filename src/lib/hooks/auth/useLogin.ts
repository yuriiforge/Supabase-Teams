import { useMutation } from "@tanstack/react-query";
import { type LoginSchema } from "../../schemas/login-schema";
import { supabaseAuthService } from "../../../services/supabase-auth-service";
import toast from "react-hot-toast";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginSchema) => supabaseAuthService.login(data),
    onSuccess: () => {
      toast.success("Login successful!");
    },
    onError: (error) => {
      console.error("Failed to login", error.message);
      toast.error("Failed to login");
    },
  });
};
