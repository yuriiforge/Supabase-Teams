import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { productsService } from "../../../services/products-service";
import type { CreateProductPayload } from "../../types/product";

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProductPayload) =>
            productsService.createProduct(data),
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
