import { notification } from "antd";
import { verifyOtp } from "../../services";
import { IVerifyOtp } from "../../types";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

export const useVerifyOtp = () => {
  const mutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      notification.success({
        message: "OTP Verified",
        description: "Your OTP has been successfully verified.",
        duration: 2,
      });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      notification.error({
        message: "OTP Verification Failed",
        description:
          error?.response?.data?.error ||
          "An error occurred while verifying the OTP. Please try again.",
        duration: 2,
      });
    },
  });

  const verifyOtpMutation = async (data: IVerifyOtp) => {
    return mutation.mutateAsync(data);
  };
  return {
    isOtpVerifyLoading: mutation.isPending,
    verifyOtp: verifyOtpMutation,
  };
};
