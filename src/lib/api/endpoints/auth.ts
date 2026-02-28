import { api } from "../client";
import type { SuccessResponse } from "../types";
import type { LoginRequest, LoginData } from "../types";

export async function login(body: LoginRequest) {
  const { data } = await api.post<SuccessResponse<LoginData>>("/auth/login-account", body);
  return data;
}

export async function refreshToken(refresh_token: string) {
  const { data } = await api.post<SuccessResponse<{ access_token: string }>>("/auth/refresh-token", {
    refresh_token,
  });
  return data;
}
