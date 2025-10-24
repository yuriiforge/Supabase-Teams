import { corsHeaders } from "../_shared/cors.ts";
import {
  createSupabaseAdminClient,
  createSupabaseUserClient,
} from "../_shared/supabase-client.ts";
import { errorHandler, generateUniqueInviteCode } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createSupabaseUserClient(req);
    const supabaseAdmin = createSupabaseAdminClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const { teamName } = await req.json();
    if (!teamName) {
      return new Response(JSON.stringify({ error: "Team name is required" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const inviteCode = await generateUniqueInviteCode(supabase);
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .insert({
        name: teamName,
        invite_code: inviteCode,
        created_by: user.id,
      })
      .select()
      .single();

    if (teamError) {
      throw new Error(teamError.message);
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ team_id: team.id, role: "admin" })
      .eq("id", user.id);

    if (profileError) {
      throw new Error(profileError.message);
    }

    await supabaseAdmin
      .from("team_members")
      .insert({
        team_id: team.id,
        user_id: user.id,
        role: "Owner",
        joined_at: new Date().toISOString(),
      });

    return new Response(JSON.stringify({ success: true, team }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
});
