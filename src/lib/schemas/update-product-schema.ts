import z from "zod";
import {
    ACCEPTED_IMAGE_TYPES,
    MAX_FILE_SIZE,
} from "../constants/image-constants";

export const updateProductSchema = z.object({
    title: z.string().min(2, "Title should contain at least 2 characters")
        .optional(),
    description: z.string().min(
        12,
        "Please, provide more detailed description",
    ).optional(),
    image_url: z.string().nullable(),
    productPhoto: z
        .file().optional()
        .nullable()
        .refine(
            (file) => !file || file.size <= MAX_FILE_SIZE,
            "Maximum allowed file size is 5 MB",
        )
        .refine(
            (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only JPG/WEBP/PNG",
        ),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
