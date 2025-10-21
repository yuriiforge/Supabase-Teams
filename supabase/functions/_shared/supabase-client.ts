import { createClient } from "npm:@supabase/supabase-js@2";

export function createSupabaseUserClient(req: Request) {
    return createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        {
            global: {
                headers: {
                    Authorization: req.headers.get("Authorization") ?? "",
                },
            },
        },
    );
}

export function createSupabaseAdminClient() {
    return createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
}
