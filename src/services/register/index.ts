import { IRegister } from "../../types";
import { instance } from "../axiosService";

export const register = async (data: IRegister) => {
  try {
    const response = await instance.post("/auth/register", data);
    if (!response.data) {
      throw new Error("Failed to registration");
    }
    return response.data;
  } catch (error) {
    console.error("Failed to registration :", error);
    throw error;
  }
};
