"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as amenitiesApi from "../endpoints/amenities";
import { amenitiesKeys } from "../query-keys";
import type { AmenityReq, UpdateAmenityReq } from "../types";

export function useAmenitiesList(params: { page_id: number; page_size: number }) {
  return useQuery({
    queryKey: amenitiesKeys.list(params),
    queryFn: () => amenitiesApi.getAmenitiesList(params),
  });
}

export function useAmenity(id: string | null) {
  return useQuery({
    queryKey: amenitiesKeys.detail(id ?? ""),
    queryFn: () => amenitiesApi.getAmenity(id!),
    enabled: !!id,
  });
}

export function useCreateAmenity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AmenityReq) => amenitiesApi.createAmenity(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: amenitiesKeys.all });
    },
  });
}

export function useUpdateAmenity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; body: UpdateAmenityReq }) =>
      amenitiesApi.updateAmenity(args.id, args.body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: amenitiesKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: amenitiesKeys.all });
    },
  });
}

export function useDeleteAmenity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => amenitiesApi.deleteAmenity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: amenitiesKeys.all });
    },
  });
}
