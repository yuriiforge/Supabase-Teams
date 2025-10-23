import { axiosClient } from "../config/axios-client";
import { EDGE_FUNCTIONS_NAMES } from "../lib/constants/edge-functions-names";
import { handleRequestError } from "../lib/utils/handleRequestError";

class TeamsService {
    constructor() {}

    async createTeam(teamName: string) {
        try {
            const response = await axiosClient.post(
                EDGE_FUNCTIONS_NAMES.TEAMS.CREATE,
                { teamName },
            );
            return response.data;
        } catch (err) {
            handleRequestError(err);
        }
    }

    async joinTeam(inviteCode: string) {
        try {
            const response = await axiosClient.post(
                EDGE_FUNCTIONS_NAMES.TEAMS.JOIN,
                { inviteCode },
            );
            return response.data;
        } catch (err) {
            handleRequestError(err);
        }
    }
}

export const teamsService = new TeamsService();
