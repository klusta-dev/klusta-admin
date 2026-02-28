// Mock data for Klusta admin - replace with API calls later

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

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
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
  distance?: string; // e.g. "6km" for display
  createdAt: string;
  updatedAt: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Lindsey Curtis",
    email: "lindsey@example.com",
    phone: "+1 234 567 890",
    avatar: "/images/user/user-17.jpg",
    role: "Customer",
    status: "active",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Kaiya George",
    email: "kaiya@example.com",
    avatar: "/images/user/user-18.jpg",
    role: "Customer",
    status: "pending",
    joinedAt: "2024-02-01",
  },
  {
    id: "3",
    name: "Zain Geidt",
    email: "zain@example.com",
    avatar: "/images/user/user-17.jpg",
    role: "Customer",
    status: "active",
    joinedAt: "2024-01-22",
  },
  {
    id: "4",
    name: "Abram Schleifer",
    email: "abram@example.com",
    avatar: "/images/user/user-20.jpg",
    role: "Customer",
    status: "inactive",
    joinedAt: "2023-12-10",
  },
  {
    id: "5",
    name: "Carla George",
    email: "carla@example.com",
    avatar: "/images/user/user-21.jpg",
    role: "Customer",
    status: "active",
    joinedAt: "2024-02-10",
  },
];

export const mockAmenities: Amenity[] = [
  { id: "1", name: "WiFi", description: "High-speed internet", createdAt: "2024-01-01" },
  { id: "2", name: "Parking", description: "Free parking available", createdAt: "2024-01-01" },
  { id: "3", name: "Pool", description: "Swimming pool", createdAt: "2024-01-02" },
  { id: "4", name: "Gym", description: "Fitness center", createdAt: "2024-01-03" },
  { id: "5", name: "Air Conditioning", description: "AC in all rooms", createdAt: "2024-01-05" },
];

export const mockCategories: Category[] = [
  { id: "1", name: "Hotels", slug: "hotels", description: "Hotel listings", createdAt: "2024-01-01" },
  { id: "2", name: "Apartments", slug: "apartments", description: "Apartment rentals", createdAt: "2024-01-01" },
  { id: "3", name: "Villas", slug: "villas", description: "Villa rentals", createdAt: "2024-01-02" },
  { id: "4", name: "Hostels", slug: "hostels", description: "Budget hostels", createdAt: "2024-01-03" },
];

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Ocean View Suite",
    slug: "ocean-view-suite",
    description:
      "This gorgeous apartment consist of a four rooms, it is close to the beach. They offer a retreat from everyday life and impress with modern architecture and stylish furnishings. The space is designed for comfort and relaxation.",
    address: "123 Marina Drive",
    city: "Lagos",
    categoryId: "1",
    categoryName: "Hotels",
    status: "listed",
    price: "₦85,000/night",
    image: "/images/user/user-17.jpg",
    images: ["/images/user/user-17.jpg", "/images/user/user-18.jpg", "/images/user/user-20.jpg"],
    rating: 4.7,
    reviewCount: 1600,
    groundRules: ["Follow our house rules", "Treat host's property like its yours"],
    homeownerName: "Bliss Rowland",
    negotiable: true,
    amenities: ["WiFi", "Pool", "Air Conditioning", "Gym", "TV"],
    distance: "6km",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-15",
  },
  {
    id: "2",
    title: "Downtown Apartment",
    slug: "downtown-apartment",
    address: "45 Independence Avenue",
    city: "Abuja",
    categoryId: "2",
    categoryName: "Apartments",
    status: "listed",
    price: "₦45,000/night",
    distance: "5km",
    amenities: ["WiFi", "Parking", "Gym"],
    createdAt: "2024-01-18",
    updatedAt: "2024-02-10",
  },
  {
    id: "3",
    title: "Luxury Villa Palm Estate",
    slug: "luxury-villa-palm-estate",
    description: "Private villa with pool and garden.",
    address: "7 Palm Estate Road",
    city: "Lagos",
    categoryId: "3",
    categoryName: "Villas",
    status: "pending",
    price: "₦250,000/night",
    distance: "12km",
    amenities: ["WiFi", "Pool", "Parking", "Gym"],
    createdAt: "2024-02-01",
    updatedAt: "2024-02-20",
  },
  {
    id: "4",
    title: "Backpacker Hostel",
    slug: "backpacker-hostel",
    address: "22 Backpack Lane",
    city: "Calabar",
    categoryId: "4",
    categoryName: "Hostels",
    status: "unlisted",
    price: "₦8,500/night",
    distance: "3km",
    amenities: ["WiFi"],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-28",
  },
];

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

export const mockRecentActivity: Activity[] = [
  {
    id: "1",
    type: "property_listed",
    message: "Ocean View Suite was listed",
    href: "/properties/1",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "2",
    type: "user_added",
    message: "New user Carla George signed up",
    href: "/users/5",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "3",
    type: "property_updated",
    message: "Luxury Villa Palm Estate was updated",
    href: "/properties/3",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "4",
    type: "amenity_created",
    message: "New amenity Air Conditioning was added",
    href: "/amenities",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "5",
    type: "user_activated",
    message: "User Kaiya George was activated",
    href: "/users/2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "6",
    type: "category_created",
    message: "New category Hostels was created",
    href: "/categories",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const mockPropertyReviews: PropertyReview[] = [
  {
    id: "1",
    userName: "Evelyn",
    userAvatar: "/images/user/user-17.jpg",
    rating: 4.5,
    timeAgo: "3 mos ago",
    text: "The apartment was spotless, beautifully designed, and well-equipped with everything I needed for a comfortable stay. The beds were incredibly comfortable.",
  },
  {
    id: "2",
    userName: "James",
    userAvatar: "/images/user/user-18.jpg",
    rating: 5,
    timeAgo: "2 mos ago",
    text: "Excellent location and the host was very responsive. Would definitely recommend to anyone visiting the area.",
  },
  {
    id: "3",
    userName: "Sarah",
    userAvatar: "/images/user/user-20.jpg",
    rating: 4.5,
    timeAgo: "1 mo ago",
    text: "Clean, modern, and exactly as described. The pool and gym were a nice bonus. We had a great time.",
  },
  {
    id: "4",
    userName: "Michael",
    userAvatar: "/images/user/user-21.jpg",
    rating: 4,
    timeAgo: "3 wks ago",
    text: "Good value for money. The place had everything we needed. Only minor issue was the WiFi was a bit slow in the evening.",
  },
];

export type ReportStatus = "open" | "in_review" | "resolved" | "dismissed";
export type ReportType = "property" | "user" | "payment" | "other";

export interface Report {
  id: string;
  type: ReportType;
  subject: string;
  description: string;
  reporterId: string;
  reporterName: string;
  reportedEntityType: "property" | "user";
  reportedEntityId: string;
  reportedEntityName: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}

export const mockReports: Report[] = [
  {
    id: "1",
    type: "property",
    subject: "Misleading photos",
    description: "The listing photos do not match the actual property. Rooms are much smaller than shown.",
    reporterId: "1",
    reporterName: "Lindsey Curtis",
    reportedEntityType: "property",
    reportedEntityId: "1",
    reportedEntityName: "Ocean View Suite",
    status: "open",
    createdAt: "2024-02-20T10:00:00Z",
    updatedAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "2",
    type: "property",
    subject: "Safety concerns",
    description: "The area did not feel safe. Lock on the door was broken.",
    reporterId: "3",
    reporterName: "Zain Geidt",
    reportedEntityType: "property",
    reportedEntityId: "4",
    reportedEntityName: "Backpacker Hostel",
    status: "in_review",
    createdAt: "2024-02-18T14:30:00Z",
    updatedAt: "2024-02-19T09:00:00Z",
  },
  {
    id: "3",
    type: "user",
    subject: "Host not responsive",
    description: "Host did not reply to messages before check-in. Had to wait 2 hours for keys.",
    reporterId: "5",
    reporterName: "Carla George",
    reportedEntityType: "user",
    reportedEntityId: "1",
    reportedEntityName: "Bliss Rowland",
    status: "resolved",
    createdAt: "2024-02-15T08:00:00Z",
    updatedAt: "2024-02-17T11:00:00Z",
  },
];

export type SupportTicketStatus = "open" | "pending" | "resolved" | "closed";
export type SupportPriority = "low" | "medium" | "high";

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  priority: SupportPriority;
  createdAt: string;
  updatedAt: string;
}

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "1",
    userId: "2",
    userName: "Kaiya George",
    userEmail: "kaiya@example.com",
    subject: "Cannot complete booking",
    message: "I get an error when I try to pay. Card is valid and has funds. Please help.",
    status: "open",
    priority: "high",
    createdAt: "2024-02-22T09:15:00Z",
    updatedAt: "2024-02-22T09:15:00Z",
  },
  {
    id: "2",
    userId: "4",
    userName: "Abram Schleifer",
    userEmail: "abram@example.com",
    subject: "Refund request",
    message: "I had to cancel my trip. I would like to request a full refund for my booking #BK-1024.",
    status: "pending",
    priority: "medium",
    createdAt: "2024-02-21T16:00:00Z",
    updatedAt: "2024-02-22T10:00:00Z",
  },
  {
    id: "3",
    userId: "1",
    userName: "Lindsey Curtis",
    userEmail: "lindsey@example.com",
    subject: "Account verification",
    message: "My ID verification has been pending for 3 days. When will it be reviewed?",
    status: "resolved",
    priority: "low",
    createdAt: "2024-02-19T11:00:00Z",
    updatedAt: "2024-02-20T14:00:00Z",
  },
];

export function getDashboardStats() {
  const activeUsers = mockUsers.filter((u) => u.status === "active").length;
  const pendingUsers = mockUsers.filter((u) => u.status === "pending").length;
  return {
    totalUsers: mockUsers.length,
    activeUsers,
    pendingUsers,
    totalAmenities: mockAmenities.length,
    totalCategories: mockCategories.length,
    totalProperties: mockProperties.length,
  };
}
