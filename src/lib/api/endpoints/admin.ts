import { api } from "../client";
import type { SuccessResponse } from "../types";
import type {
  AdminStats,
  AdminUserDetail,
  AdminUserListItem,
  AdminUsersParams,
  ActivateDeactivateUserReq,
  BookingListParams,
  BookingsListData,
  WithdrawalListParams,
  WithdrawalsListData,
  UpdateWithdrawalStatusReq,
  PlatformSettings,
  UpdatePlatformSettingsReq,
  DisburseResult,
  FundLockReq,
  FundLockResult,
  PushNotificationReq,
  BroadcastPushReq,
  PushResult,
} from "../types";

// ── Stats ─────────────────────────────────────────────────────────────────────

export async function getAdminStats() {
  const { data } = await api.get<SuccessResponse<AdminStats>>("/admin/stats");
  return data;
}

// ── Users ─────────────────────────────────────────────────────────────────────

export async function getAdminUsers(params: AdminUsersParams) {
  const { data } = await api.get<SuccessResponse<{ users: AdminUserListItem[]; total: number }>>(
    "/admin/users",
    { params }
  );
  return data;
}

export async function getAdminUser(id: string) {
  const { data } = await api.get<SuccessResponse<AdminUserDetail>>(`/admin/users/${id}`);
  return data;
}

export async function updateAdminUserStatus(id: string, body: ActivateDeactivateUserReq) {
  const { data } = await api.patch<SuccessResponse>(`/admin/users/${id}/status`, body);
  return data;
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export async function getAdminBookings(params: BookingListParams) {
  const { data } = await api.get<SuccessResponse<BookingsListData>>("/admin/bookings", { params });
  return data;
}

export async function releaseEscrow(bookingId: string) {
  const { data } = await api.patch<SuccessResponse>(`/admin/bookings/${bookingId}/release-escrow`);
  return data;
}

export async function cancelBooking(bookingId: string) {
  const { data } = await api.patch<SuccessResponse>(`/admin/bookings/${bookingId}/cancel`);
  return data;
}

// ── Withdrawals ───────────────────────────────────────────────────────────────

export async function getAdminWithdrawals(params: WithdrawalListParams) {
  const { data } = await api.get<SuccessResponse<WithdrawalsListData>>("/admin/withdrawals", { params });
  return data;
}

export async function updateWithdrawalStatus(id: string, body: UpdateWithdrawalStatusReq) {
  const { data } = await api.patch<SuccessResponse>(`/admin/withdrawals/${id}/status`, body);
  return data;
}

// ── Settings ──────────────────────────────────────────────────────────────────

export async function getAdminSettings() {
  const { data } = await api.get<SuccessResponse<PlatformSettings>>("/admin/settings");
  return data;
}

export async function updateAdminSettings(body: UpdatePlatformSettingsReq) {
  const { data } = await api.patch<SuccessResponse<PlatformSettings>>("/admin/settings", body);
  return data;
}

export async function disburseFunds() {
  const { data } = await api.post<SuccessResponse<DisburseResult>>("/admin/disburse");
  return data;
}

// ── Merchant Fund Locks ───────────────────────────────────────────────────────

export async function lockMerchantFunds(merchantId: string, body: FundLockReq) {
  const { data } = await api.patch<SuccessResponse<FundLockResult>>(
    `/admin/merchants/${merchantId}/lock-funds`,
    body
  );
  return data;
}

export async function releaseMerchantFunds(merchantId: string, body: FundLockReq) {
  const { data } = await api.patch<SuccessResponse<FundLockResult>>(
    `/admin/merchants/${merchantId}/release-funds`,
    body
  );
  return data;
}

// ── Push Notifications ────────────────────────────────────────────────────────

export async function sendTestPush(body: PushNotificationReq) {
  const { data } = await api.post<SuccessResponse<PushResult>>(
    "/admin/notifications/test-push",
    body
  );
  return data;
}

export async function simulateSinglePush(body: PushNotificationReq) {
  const { data } = await api.post<SuccessResponse<PushResult>>(
    "/admin/notifications/simulate/single",
    body
  );
  return data;
}

export async function simulateAllPush(body: BroadcastPushReq) {
  const { data } = await api.post<SuccessResponse<PushResult>>(
    "/admin/notifications/simulate/all",
    body
  );
  return data;
}
