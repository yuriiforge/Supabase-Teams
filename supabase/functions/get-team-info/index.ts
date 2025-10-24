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

    const { data, error } = await supabase.from("teams").select("id, name").eq(
      "created_by",
      user.id,
    ).single();

    if (error) {
      return errorHandler(error);
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return errorHandler(err);
  }
});
