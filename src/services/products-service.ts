import { axiosClient } from "../config/axios-client";
import { supabase } from "../config/supabase-client";
import { API_ENDPOINTS } from "../lib/constants/api-endpoints";
import { EDGE_FUNCTIONS_NAMES } from "../lib/constants/edge-functions-names";
import type { UpdateProductSchema } from "../lib/schemas/update-product-schema";
import type { ProductsResponse } from "../lib/types/product";
import type { QueryParams } from "../lib/types/query-params";

class ProductsService {
    constructor() {}

    async fetchProducts(params: QueryParams): Promise<ProductsResponse> {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        const response = await axiosClient.get(API_ENDPOINTS.PRODUCTS, {
            params,
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        });

        return response.data as ProductsResponse;
    }

    async createProduct(product: {
        title: string;
        description?: string;
        image_url?: string;
    }) {
        const { data, error } = await supabase.functions.invoke(
            EDGE_FUNCTIONS_NAMES.CREATE_PRODUCT,
            {
                body: product,
            },
        );

        if (error) throw new Error(error.message);
        return data;
    }

    async updateProduct(product: UpdateProductSchema & { productId: string }) {
        const { data, error } = await supabase.functions.invoke(
            EDGE_FUNCTIONS_NAMES.UPDATE_PRODUCT,
            { method: "POST", body: product },
        );

        if (error) throw new Error(error.message);
        return data;
    }

    async publishProduct(productId: string) {
        const { data, error } = await supabase.functions.invoke(
            EDGE_FUNCTIONS_NAMES.UPDATE_PRODUCT,
            { body: { productId, status: "Active" } },
        );

        if (error) throw new Error(error.message);
        return data;
    }

    async deleteProduct(productId: string) {
        const { data, error } = await supabase.functions.invoke(
            EDGE_FUNCTIONS_NAMES.DELETE_PRODUCT,
            { body: { productId } },
        );

        if (error) throw new Error(error.message);
        return data;
    }
}

export const productsService = new ProductsService();
