/**
 * API types from api.json (Klusta API).
 * SuccessResponse: { data, message?, status }
 * ErrorResponse: { code, message, status }
 */

export interface SuccessResponse<T = unknown> {
  data: T;
  message?: string;
  status?: boolean;
}

export interface ErrorResponse {
  code: number;
  message: string;
  status?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  access_token: string;
  refresh_token: string;
  user?: { id: string; email: string; first_name?: string; last_name?: string };
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface AdminStats {
  total_users?: number;
  active_users?: number;
  total_properties?: number;
  total_amenities?: number;
  total_categories?: number;
  withdrawals?: number;
  earnings?: number;
  bookings?: number;
}

export interface AdminUsersParams {
  limit: number;
  offset: number;
}

export interface ActivateDeactivateUserReq {
  id: string;
  is_active: boolean;
}

export interface AmenitiesListParams {
  page_id: number;
  page_size: number;
}

export interface AmenityReq {
  amenity: string;
}

export interface UpdateAmenityReq {
  id: string;
  amenities: string;
}

export interface CategoryListParams {
  page_id: number;
  page_size: number;
}

export interface CategoryReq {
  category: string;
}

export interface UpdateCategoryReq {
  id: string;
  category: string;
}

export interface PropertyListParams {
  page_size: number;
  page_id?: number;
  search?: string;
  min_price?: number;
  max_price?: number;
  category?: string;
  amenity?: string;
}

export interface PropertyOwnerListParams {
  page_size: number;
  page_id?: number;
  status?: string;
}
