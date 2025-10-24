import { useQuery } from "@tanstack/react-query";
import { teamsService } from "../../../services/teams-service";
import { QUERY_KEYS } from "../../constants/query-keys";
import { type TeamMembersResponse } from "../../types/team";

export const useGetTeamMembers = (teamId?: string) => {
    return useQuery<TeamMembersResponse, Error>({
        queryKey: [QUERY_KEYS.USERS, teamId],
        queryFn: async ({ queryKey }) => {
            const [, id] = queryKey;
            return teamsService.getTeamMembers(id as string);
        },

        enabled: !!teamId,
    });
};
