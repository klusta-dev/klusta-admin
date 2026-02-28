/**
 * Centralized query keys for cache invalidation / propagation.
 */

export const adminKeys = {
  all: ["admin"] as const,
  stats: () => [...adminKeys.all, "stats"] as const,
  users: (params?: { limit?: number; offset?: number }) =>
    [...adminKeys.all, "users", params] as const,
  user: (id: string) => [...adminKeys.all, "users", id] as const,
};

export const amenitiesKeys = {
  all: ["amenities"] as const,
  list: (params?: { page_id?: number; page_size?: number }) =>
    [...amenitiesKeys.all, "list", params] as const,
  detail: (id: string) => [...amenitiesKeys.all, id] as const,
};

export const categoryKeys = {
  all: ["category"] as const,
  list: (params?: { page_id?: number; page_size?: number }) =>
    [...categoryKeys.all, "list", params] as const,
  detail: (id: string) => [...categoryKeys.all, id] as const,
};

export const propertyKeys = {
  all: ["property"] as const,
  list: (params?: Record<string, unknown>) => [...propertyKeys.all, "list", params] as const,
  ownerList: (params?: Record<string, unknown>) =>
    [...propertyKeys.all, "ownerList", params] as const,
  detail: (id: string) => [...propertyKeys.all, id] as const,
};
