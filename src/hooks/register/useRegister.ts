import { notification } from "antd";
import { IRegister } from "../../types";
import { register } from "../../services";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      notification.success({
        message: "User registered",
        description: "Registration has been successfully.",
        duration: 2,
      });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      notification.error({
        message: "User Registration Failed",
        description:
          error?.response?.data?.error ||
          "An error occurred during user registration. Please try again.",
        duration: 2,
      });
    },
  });

  const registerMutation = async (data: IRegister) => {
    return mutation.mutateAsync(data);
  };
  return {
    isRegisterLoading: mutation.isPending,
    register: registerMutation,
  };
};
