"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import { MailIcon } from "@/icons";

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

const TICKETS: SupportTicket[] = [];

const statusColor: Record<SupportTicketStatus, "success" | "warning" | "error" | "info"> = {
  open: "error",
  pending: "warning",
  resolved: "success",
  closed: "info",
};

const priorityColor: Record<SupportPriority, "success" | "warning" | "error"> = {
  low: "success",
  medium: "warning",
  high: "error",
};

export default function CustomerSupportList() {
  const [statusFilter, setStatusFilter] = useState<SupportTicketStatus | "all">("all");

  const filtered =
    statusFilter === "all" ? TICKETS : TICKETS.filter((t) => t.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["all", "open", "pending", "resolved", "closed"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg border px-3 py-2 text-theme-sm font-medium transition-colors ${
              statusFilter === s
                ? "border-primary bg-primary text-white dark:bg-primary dark:text-white"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((ticket) => (
          <div
            key={ticket.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-10 text-primary dark:bg-primary/20 dark:text-primary-50">
                    <MailIcon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-typography dark:text-white/90">
                      {ticket.subject}
                    </h3>
                    <p className="text-theme-sm text-gray-500 dark:text-gray-400">
                      {ticket.userName} · {ticket.userEmail}
                    </p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-theme-sm text-gray-600 dark:text-gray-300">
                  {ticket.message}
                </p>
                <p className="mt-2 text-theme-xs text-gray-500 dark:text-gray-400">
                  Created {new Date(ticket.createdAt).toLocaleString()} · Updated{" "}
                  {new Date(ticket.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Badge size="sm" color={statusColor[ticket.status]}>
                  {ticket.status}
                </Badge>
                <Badge size="sm" color={priorityColor[ticket.priority]}>
                  {ticket.priority}
                </Badge>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm font-medium text-typography hover:bg-gray-50 dark:border-gray-700 dark:text-white/90 dark:hover:bg-gray-800"
                >
                  View & reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center text-theme-sm text-gray-500 dark:border-gray-800 dark:bg-white/3 dark:text-gray-400">
          No support tickets match the selected filter.
        </div>
      )}
    </div>
  );
}
