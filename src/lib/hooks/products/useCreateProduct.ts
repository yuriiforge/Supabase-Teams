import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "../../../config/supabase-client";

const createProduct = async (product: {
    title: string;
    description?: string;
    image_url?: string;
}) => {
    const { data, error } = await supabase.functions.invoke("create-product", {
        body: product,
    });

    if (error) throw new Error(error.message);
    return data;
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            toast.success("Product created successfully!");
            console.log("Created product:", data);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            toast.error(error.message);
            console.error(error);
        },
    });
};
