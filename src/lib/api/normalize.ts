export type UserStatus = "active" | "pending" | "inactive";
export type PropertyStatus = "listed" | "pending" | "unlisted";
export interface PropertyReviewView {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  timeAgo?: string;
}

export interface UserView {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: UserStatus;
  avatar?: string;
  phone?: string;
  joinedAt?: string;
}

export interface PropertyView {
  id: string;
  title: string;
  slug: string;
  address: string;
  city: string;
  categoryName: string;
  price: string;
  status: PropertyStatus;
  image?: string;
  images: string[];
  description?: string;
  amenities: string[];
  groundRules: string[];
  homeownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  safetyItems: string[];
  reviews: PropertyReviewView[];
  rating?: number;
  reviewCount?: number;
  negotiable?: boolean;
  distance?: string;
}

export interface CategoryView {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: string;
}

export interface AmenityView {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function extractList(data: unknown, keys: string[]): unknown[] {
  if (Array.isArray(data)) return data;
  const record = asRecord(data);
  for (const key of keys) {
    const candidate = record[key];
    if (Array.isArray(candidate)) return candidate;
  }
  return [];
}

export function normalizeUser(input: unknown, index: number): UserView {
  const row = asRecord(input);
  const id = asString(row.id || row.user_id || row._id, `user-${index}`);
  const firstName = asString(row.first_name);
  const lastName = asString(row.last_name);
  const fallbackName = asString(row.name || row.full_name, `User ${index + 1}`);
  const computedName = `${firstName} ${lastName}`.trim();
  const role = asString(row.role || row.user_type || row.account_type, "User");
  const email = asString(row.email || row.username, "-");

  // let status: UserStatus = "pending";
  // if (row.is_active === true || row.status === "active") status = "active";
  // if (row.is_active === false || row.status === "inactive") status = "inactive";

  return {
    id,
    name: computedName || fallbackName,
    email,
    role,
    // status,
    avatar: asString(row.avatar || row.profile_image || row.image) || undefined,
    phone: asString(row.phone || row.phone_number) || undefined,
    joinedAt: asString(row.created_at || row.joined_at) || undefined,
  };
}

export function normalizeProperty(input: unknown, index: number): PropertyView {
  const row = asRecord(input);
  const propertyNode = asRecord(row.property);
  const ownerNode = asRecord(row.owner);
  const source = Object.keys(propertyNode).length ? propertyNode : row;

  const id = asString(
    source.id || source.property_id || source._id,
    `property-${index}`
  );
  const title = asString(
    source.property_name || source.title || source.name,
    `Property ${index + 1}`
  );
  const city = asString(source.city || source.location, "Unknown");
  const statusRaw = asString(source.status, "listed").toLowerCase();
  const status: PropertyStatus =
    statusRaw === "pending" || statusRaw === "unlisted" ? (statusRaw as PropertyStatus) : "listed";

  const amenitiesRaw = row.amenities ?? source.amenities;
  const amenities = toArray(amenitiesRaw)
    .map((item) => {
      if (typeof item === "string") return item;
      return asString(asRecord(item).name || asRecord(item).amenity);
    })
    .filter(Boolean);

  const images = toArray(row.images ?? source.images).filter(
    (img): img is string => typeof img === "string"
  );
  const image = asString(source.image || source.thumbnail || source.cover_image) || images[0];
  const categories = toArray(row.categories).filter(
    (category): category is string => typeof category === "string"
  );
  const groundRules = toArray(row.ground_rules ?? source.ground_rules).filter(
    (rule): rule is string => typeof rule === "string"
  );
  const safetyItems = toArray(row.safety_items ?? source.safety_items).filter(
    (item): item is string => typeof item === "string"
  );
  const reviews = toArray(row.reviews ?? source.reviews).map((review, reviewIndex) => {
    const reviewNode = asRecord(review);
    const reviewUser = asRecord(reviewNode.user);
    const userName =
      asString(reviewNode.user_name || reviewNode.reviewer_name || reviewUser.full_name) ||
      "Anonymous";
    const rating = asNumber(reviewNode.rating) ?? 0;
    return {
      id: asString(reviewNode.id || reviewNode._id, `review-${reviewIndex}`),
      userName,
      userAvatar:
        asString(reviewNode.user_avatar || reviewUser.profile_image || reviewUser.avatar) ||
        undefined,
      rating,
      text: asString(reviewNode.comment || reviewNode.review || reviewNode.text, "No comment"),
      timeAgo: asString(reviewNode.created_at || reviewNode.date) || undefined,
    };
  });
  const priceValue = source.price ?? source.amount ?? source.rent;
  const price = typeof priceValue === "number" ? String(priceValue) : asString(priceValue, "-");

  return {
    id,
    title,
    slug: asString(source.slug, id),
    address: asString(source.address || source.street_address, "-"),
    city,
    categoryName: asString(
      source.category_name || source.category || categories[0] || source.type,
      "General"
    ),
    price,
    status,
    image: image || undefined,
    images,
    description: asString(source.description) || undefined,
    amenities,
    groundRules,
    safetyItems,
    reviews,
    homeownerName: asString(
      source.homeowner_name || source.owner_name || ownerNode.full_name
    ) || undefined,
    ownerEmail: asString(ownerNode.email) || undefined,
    ownerPhone: asString(ownerNode.phone_number || ownerNode.phone) || undefined,
    rating: asNumber(source.rating),
    reviewCount: asNumber(source.review_count),
    negotiable: source.negotiable === true,
    distance: asString(source.distance) || undefined,
  };
}

export function normalizeCategory(input: unknown, index: number): CategoryView {
  const row = asRecord(input);
  const name = asString(row.category || row.name, `Category ${index + 1}`);
  return {
    id: asString(row.id || row._id, `category-${index}`),
    name,
    slug: asString(row.slug, name.toLowerCase().replace(/\s+/g, "-")),
    description: asString(row.description) || undefined,
    createdAt: asString(row.created_at) || undefined,
  };
}

export function normalizeAmenity(input: unknown, index: number): AmenityView {
  const row = asRecord(input);
  return {
    id: asString(row.id || row._id, `amenity-${index}`),
    name: asString(row.amenity || row.name, `Amenity ${index + 1}`),
    description: asString(row.description) || undefined,
    createdAt: asString(row.created_at) || undefined,
  };
}
