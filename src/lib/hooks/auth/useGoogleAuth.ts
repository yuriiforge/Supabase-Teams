import { useMutation } from "@tanstack/react-query";
import { supabaseAuthService } from "../../../services/supabase-auth-service";
import toast from "react-hot-toast";

export const useGoogleAuth = () => {
    return useMutation({
        mutationFn: supabaseAuthService.signInWithGoogle,
        onSuccess: () => {
            toast.success("Signed in successfully!");
        },
        onError: (error) => {
            console.error("Google sign-in failed:", error.message);
            toast.error("Google sign-in failed:");
        },
    });
};
