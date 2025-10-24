import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { productsService } from "../../../services/products-service";
import { QUERY_KEYS } from "../../constants/query-keys";

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            productsService.deleteProduct(productId),
        onSuccess: () => {
            toast.success("Product deleted successfully!");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to delete product");
        },
    });
};
