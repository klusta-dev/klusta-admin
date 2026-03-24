"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as propertyApi from "../endpoints/property";
import { propertyKeys } from "../query-keys";

export function usePropertyList(params: { page_size: number; page_id?: number; search?: string; category?: string; amenity?: string; min_price?: number; max_price?: number }) {
  return useQuery({
    queryKey: propertyKeys.list(params),
    queryFn: () => propertyApi.getPropertyList(params),
  });
}

// export function usePropertyOwnerList(params: { page_size: number; page_id?: number; status?: string }) {
//   return useQuery({
//     queryKey: propertyKeys.ownerList(params),
//     queryFn: () => propertyApi.getPropertyOwnerList(params),
//   });
// }

export function useProperty(id: string | null) {
  const normalizedId = (id ?? "").trim();

  return useQuery({
    queryKey: propertyKeys.detail(normalizedId),
    queryFn: () => propertyApi.getProperty(normalizedId),
    enabled: normalizedId.length > 0,
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Record<string, unknown> }) =>
      propertyApi.updateProperty(id, body),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: propertyKeys.all });
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => propertyApi.deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.all });
    },
  });
}
