import { api } from "../client";
import type { SuccessResponse } from "../types";
import type { PropertyListParams, PropertyOwnerListParams } from "../types";

export async function getPropertyList(params: PropertyListParams) {
  const { data } = await api.get<SuccessResponse>("/property/property-list", { params });
  return data;
}

export async function getPropertyOwnerList(params: PropertyOwnerListParams) {
  const { data } = await api.get<SuccessResponse>("/property/property-owner-list", { params });
  return data;
}

export async function getProperty(id: string) {
  const { data } = await api.get<SuccessResponse>(`/property/get-property/${id}`);
  return data;
}

export async function updateProperty(id: string, body: Record<string, unknown>) {
  const { data } = await api.put<SuccessResponse>(`/property/update/${id}`, body);
  return data;
}

export async function deleteProperty(id: string) {
  const { data } = await api.delete<SuccessResponse>(`/property/delete/${id}`);
  return data;
}
