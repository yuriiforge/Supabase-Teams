import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStore";
import { profileService } from "../../services/profile-service";

export const useProfile = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ["profile", user?.id],
        queryFn: async () => {
            if (!user) throw new Error("No user available");
            return profileService.getProfile();
        },
        enabled: !!user,
        staleTime: Infinity,
    });
};
