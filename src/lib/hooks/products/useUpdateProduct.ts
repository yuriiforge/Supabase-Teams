import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { productsService } from "../../../services/products-service";
import { QUERY_KEYS } from "../../constants/query-keys";
import type { UpdateProductSchema } from "../../schemas/update-product-schema";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProductSchema & { productId: string }) =>
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
