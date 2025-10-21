import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../config/supabase-client";
import { useAuthStore } from "../stores/useAuthStore";

const getProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("team_id, full_name, avatar_url")
        .eq("id", userId)
        .single();

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const useProfile = () => {
    const user = useAuthStore((state) => state.user);

    return useQuery({
        queryKey: ["profile", user?.id],
        queryFn: () => getProfile(user!.id),
        enabled: !!user,
        staleTime: Infinity,
    });
};
