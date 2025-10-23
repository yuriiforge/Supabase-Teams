import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { productsService } from "../../../services/products-service";
import { QUERY_KEYS } from "../../constants/query-keys";

interface UpdateProductInput {
    productId: string;
    title?: string;
    description?: string;
    image_url?: string;
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProductInput) =>
            productsService.updateProduct(data),
        onSuccess: () => {
            toast.success("Product updated successfully!");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update product");
            console.error(error);
        },
    });
};
