/**
 * Legacy type definitions for reference.
 * All mock data has been removed; use API types from @/lib/api/types and real API hooks instead.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinedAt: string;
}

export interface Amenity {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
}

export interface PropertyReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  timeAgo: string;
  text: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description?: string;
  address: string;
  city: string;
  categoryId: string;
  categoryName: string;
  status: "listed" | "unlisted" | "pending";
  price: string;
  image?: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  groundRules?: string[];
  homeownerName?: string;
  negotiable?: boolean;
  amenities: string[];
  distance?: string;
  createdAt: string;
  updatedAt: string;
}

export type ActivityType =
  | "user_added"
  | "user_activated"
  | "property_listed"
  | "property_updated"
  | "amenity_created"
  | "category_created";

export interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  href?: string;
  createdAt: string;
}
