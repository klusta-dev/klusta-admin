"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as adminApi from "../endpoints/admin";
import { adminKeys } from "../query-keys";
import type { ActivateDeactivateUserReq } from "../types";

export function useAdminStats() {
  return useQuery({
    queryKey: adminKeys.stats(),
    queryFn: () => adminApi.getAdminStats(),
  });
}

export function useAdminUsers(params: { limit: number; offset: number }) {
  return useQuery({
    queryKey: adminKeys.users(params),
    queryFn: () => adminApi.getAdminUsers(params),
  });
}

export function useAdminUser(id: string | null) {
  return useQuery({
    queryKey: adminKeys.user(id ?? ""),
    queryFn: () => adminApi.getAdminUser(id!),
    enabled: !!id,
  });
}

export function useAdminUserStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; body: ActivateDeactivateUserReq }) =>
      adminApi.updateAdminUserStatus(args.id, args.body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.user(variables.id) });
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
}
