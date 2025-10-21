import { supabase } from "../config/supabase-client";
import { TEAMS_PRODUCTS_PHOTO } from "../lib/constants/storage-name";

class SupabaseStorageService {
    _bucketName: string;

    constructor(bucketName: string) {
        this._bucketName = bucketName;
    }

    async createFile(file: File): Promise<string> {
        if (!file) return "";

        const filePath = `products/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage.from(
            this._bucketName,
        )
            .upload(filePath, file);

        if (uploadError) {
            throw new Error("Error uploading image, " + uploadError.message);
        }

        const { data: publicUrl } = supabase.storage.from(this._bucketName)
            .getPublicUrl(filePath);

        return publicUrl.publicUrl || "";
    }
}

export const supabaseTeamsProductPhotoService = new SupabaseStorageService(
    TEAMS_PRODUCTS_PHOTO,
);
