import { createSupabaseUserClient } from "../_shared/supabase-client.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { errorHandler } from "../_shared/utils.ts";

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

    const { productId } = await req.json();

    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (fetchError || !product) {
      return errorHandler({ message: "Product not found", status: 404 });
    }

    const { data, error } = await supabase
      .from("products")
      .update({ status: "Deleted" })
      .eq("id", productId)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err: unknown) {
    return errorHandler(err);
  }
});
