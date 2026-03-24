"use client";

import React from "react";
import Badge from "@/components/ui/badge/Badge";

type NotificationType = "project" | "booking" | "payment" | "system";

interface NotificationItem {
  id: string;
  actor: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  isRead: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    actor: "Terry Franci",
    message: "requested permission to edit Ocean View Suite listing",
    type: "project",
    createdAt: "2026-02-28T09:00:00Z",
    isRead: false,
  },
  {
    id: "n-2",
    actor: "System",
    message: "new property verification queue has 3 pending items",
    type: "system",
    createdAt: "2026-02-28T07:30:00Z",
    isRead: false,
  },
  {
    id: "n-3",
    actor: "Billing",
    message: "withdrawal to Michael Duru was completed",
    type: "payment",
    createdAt: "2026-02-27T18:12:00Z",
    isRead: true,
  },
  {
    id: "n-4",
    actor: "Carla George",
    message: "completed a new booking for Downtown Apartment",
    type: "booking",
    createdAt: "2026-02-27T10:45:00Z",
    isRead: true,
  },
];

const typeColor: Record<NotificationType, "info" | "warning" | "success" | "error"> = {
  project: "info",
  booking: "success",
  payment: "warning",
  system: "error",
};

export default function NotificationsList() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-100 dark:border-white/5">
            <tr>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Notification
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Date
              </th>
              <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {NOTIFICATIONS.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-4">
                  <p className="text-theme-sm font-medium text-typography dark:text-white/90">
                    {item.actor}
                  </p>
                  <p className="text-theme-sm text-gray-600 dark:text-gray-400">{item.message}</p>
                </td>
                <td className="px-5 py-4">
                  <Badge size="sm" color={typeColor[item.type]}>
                    {item.type}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                  {item.isRead ? "Read" : "Unread"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
