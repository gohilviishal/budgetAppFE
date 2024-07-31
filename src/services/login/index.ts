import { ILogin } from "../../types";
import { instance } from "../axiosService";

export const login = async (data: ILogin) => {
  try {
    const response = await instance.post("/auth/login", data);
    if (!response.data) {
      throw new Error("Failed to login");
    }
    return response.data;
  } catch (error) {
    console.error("Failed to login :", error);
    throw error;
  }
};
