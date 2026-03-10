"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import { EyeIcon } from "@/icons";

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

const REPORTS: Report[] = [];

const statusColor: Record<ReportStatus, "success" | "warning" | "error" | "info"> = {
  open: "error",
  in_review: "warning",
  resolved: "success",
  dismissed: "info",
};

const typeLabel: Record<ReportType, string> = {
  property: "Property",
  user: "User",
  payment: "Payment",
  other: "Other",
};

export default function ReportsList() {
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all");

  const filtered = statusFilter === "all" ? REPORTS : REPORTS.filter((r) => r.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["all", "open", "in_review", "resolved", "dismissed"] as const).map((s) => (
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
            {s === "all" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Type
                </th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Subject
                </th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Reporter
                </th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Reported
                </th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-5 py-3 text-right text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filtered.map((report) => (
                <tr key={report.id}>
                  <td className="px-5 py-4 text-theme-sm text-typography dark:text-white/90">
                    {typeLabel[report.type]}
                  </td>
                  <td className="px-5 py-4 text-theme-sm font-medium text-typography dark:text-white/90">
                    {report.subject}
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                    {report.reporterName}
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">
                    {report.reportedEntityName}
                    <span className="ml-1 text-theme-xs text-gray-500">
                      ({report.reportedEntityType})
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge size="sm" color={statusColor[report.status]}>
                      {report.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-theme-sm font-medium text-primary hover:bg-primary-10 dark:text-primary-50 dark:hover:bg-primary/20"
                    >
                      <EyeIcon className="size-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400">
            No reports match the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
