import z from "zod";
import {
    ACCEPTED_IMAGE_TYPES,
    MAX_FILE_SIZE,
} from "../constants/image-constants";

export const createProductSchema = z.object({
    title: z.string().min(2, "Title should contain at least 2 characters"),
    description: z.string().min(
        12,
        "Please, provide more detailed description",
    ),
    productPhoto: z.file().refine(
        (file) => file.size <= MAX_FILE_SIZE,
        "Maximum allowed file size is 5 MB",
    ).refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only JPG/WEBP/PNG",
    ),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
