import { notification } from "antd";
import { ILogin } from "../../types";
import { login } from "../../services";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      notification.success({
        message: "Logged In",
        description: "Login has been successfully.",
        duration: 2,
      });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      notification.error({
        message: "Login Failed",
        description:
          error?.response?.data?.error ||
          "An error occurred during login. Please try again.",
        duration: 2,
      });
    },
  });
  const loginMutation = async (data: ILogin) => {
    return mutation.mutateAsync(data);
  };
  return {
    isLoginLoading: mutation.isPending,
    login: loginMutation,
  };
};
