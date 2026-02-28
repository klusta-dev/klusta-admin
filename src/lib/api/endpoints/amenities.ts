import { api } from "../client";
import type { SuccessResponse } from "../types";
import type { AmenitiesListParams, AmenityReq, UpdateAmenityReq } from "../types";

export async function getAmenitiesList(params: AmenitiesListParams) {
  const { data } = await api.get<SuccessResponse>( "/amenities/amenities-list", { params });
  return data;
}

export async function getAmenity(id: string) {
  const { data } = await api.get<SuccessResponse>(`/amenities/get-amenities/${id}`);
  return data;
}

export async function createAmenity(body: AmenityReq) {
  const { data } = await api.post<SuccessResponse>("/amenities/create", body);
  return data;
}

export async function updateAmenity(id: string, body: UpdateAmenityReq) {
  const { data } = await api.patch<SuccessResponse>(`/amenities/update/${id}`, body);
  return data;
}

export async function deleteAmenity(id: string) {
  const { data } = await api.delete<SuccessResponse>(`/amenities/delete/${id}`);
  return data;
}
