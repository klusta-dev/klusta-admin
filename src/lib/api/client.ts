"use client";

import axios, { AxiosError } from "axios";
import type { ErrorResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const API_ACCESS_KEY = process.env.NEXT_PUBLIC_API_ACCESS_KEY || "";

export const AUTH_ACCESS_KEY = "klusta_access_token";
export const AUTH_REFRESH_KEY = "klusta_refresh_token";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...(API_ACCESS_KEY ? { "api-access-key": API_ACCESS_KEY } : {}),
  },
});

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_ACCESS_KEY);
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_REFRESH_KEY);
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    try {
      const { data } = await axios.post<{ data?: { access_token?: string }; status?: boolean }>(
        `${BASE_URL}/auth/refresh-token`,
        { refresh_token: refresh },
        { headers: { "Content-Type": "application/json", "api-access-key": API_ACCESS_KEY } }
      );
      const newToken = data?.data?.access_token ?? (data as { access_token?: string }).access_token;
      if (newToken && typeof window !== "undefined") {
        localStorage.setItem(AUTH_ACCESS_KEY, newToken);
        return newToken;
      }
      return null;
    } catch {
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_ACCESS_KEY);
        localStorage.removeItem(AUTH_REFRESH_KEY);
      }
      return null;
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<ErrorResponse>) => {
    const original = err.config;
    if (err.response?.status === 401 && original && !(original as { _retry?: boolean })._retry) {
      (original as { _retry?: boolean })._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken && original.headers) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export function setAuthTokens(access: string, refresh: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_ACCESS_KEY, access);
  localStorage.setItem(AUTH_REFRESH_KEY, refresh);
}

export function clearAuthTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_ACCESS_KEY);
  localStorage.removeItem(AUTH_REFRESH_KEY);
}

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err) && err.response?.data?.message) return err.response.data.message;
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}
