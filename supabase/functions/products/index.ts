import { createSupabaseUserClient } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { errorHandler } from "../_shared/utils.ts";

const DEFAULT_PAGE_SIZE = 10;

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
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(
      url.searchParams.get("limit") || `${DEFAULT_PAGE_SIZE}`,
      10,
    );
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");
    const creator = url.searchParams.get("creator");
    const team = url.searchParams.get("team");

    let query = supabase
      .from("products")
      .select(
        "*, profiles:user_id ( id, full_name, avatar_url )",
        { count: "exact" },
      )
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }
    if (creator) {
      query = query.eq("user_id", creator);
    }
    if (team) {
      query = query.eq("team_id", team);
    }
    if (search) {
      query = query.textSearch("fts", search);
    }

    const rangeFrom = (page - 1) * limit;
    const rangeTo = page * limit - 1;
    query = query.range(rangeFrom, rangeTo);

    const { data: products, count, error } = await query;

    if (error) throw error;

    return new Response(JSON.stringify({ data: products, count }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    return errorHandler(err);
  }
});
