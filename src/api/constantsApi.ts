import apiClient from "./apiClient";

export const constantsApi = {
  getConstants: () => apiClient.get("/constants/all"),
  editConstants: (data: any) => apiClient.put("/constants/edit", data),
};
