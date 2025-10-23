import { axiosClient } from "../config/axios-client";
import { API_ENDPOINTS } from "../lib/constants/api-endpoints";
import { EDGE_FUNCTIONS_NAMES } from "../lib/constants/edge-functions-names";
import type { UpdateProductSchema } from "../lib/schemas/update-product-schema";
import type {
    CreateProductPayload,
    ProductsResponse,
} from "../lib/types/product";
import type { QueryParams } from "../lib/types/query-params";
import { handleRequestError } from "../lib/utils/handleRequestError";

class ProductsService {
    constructor() {}

    async fetchProducts(params: QueryParams): Promise<ProductsResponse> {
        const response = await axiosClient.get(API_ENDPOINTS.PRODUCTS, {
            params,
        });

        return response.data as ProductsResponse;
    }

    async createProduct(product: CreateProductPayload) {
        try {
            const response = await axiosClient.post(
                EDGE_FUNCTIONS_NAMES.CREATE_PRODUCT,
                product,
            );

            return response.data;
        } catch (err) {
            handleRequestError(err);
        }
    }

    async updateProduct(product: UpdateProductSchema & { productId: string }) {
        try {
            const response = await axiosClient.post(
                EDGE_FUNCTIONS_NAMES.UPDATE_PRODUCT,
                product,
            );
            return response.data;
        } catch (err) {
            handleRequestError(err);
        }
    }

    async publishProduct(productId: string) {
        try {
            const response = await axiosClient.post(
                EDGE_FUNCTIONS_NAMES.UPDATE_PRODUCT,
                { productId, status: "Active" },
            );
            return response.data;
        } catch (err) {
            handleRequestError(err);
        }
    }

    async deleteProduct(productId: string) {
        try {
            const response = await axiosClient.post(
                EDGE_FUNCTIONS_NAMES.DELETE_PRODUCT,
                { productId },
            );
            return response.data;
        } catch (err) {
            handleRequestError(err);
        }
    }
}

export const productsService = new ProductsService();
