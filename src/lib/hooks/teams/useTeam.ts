import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { teamsService } from "../../../services/teams-service";

export const useCreateTeam = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (teamName: string) => teamsService.createTeam(teamName),
        onSuccess: () => {
            toast.success("Team created successfully!");
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useJoinTeam = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (inviteCode: string) => teamsService.joinTeam(inviteCode),
        onSuccess: () => {
            toast.success("Joined team successfully!");
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
