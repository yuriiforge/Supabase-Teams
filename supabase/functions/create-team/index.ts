import { createSupabaseUserClient } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { SupabaseClient } from "npm:@supabase/supabase-js@2";

function generateInviteCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

async function generateUniqueInviteCode(supabase: SupabaseClient) {
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createSupabaseUserClient(req);

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

    return new Response(JSON.stringify({ success: true, team }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("create-product error:", err);

    return new Response(
      JSON.stringify({
        error: err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : JSON.stringify(err),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
