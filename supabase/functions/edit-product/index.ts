import { corsHeaders } from "../_shared/cors.ts";
import { createSupabaseUserClient } from "../_shared/supabase-client.ts";
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

    const body = await req.json();
    const { productId, title, description, image_url, status } = body;

    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (fetchError || !product) {
      return errorHandler({ message: "Product not found", status: 404 });
    }

    if (product.status !== "Draft") {
      return errorHandler({
        message: "Cannot edit active product",
        status: 400,
      });
    }

    const updateData: {
      title?: string;
      description?: string;
      image_url?: string;
      status?: string;
    } = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (image_url !== undefined) updateData.image_url = image_url;

    if (status !== undefined) {
      if (status === "Active") {
        const finalProduct = {
          ...product,
          ...updateData,
        };

        if (
          !finalProduct.title || !finalProduct.description ||
          !finalProduct.image_url
        ) {
          return errorHandler({
            message:
              "Title, description, and an image are all required to publish this product.",
            status: 400,
          });
        }

        updateData.status = status;
      } else {
        return errorHandler({
          message: "Invalid status value. Only 'Active' is allowed.",
          status: 400,
        });
      }
    }

    if (Object.keys(updateData).length === 0) {
      return errorHandler({ message: "No fields to update", status: 400 });
    }

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
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
