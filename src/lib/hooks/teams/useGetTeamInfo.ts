import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";
import { teamsService } from "../../../services/teams-service";

export const useGetTeamInfo = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.TEAM],
        queryFn: async () => await teamsService.getTeamName(),
    });
};
