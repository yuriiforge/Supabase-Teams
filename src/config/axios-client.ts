import axios from "axios";
import { supabase } from "./supabase-client";

export const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token && config.headers) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
});
