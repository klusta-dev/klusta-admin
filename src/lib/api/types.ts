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
  total_properties?: number;
  total_bookings?: number;
  total_earnings?: number;
  in_escrow?: number;
  total_released?: number;
  platform_revenue?: number;
  pending_withdrawal_count?: number;
  pending_withdrawal_amount?: number;
}

// ── Bookings ──────────────────────────────────────────────────────────────────

export interface BookingListParams {
  page: number;
  limit: number;
  booking_status?: "upcoming" | "ongoing" | "closed" | "cancelled";
  payment_status?: "pending" | "confirmed" | "failed";
  escrow_status?: "held" | "released" | "none";
}

export interface BookingListItem {
  id: string;
  property_id: string;
  property_name: string;
  guest_id: string;
  guest_name: string;
  guest_email: string;
  total_amount: number;
  host_earnings: number;
  tax_amount: number;
  platform_commission: number;
  booking_status: string;
  payment_status: string;
  escrow_status: string;
  payment_ref?: string;
  payment_expires_at?: string | null;
  check_in: number;
  check_out: number;
  booked_at: string;
  created_at: string;
}

export interface BookingsListData {
  total: number;
  page: number;
  limit: number;
  bookings: BookingListItem[];
}

// ── Withdrawals ───────────────────────────────────────────────────────────────

export interface WithdrawalListParams {
  page: number;
  limit: number;
  status?: "pending" | "approved" | "rejected" | "completed";
}

export interface WithdrawalListItem {
  id: string;
  amount: number;
  status: string;
  user_id: string;
  user_name: string;
  user_email: string;
  created_at: string;
  updated_at: string;
}

export interface WithdrawalsListData {
  total: number;
  page: number;
  limit: number;
  withdrawals: WithdrawalListItem[];
}

export interface UpdateWithdrawalStatusReq {
  status: "approved" | "rejected" | "completed";
}

// ── Platform Settings ─────────────────────────────────────────────────────────

export interface PlatformSettings {
  platform_commission_percentage: number;
  automatic_payment: boolean;
  transaction_wait_time_minutes: number;
}

export interface UpdatePlatformSettingsReq {
  platform_commission_percentage?: number;
  automatic_payment?: boolean;
  transaction_wait_time_minutes?: number;
}

export interface DisburseResult {
  released: number;
  message: string;
}

// ── Merchant Fund Locks ───────────────────────────────────────────────────────

export interface FundLockReq {
  reason: string;
}

export interface FundLockResult {
  lock_id: string;
  merchant_id: string;
  reason?: string;
  release_reason?: string;
  locked_at?: string;
  released_at?: string;
  status: string;
}

// ── Push Notifications ────────────────────────────────────────────────────────

export interface PushNotificationReq {
  target_user_id: string;
  category: string;
  event_type: string;
  title: string;
  body: string;
  entity_id?: string;
  screen?: string;
}

export interface BroadcastPushReq {
  category: string;
  event_type: string;
  title: string;
  body: string;
  entity_id?: string | null;
  screen?: string;
}

export interface PushResult {
  dispatched: boolean;
  onesignal_id?: string;
  skip_reason?: string;
  provider_detail?: unknown;
  user_count?: number;
  token_count?: number;
}

export interface AdminUsersParams {
  limit: number;
  offset: number;
}

export interface ActivateDeactivateUserReq {
  id: string;
  is_active: boolean;
}

/** User as returned from GET /admin/users (list item) */
export interface AdminUserListItem {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  profile_image?: string;
  is_active?: boolean;
  account_type?: string;
  accountType?: string;
  emailVerifiedAt?: string | null;
  email_verified_at?: string | null;
  created_at?: string;
  [key: string]: unknown;
}

/** User as returned from GET /admin/users/:id (full detail) */
export interface AdminUserDetail extends AdminUserListItem {
  address?: string;
  state?: string;
  updated_at?: string;
}

/** Normalized shape for UI (list + detail) */
export interface UserDisplay {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  status?: "active" | "inactive" | "pending";
  joinedAt: string;
}

export function mapApiUserToDisplay(u: AdminUserListItem | AdminUserDetail): UserDisplay {
  const name = [u.first_name, u.last_name].filter(Boolean).join(" ") || u.email?.split("@")[0] || "—";
  const verifiedAt = u.emailVerifiedAt ?? u.email_verified_at;
  const status: UserDisplay["status"] = verifiedAt ? "active" : "inactive";
  return {
    id: u.id,
    name,
    email: u.email ?? "",
    phone: u.phone_number,
    avatar: u.profile_image,
    role: (u.account_type ?? (u.accountType as string | undefined) ?? "user"),
    status,
    joinedAt: u.created_at ?? "",
  };
}

export interface AmenitiesListParams {
  page_id: number;
  page_size: number;
}

export interface AmenityReq {
  amenity: string;
}

/** Amenity as returned from API list */
export interface AmenityListItem {
  id: string;
  amenity?: string;
  amenities?: string;
  created_at?: string;
  [key: string]: unknown;
}

/** Normalized for UI */
export interface AmenityDisplay {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export function mapApiAmenityToDisplay(a: AmenityListItem): AmenityDisplay {
  const name = a.amenity ?? a.amenities ?? "";
  return {
    id: a.id,
    name: String(name),
    description: undefined,
    createdAt: a.created_at ?? "",
  };
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

/** Category item as returned from API list/detail */
export interface CategoryListItem {
  id: string;
  category: string;
  slug?: string;
  created_at?: string;
  [key: string]: unknown;
}

/** Normalized for UI (name = category, slug derived or from API) */
export interface CategoryDisplay {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

export function mapApiCategoryToDisplay(c: CategoryListItem): CategoryDisplay {
  const name = c.category ?? "";
  return {
    id: c.id,
    name,
    slug: c.slug ?? name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    description: undefined,
    createdAt: c.created_at ?? "",
  };
}

export interface PropertyListParams {
  page: number;
  limit: number;
  q?: string;
  category_id?: string;
  amenity_ids?: string;
  city?: string;
  country?: string;
}

export interface PropertyOwnerListParams {
  page_size: number;
  page_id?: number;
  status?: string;
}

/** Property list item from API (flexible shape) */
export interface PropertyListItem {
  id: string;
  property_name?: string;
  title?: string;
  city?: string;
  status?: string;
  amount?: number;
  price?: string;
  images?: string[];
  image?: string;
  category_name?: string;
  created_at?: string;
  address?: string;
  slug?: string;
  rating?: number;
  review_count?: number;
  distance?: string;
  description?: string;
  amenities?: string[] | { name?: string }[];
  ground_rules?: string[];
  homeowner_name?: string;
  negotiable?: boolean;
  [key: string]: unknown;
}

/** Normalized for list/detail UI */
export interface PropertyDisplay {
  id: string;
  title: string;
  city: string;
  status: string;
  price: string;
  image?: string;
  images?: string[];
  categoryName: string;
  createdAt: string;
  address?: string;
  slug?: string;
  rating?: number;
  reviewCount?: number;
  distance?: string;
  description?: string;
  amenities?: string[];
  groundRules?: string[];
  homeownerName?: string;
  negotiable?: boolean;
}

export function mapApiPropertyToDisplay(p: PropertyListItem): PropertyDisplay {
  const title = p.property_name ?? p.title ?? "—";
  return {
    id: p.id,
    title: String(title),
    city: p.city ?? "",
    status: p.status ?? "pending",
    price: p.price ?? (p.amount != null ? `₦${p.amount}` : "—"),
    image: p.image ?? p.images?.[0],
    images: p.images,
    categoryName: p.category_name ?? "—",
    createdAt: p.created_at ?? "",
    address: p.address,
    slug: p.slug,
    rating: p.rating,
    reviewCount: p.review_count,
    distance: p.distance,
    description: p.description,
    amenities: Array.isArray(p.amenities)
      ? p.amenities.map((a) => (typeof a === "string" ? a : (a as { name?: string }).name ?? ""))
      : undefined,
    groundRules: p.ground_rules,
    homeownerName: p.homeowner_name,
    negotiable: p.negotiable,
  };
}
