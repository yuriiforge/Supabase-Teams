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

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url, team_id")
      .eq("id", user.id)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return errorHandler(err);
  }
});
