import { useMutation } from "@tanstack/react-query";
import { otpGenerate } from "../../services";
import { notification } from "antd";
import { AxiosError } from "axios";

export const useGenerateOtp = () => {
  const mutation = useMutation({
    mutationFn: otpGenerate,
    onSuccess: () => {
      notification.success({
        message: "OTP Generated",
        description: "Your OTP has been successfully generated.",
        duration: 2,
      });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      notification.error({
        message: "OTP Generation Failed",
        description:
          error?.response?.data?.error ||
          "An error occurred while generating the OTP. Please try again.",
        duration: 2,
      });
    },
  });

  const generateOtpMutation = async (email: string) => {
    return mutation.mutateAsync(email);
  };
  return {
    isOtpGenerateLoading: mutation.isPending,
    generateOtp: generateOtpMutation,
  };
};
