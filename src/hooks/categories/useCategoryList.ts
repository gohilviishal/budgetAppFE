import { useQuery } from "@tanstack/react-query";
import { ICategoryParams } from "../../types";
import { fetchCategories } from "../../services";

export const useCategoryList = (params: ICategoryParams) => {
  const { data, isPending } = useQuery({
    queryKey: ["category-list"],
    queryFn: () => fetchCategories(params),
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    retry: false,
    staleTime:Infinity,
  });
  return {
    list: data,
    isLoading: isPending,
  };
};
