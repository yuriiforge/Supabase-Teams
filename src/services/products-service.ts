import { axiosClient } from "../config/axios-client";
import { supabase } from "../config/supabase-client";
import { API_ENDPOINTS } from "../lib/constants/api-endpoints";
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
}

export const productsService = new ProductsService();
