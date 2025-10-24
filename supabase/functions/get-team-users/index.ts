import { corsHeaders } from "../_shared/cors.ts";
import { errorHandler } from "../_shared/utils.ts";
import { createSupabaseUserClient } from "../_shared/supabase-client.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createSupabaseUserClient(req);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return errorHandler({ message: "Not authenticated", status: 401 });
    }
    const { teamId } = await req.json();
    if (!teamId) {
      return new Response(
        JSON.stringify({ error: "teamId is required" }),
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("team_members")
      .select(`
    user_id,
    profiles(full_name, avatar_url)
  `)
      .eq("team_id", teamId);

    if (error) {
      return errorHandler({
        message: "No users found for the provided team",
        status: 404,
      });
    }

    const users = data.map((member) => {
      const user = Array.isArray(member.profiles)
        ? member.profiles[0]
        : member.profiles;
      return {
        id: member.user_id,
        name: user?.full_name ?? "Unknown",
        avatar: user?.avatar_url ?? null,
      };
    });

    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return errorHandler(err);
  }
});
