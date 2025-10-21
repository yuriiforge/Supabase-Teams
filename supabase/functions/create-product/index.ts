import { createSupabaseUserClient } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { getMyTeamId } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createSupabaseUserClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { title, description, image_url } = await req.json();
    if (!title) throw new Error("Title is required.");

    const teamId = await getMyTeamId(supabase);

    const { data: newProduct, error } = await supabase
      .from("products")
      .insert({
        team_id: teamId,
        user_id: user.id,
        title: title,
        description: description,
        image_url: image_url,
        status: "Draft",
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(newProduct), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 201,
    });
  } catch (err) {
    console.error("create-team error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : String(err),
      }),
      { status: 400, headers: corsHeaders },
    );
  }
});
