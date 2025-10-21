import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "../../../config/supabase-client";

const createTeam = async (teamName: string) => {
    const { data, error } = await supabase.functions.invoke("create-team", {
        body: { teamName },
    });

    if (error) throw new Error(error.message);
    return data;
};

export const useCreateTeam = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTeam,
        onSuccess: () => {
            toast.success("Team created successfully!");
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

const joinTeam = async (inviteCode: string) => {
    const { data, error } = await supabase.functions.invoke("join-team", {
        body: { inviteCode },
    });

    if (error) throw new Error(error.message);
    return data;
};

export const useJoinTeam = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: joinTeam,
        onSuccess: () => {
            toast.success("Joined team successfully!");
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
