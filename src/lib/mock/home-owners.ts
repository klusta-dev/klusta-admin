export interface HomeOwnerPropertyItem {
  id: string;
  name: string;
  city: string;
  status: "active" | "sold";
  price: number;
}

export interface HomeOwnerTransactionItem {
  id: string;
  type: "booking" | "withdrawal" | "refund";
  propertyName: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface HomeOwnerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  transactions: number;
  lastWithdrawal?: string;
  withdrawals: number;
  soldHouses: number;
  activeHouses: number;
  properties: HomeOwnerPropertyItem[];
  transactionHistory: HomeOwnerTransactionItem[];
}

export const HOME_OWNERS: HomeOwnerItem[] = [
  {
    id: "owner-1",
    name: "Bliss Rowland",
    email: "bliss@klusta.com",
    phone: "+234 801 224 9981",
    transactions: 124,
    lastWithdrawal: "2026-02-26",
    withdrawals: 28,
    soldHouses: 2,
    activeHouses: 4,
    properties: [
      { id: "p-1", name: "Ocean View Suite", city: "Lagos", status: "active", price: 85000 },
      { id: "p-2", name: "Coral Bay Villa", city: "Abuja", status: "sold", price: 180000 },
      { id: "p-3", name: "Palm Heights Duplex", city: "Lagos", status: "active", price: 125000 },
    ],
    transactionHistory: [
      { id: "t-1", type: "booking", propertyName: "Ocean View Suite", amount: 85000, date: "2026-02-28", status: "completed" },
      { id: "t-2", type: "withdrawal", propertyName: "Wallet", amount: 320000, date: "2026-02-26", status: "completed" },
      { id: "t-3", type: "refund", propertyName: "Coral Bay Villa", amount: 50000, date: "2026-02-22", status: "pending" },
    ],
  },
  {
    id: "owner-2",
    name: "Michael Duru",
    email: "michael@klusta.com",
    phone: "+234 809 661 0034",
    transactions: 86,
    lastWithdrawal: "2026-02-24",
    withdrawals: 20,
    soldHouses: 1,
    activeHouses: 3,
    properties: [
      { id: "p-4", name: "Skyline Loft", city: "Abuja", status: "active", price: 95000 },
      { id: "p-5", name: "Garden Court Apartment", city: "Lagos", status: "sold", price: 74000 },
    ],
    transactionHistory: [
      { id: "t-4", type: "booking", propertyName: "Skyline Loft", amount: 95000, date: "2026-02-27", status: "completed" },
      { id: "t-5", type: "withdrawal", propertyName: "Wallet", amount: 200000, date: "2026-02-24", status: "completed" },
    ],
  },
  {
    id: "owner-3",
    name: "Tobi Akin",
    email: "tobi@klusta.com",
    phone: "+234 813 742 2001",
    transactions: 51,
    lastWithdrawal: "2026-02-20",
    withdrawals: 11,
    soldHouses: 1,
    activeHouses: 2,
    properties: [
      { id: "p-6", name: "Central Studio", city: "Calabar", status: "active", price: 45000 },
      { id: "p-7", name: "Riverside Lodge", city: "Lagos", status: "sold", price: 68000 },
    ],
    transactionHistory: [
      { id: "t-6", type: "booking", propertyName: "Central Studio", amount: 45000, date: "2026-02-20", status: "completed" },
      { id: "t-7", type: "withdrawal", propertyName: "Wallet", amount: 130000, date: "2026-02-20", status: "completed" },
    ],
  },
  {
    id: "owner-4",
    name: "Evelyn James",
    email: "evelyn@klusta.com",
    phone: "+234 812 980 1004",
    transactions: 33,
    lastWithdrawal: "2026-02-18",
    withdrawals: 8,
    soldHouses: 0,
    activeHouses: 2,
    properties: [
      { id: "p-8", name: "Cozy City Flat", city: "Lagos", status: "active", price: 52000 },
      { id: "p-9", name: "Sunset Annex", city: "Abuja", status: "active", price: 61000 },
    ],
    transactionHistory: [
      { id: "t-8", type: "booking", propertyName: "Cozy City Flat", amount: 52000, date: "2026-02-19", status: "completed" },
      { id: "t-9", type: "refund", propertyName: "Sunset Annex", amount: 12000, date: "2026-02-18", status: "failed" },
    ],
  },
];
