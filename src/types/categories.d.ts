import { Pagination } from "./common";

export interface ICategory {
  name: string;
  type: string;
  status: boolean;
  order: number;
}

export interface ICategoryParams {
  page?: number;
  perPage?: number;
}

export interface ICategoriesResponse {
  data: ICategory[];
  pagination: Pagination;
}

export interface IFetchCategoriesResult {
  current_page: number;
  categories: Category[];
  last_page: number;
}
