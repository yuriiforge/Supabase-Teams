import { supabase } from "../config/supabase-client";
import type { LoginSchema } from "../lib/schemas/login-schema";
import type { RegisterSchema } from "../lib/schemas/register-schema";

class SupabaseAuthService {
    constructor() {}

    async register(formData: RegisterSchema) {
        const { email, password, firstName, lastName } = formData;
        const fullName = `${firstName} ${lastName}`;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) throw error;
        return data;
    }

    async login(formData: LoginSchema) {
        const { email, password } = formData;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    }

    async signInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) throw error;
    }

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }
}

export const supabaseAuthService = new SupabaseAuthService();
