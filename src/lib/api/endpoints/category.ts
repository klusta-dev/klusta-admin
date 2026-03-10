import { api } from "../client";
import type { SuccessResponse } from "../types";
import type { CategoryListItem, CategoryListParams, CategoryReq, UpdateCategoryReq } from "../types";

export async function getCategoryList(params: CategoryListParams) {
  const { data } = await api.get<SuccessResponse<{ categories?: CategoryListItem[]; total?: number }>>(
    "/category/category-list",
    { params }
  );
  return data;
}

export async function getCategory(id: string) {
  const { data } = await api.get<SuccessResponse<CategoryListItem>>(`/category/get-category/${id}`);
  return data;
}

export async function createCategory(body: CategoryReq) {
  const { data } = await api.post<SuccessResponse>("/category/create", body);
  return data;
}

export async function updateCategory(id: string, body: UpdateCategoryReq) {
  const { data } = await api.patch<SuccessResponse>(`/category/update/${id}`, body);
  return data;
}

export async function deleteCategory(id: string) {
  const { data } = await api.delete<SuccessResponse>(`/category/delete/${id}`);
  return data;
}
