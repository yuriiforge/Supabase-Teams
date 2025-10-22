import axios from "axios";

export const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`,
    headers: {
        "Content-Type": "application/json",
    },
});
