"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as adminApi from "../endpoints/admin";
import { adminKeys, bookingKeys, withdrawalKeys, settingsKeys } from "../query-keys";
import type {
  ActivateDeactivateUserReq,
  BookingListParams,
  WithdrawalListParams,
  UpdateWithdrawalStatusReq,
  UpdatePlatformSettingsReq,
  FundLockReq,
  PushNotificationReq,
  BroadcastPushReq,
} from "../types";

// ── Stats ─────────────────────────────────────────────────────────────────────

export function useAdminStats() {
  return useQuery({
    queryKey: adminKeys.stats(),
    queryFn: () => adminApi.getAdminStats(),
  });
}

// ── Users ─────────────────────────────────────────────────────────────────────

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

// ── Bookings ──────────────────────────────────────────────────────────────────

export function useAdminBookings(params: BookingListParams) {
  return useQuery({
    queryKey: bookingKeys.list(params as unknown as Record<string, unknown>),
    queryFn: () => adminApi.getAdminBookings(params),
  });
}

export function useReleaseEscrow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) => adminApi.releaseEscrow(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) => adminApi.cancelBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
}

// ── Withdrawals ───────────────────────────────────────────────────────────────

export function useAdminWithdrawals(params: WithdrawalListParams) {
  return useQuery({
    queryKey: withdrawalKeys.list(params as unknown as Record<string, unknown>),
    queryFn: () => adminApi.getAdminWithdrawals(params),
  });
}

export function useUpdateWithdrawalStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { id: string; body: UpdateWithdrawalStatusReq }) =>
      adminApi.updateWithdrawalStatus(args.id, args.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: withdrawalKeys.all });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
}

// ── Settings ──────────────────────────────────────────────────────────────────

export function useAdminSettings() {
  return useQuery({
    queryKey: settingsKeys.detail(),
    queryFn: () => adminApi.getAdminSettings(),
  });
}

export function useUpdateAdminSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdatePlatformSettingsReq) => adminApi.updateAdminSettings(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.all });
    },
  });
}

export function useDisburseFunds() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => adminApi.disburseFunds(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
}

// ── Merchant Fund Locks ───────────────────────────────────────────────────────

export function useLockMerchantFunds() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { merchantId: string; body: FundLockReq }) =>
      adminApi.lockMerchantFunds(args.merchantId, args.body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.user(variables.merchantId) });
    },
  });
}

export function useReleaseMerchantFunds() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args: { merchantId: string; body: FundLockReq }) =>
      adminApi.releaseMerchantFunds(args.merchantId, args.body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.user(variables.merchantId) });
    },
  });
}

// ── Push Notifications ────────────────────────────────────────────────────────

export function useSendTestPush() {
  return useMutation({
    mutationFn: (body: PushNotificationReq) => adminApi.sendTestPush(body),
  });
}

export function useSimulateSinglePush() {
  return useMutation({
    mutationFn: (body: PushNotificationReq) => adminApi.simulateSinglePush(body),
  });
}

export function useSimulateAllPush() {
  return useMutation({
    mutationFn: (body: BroadcastPushReq) => adminApi.simulateAllPush(body),
  });
}
