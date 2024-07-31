import { IVerifyOtp } from "../../types";
import { instance } from "../axiosService";

export const otpGenerate = async (email: string) => {
  try {
    const response = await instance.post("/auth/send-otp", { email });
    if (!response.data) {
      throw new Error("Failed to generate OTP");
    }
    return response.data;
  } catch (error) {
    console.error("Failed to generate OTP :", error);
    throw error;
  }
};

export const verifyOtp = async (data: IVerifyOtp) => {
  try {
    const response = await instance.post("/auth/verify-otp", data);
    if (!response.data) {
      throw new Error("Failed to verify OTP");
    }
    return response.data;
  } catch (error) {
    console.error("Failed to verify OTP :", error);
    throw error;
  }
};
