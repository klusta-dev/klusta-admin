import { api } from "../client";
import type { SuccessResponse } from "../types";
import type { AdminStats, AdminUserDetail, AdminUserListItem, AdminUsersParams, ActivateDeactivateUserReq } from "../types";

export async function getAdminStats() {
  const { data } = await api.get<SuccessResponse<AdminStats>>("/admin/stats");
  return data;
}

export async function getAdminUsers(params: AdminUsersParams) {
  const { data } = await api.get<SuccessResponse<{ users?: AdminUserListItem[]; total?: number }>>(
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
