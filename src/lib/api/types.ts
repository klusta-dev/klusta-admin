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
  return {
    id: u.id,
    name,
    email: u.email ?? "",
    phone: u.phone_number,
    avatar: u.profile_image,
    role: u.account_type ?? "user",
    // status: u.is_active === true ? "active" : u.is_active === false ? "inactive" : "pending",
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
