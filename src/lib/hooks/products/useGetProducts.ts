import { useQuery } from "@tanstack/react-query";
import type { ProductsResponse } from "../../types/product";
import { productsService } from "../../../services/products-service";
import type { QueryParams } from "../../types/query-params";

export const useGetProducts = ({
    page = 1,
    limit = 10,
    status,
    search,
    creator,
    team,
    enabled,
}: QueryParams & { enabled: boolean }) => {
    const params: QueryParams = { page, limit, status, search, creator, team };

    return useQuery<ProductsResponse, Error>({
        queryKey: ["products", page, limit, status, search, creator],
        queryFn: () => productsService.fetchProducts(params),
        enabled,
    });
};
