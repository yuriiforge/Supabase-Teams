import { supabase } from "../config/supabase-client";

class TeamsService {
    constructor() {}

    async createTeam(teamName: string) {
        const { data, error } = await supabase.functions.invoke("create-team", {
            body: { teamName },
        });

        if (error) throw new Error(error.message);
        return data;
    }

    async joinTeam(inviteCode: string) {
        const { data, error } = await supabase.functions.invoke("join-team", {
            body: { inviteCode },
        });

        if (error) throw new Error(error.message);
        return data;
    }
}

export const teamsService = new TeamsService();
