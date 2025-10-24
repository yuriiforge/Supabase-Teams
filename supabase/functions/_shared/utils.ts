import { SupabaseClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "./cors.ts";

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

/**
 * A reusable error handler for all Edge Functions.
 * It logs the error and returns a consistent JSON error response.
 */
type ErrorWithMessage = {
    message: string;
    status?: number;
};

export function errorHandler(err: unknown, defaultStatus = 500) {
    console.error("[Edge Function Error]", err);

    let message = "An unknown error occurred.";
    let status = defaultStatus;

    if (err instanceof Error) {
        message = err.message;
        status = (err as ErrorWithMessage).status ?? defaultStatus;
    } else if (typeof err === "object" && err !== null) {
        const maybeError = err as ErrorWithMessage;
        if (typeof maybeError.message === "string") {
            message = maybeError.message;
            status = maybeError.status ?? defaultStatus;
        }
    } else if (typeof err === "string") {
        message = err;
    }

    return new Response(
        JSON.stringify({ error: message }),
        {
            status,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
    );
}

/**
 * Function that generate unique ID for the team
 */

export function generateInviteCode(length = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
}

export async function generateUniqueInviteCode(supabase: SupabaseClient) {
    let code = "";
    let exists = true;

    while (exists) {
        code = generateInviteCode();
        const { data } = await supabase
            .from("teams")
            .select("id")
            .eq("invite_code", code)
            .maybeSingle();

        exists = !!data;
    }

    return code;
}
