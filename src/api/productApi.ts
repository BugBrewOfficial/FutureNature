import apiClient from "./apiClient";

interface IAddProductPayload {
  productName: string;
  productNameTamil: string;
  description: string;
  descriptionTamil: string;
  price: string;
  discountedType: string;
  discountedAmount: string;
  imageUrl: string[];
  availableQuantity: string;
  variants: never[];
}

export const productApi = {
<<<<<<< Updated upstream
    getAllProducts: () => apiClient.get("/product/products"),
    getProductById: (id: string) => apiClient.get(`/product/getProductInfo/${id}`),
=======
  getAllProducts: () => apiClient.get("/product/products"),
  getProductById: (id: string) =>
    apiClient.get(`/product/getProductInfo/${id}`),
  addProduct: (data: IAddProductPayload) =>
    apiClient.post("/product/add", data),
>>>>>>> Stashed changes
};
