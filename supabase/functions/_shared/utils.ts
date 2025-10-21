import { SupabaseClient } from "npm:@supabase/supabase-js@2";

/**
 * Securely fetches the logged-in user's team_id from their profile.
 * This is the single source of truth for team membership.
 */
export async function getMyTeamId(supabase: SupabaseClient): Promise<string> {
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("Not authenticated.");
    }

    const { data, error } = await supabase
        .from("profiles")
        .select("team_id")
        .eq("id", user.id)
        .single();

    if (error || !data?.team_id) {
        throw new Error("User profile not found or user is not on a team.");
    }

    return data.team_id;
}
