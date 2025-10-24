import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";
import { teamsService } from "../../../services/teams-service";

export const useGetTeamInfo = (teamId?: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.TEAM, teamId],
        queryFn: async () => {
            if (!teamId) return null;

            return await teamsService.getTeamName(teamId);
        },
        enabled: !!teamId,
    });
};
