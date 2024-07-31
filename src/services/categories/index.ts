import { ICategory, ICategoryParams, IFetchCategoriesResult } from "../../types";
import { authInstance } from "../axiosService";

export const addCategory = async (data: ICategory) => {
  try {
    const response = await authInstance.post("/categories", data);
    if (!response.data) {
      throw new Error("Failed to add category");
    }
    return response.data;
  } catch (error) {
    console.error("Failed to add category :", error);
    throw error;
  }
};

export const fetchCategories = async (
  params: ICategoryParams
): Promise<IFetchCategoriesResult> => {
  try {
    const response = await authInstance.get("/categories", { params });
    if (!response.data) {
      throw new Error("Failed to fetch categories");
    }
    return {
      current_page: params?.page || 1,
      categories: response.data.data,
      last_page: response.data.pagination.totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};
