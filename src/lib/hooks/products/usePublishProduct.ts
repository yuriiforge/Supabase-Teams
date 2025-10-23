import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "../../../services/products-service";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../constants/query-keys";

export const usePublishProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            productsService.publishProduct(productId),
        onSuccess: () => {
            toast.success("Product published successfully!");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to publish product");
            console.error(error);
        },
    });
};
