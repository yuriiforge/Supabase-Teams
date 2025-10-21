import { corsHeaders } from "../_shared/cors.ts";
import {
  createSupabaseAdminClient,
  createSupabaseUserClient,
} from "../_shared/supabase-client.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { inviteCode } = await req.json();
    if (!inviteCode) {
      throw new Error("Invite code is required.");
    }

    const supabase = createSupabaseUserClient(req);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated.");
    }

    const supabaseAdmin = createSupabaseAdminClient();

    const { data: team, error: teamError } = await supabaseAdmin
      .from("teams")
      .select("id")
      .eq("invite_code", inviteCode.toUpperCase())
      .single();

    if (teamError || !team) {
      throw new Error("Invalid or expired invite code.");
    }

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ team_id: team.id })
      .eq("id", user.id);

    if (profileError) {
      throw new Error("Failed to join team. You might already be on one.");
    }

    return new Response(JSON.stringify({ teamId: team.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    const message = error instanceof Error
      ? error.message
      : "An unknown error occurred.";

    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
