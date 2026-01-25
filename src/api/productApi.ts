import apiClient from "./apiClient";

export const productApi = {
    getAllProducts: () => apiClient.get("/product/products"),
    getProductById: (id: string) => apiClient.get(`/product/getProductInfo/${id}`),
};
