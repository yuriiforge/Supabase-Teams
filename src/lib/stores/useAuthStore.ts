import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../config/supabase-client";

interface AuthState {
    session: Session | null;
    user: User | null;
    isLoading: boolean;
    setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    user: null,
    isLoading: true,
    setSession: (session) => set({ session, user: session?.user ?? null }),
}));

supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setSession(session);

    useAuthStore.setState({ isLoading: false });
});
