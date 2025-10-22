export type Status = "Draft" | "Active" | "Deleted";

export interface Product {
    id: string;
    title: string;
    description: string;
    image_url?: string;
    status: Status;
    created_at: string;
    updated_at: string;
    user_id: {
        id: string;
        full_name: string;
        avatar_url?: string;
    };
}

export type ProductsResponse = {
    data: Product[];
    count: number;
};
