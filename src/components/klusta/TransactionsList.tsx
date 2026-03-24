"use client";

import React from "react";
import Badge from "@/components/ui/badge/Badge";

type TransactionStatus = "completed" | "pending" | "failed";

interface TransactionItem {
  id: string;
  user: string;
  property: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
}

const TRANSACTIONS: TransactionItem[] = [
  {
    id: "txn-1001",
    user: "Carla George",
    property: "Ocean View Suite",
    amount: 85000,
    status: "completed",
    createdAt: "2026-02-27T11:20:00Z",
  },
  {
    id: "txn-1002",
    user: "Kaiya George",
    property: "Downtown Apartment",
    amount: 45000,
    status: "pending",
    createdAt: "2026-02-27T09:05:00Z",
  },
  {
    id: "txn-1003",
    user: "Lindsey Curtis",
    property: "Backpacker Hostel",
    amount: 8500,
    status: "failed",
    createdAt: "2026-02-26T16:42:00Z",
  },
  {
    id: "txn-1004",
    user: "Abram Schleifer",
    property: "Luxury Villa Palm Estate",
    amount: 250000,
    status: "completed",
    createdAt: "2026-02-26T08:10:00Z",
  },
];

const statusColor: Record<TransactionStatus, "success" | "warning" | "error"> = {
  completed: "success",
  pending: "warning",
  failed: "error",
};

export default function TransactionsList() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-100 dark:border-white/5">
            <tr>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                User
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Property
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Amount
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {TRANSACTIONS.map((txn) => (
              <tr key={txn.id}>
                <td className="px-5 py-4 text-theme-sm text-typography dark:text-white/90">{txn.user}</td>
                <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">{txn.property}</td>
                <td className="px-5 py-4 text-theme-sm font-medium text-typography dark:text-white/90">
                  ₦{txn.amount.toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <Badge size="sm" color={statusColor[txn.status]}>
                    {txn.status}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                  {new Date(txn.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {TRANSACTIONS.length === 0 && (
        <div className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400">
          No transactions found.
        </div>
      )}
    </div>
  );
}
