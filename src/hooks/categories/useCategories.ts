import { ICategoryParams } from "../../types";
import { fetchCategories } from "../../services";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export const useCategories = (params: ICategoryParams) => {
  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["categories"],
      queryFn: ({ pageParam = 1 }) => {
        return fetchCategories({ ...params, page: pageParam });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.current_page < lastPage.last_page) {
          return lastPage.current_page + 1;
        }
        return undefined;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      placeholderData: keepPreviousData,
    });
  return {
    categories: data?.pages.flatMap((page) => page.categories) || [],
    fetchNextPage,
    hasNextPage,
    isCategoriesLoading: isFetchingNextPage,
    isLoading: isLoading,
    last_page: data?.pages.flatMap((page) => page.last_page)[0] || 0,
  };
};
