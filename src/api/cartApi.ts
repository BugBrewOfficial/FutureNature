import apiClient from "./apiClient";

export interface AddCartRequest {
    productId: string;
    attributeId: string;
    cartId?: string;
}

export interface DeleteCartRequest {
    cartItemId: string;
    attributeId: string;
    cartId: string;
}

export const cartApi = {
    addToCart: (data: AddCartRequest) => apiClient.post("/cart/add", data),
    getCart: () => apiClient.get("/cart/all"),
    deleteCartItem: (data: DeleteCartRequest) => apiClient.delete("/cart/delete", { data }),
};
