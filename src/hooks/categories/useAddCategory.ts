import { addCategory } from "../../services";
import { notification } from "antd";
import { AxiosError } from "axios";
import { ICategory } from "../../types";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
interface ICategoryResponse {
  data: ICategory;
}
interface InfiniteQueryData {
  pages: Array<{
    categories: ICategory[];
  }>;
  pageParams: unknown[];
}
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const mutation: UseMutationResult<
    ICategoryResponse,
    AxiosError<{ error: string }>,
    ICategory
  > = useMutation({
    mutationFn: addCategory,
    onSuccess: (newItem) => {
      queryClient.setQueryData(
        ["categories"],
        (oldData: InfiniteQueryData | undefined) => {
          if (!oldData) return oldData;
          const newData = { ...oldData };
          const lastPageIndex = newData.pages.length - 1;
          const lastPage = newData.pages[lastPageIndex];

          if (lastPage) {
            const updatedCategories = [...lastPage.categories, newItem.data];

            newData.pages[lastPageIndex] = {
              ...lastPage,
              categories: updatedCategories,
            };
          }

          return newData;
        }
      );
      notification.success({
        message: "Category added",
        description: "Category has been added successfully.",
        duration: 2,
      });
    },
    onError: (error: AxiosError<{ error: string }>) => {
      notification.error({
        message: "Adding Category Failed",
        description:
          error?.response?.data?.error ||
          "An error occurred while adding the category. Please try again.",
        duration: 2,
      });
    },
  });
  const mutationFn = async (data: ICategory) => {
    return mutation.mutateAsync(data);
  };
  return {
    isLoading: mutation.isPending,
    addCategory: mutationFn,
  };
};
