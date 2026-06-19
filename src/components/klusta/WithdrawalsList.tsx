"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import { useAdminWithdrawals, useUpdateWithdrawalStatus } from "@/lib/api/hooks";
import type { WithdrawalListItem } from "@/lib/api/types";
import { TableBodySkeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 20;

type StatusFilter = "" | "pending" | "approved" | "rejected" | "completed";

function statusColor(s: string): "warning" | "info" | "error" | "success" {
  if (s === "pending") return "warning";
  if (s === "approved") return "info";
  if (s === "rejected") return "error";
  return "success";
}

const NEXT_STATUSES: Record<string, ("approved" | "rejected" | "completed")[]> = {
  pending: ["approved", "rejected"],
  approved: ["completed", "rejected"],
};

export default function WithdrawalsList() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const params = {
    page,
    limit: PAGE_SIZE,
    ...(statusFilter && { status: statusFilter }),
  } as Parameters<typeof useAdminWithdrawals>[0];

  const { data, isLoading, isError } = useAdminWithdrawals(params);
  const updateStatus = useUpdateWithdrawalStatus();

  const withdrawals = data?.data?.withdrawals ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function notify(msg: string, isErr = false) {
    setActionError(isErr ? msg : null);
    setActionSuccess(!isErr ? msg : null);
    setTimeout(() => { setActionError(null); setActionSuccess(null); }, 4000);
  }

  async function handleStatusChange(
    withdrawal: WithdrawalListItem,
    nextStatus: "approved" | "rejected" | "completed"
  ) {
    const label = nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1);
    if (!confirm(`${label} withdrawal of ₦${withdrawal.amount.toLocaleString()} for ${withdrawal.user_name}?`)) return;
    try {
      await updateStatus.mutateAsync({ id: withdrawal.id, body: { status: nextStatus } });
      notify(`Withdrawal ${nextStatus} successfully.`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : `Failed to update withdrawal.`;
      notify(msg, true);
    }
  }

  const selectCls =
    "rounded-lg border border-gray-200 bg-white px-3 py-2 text-theme-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300";

  const actionBtnCls: Record<string, string> = {
    approved: "rounded-lg bg-success-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-success-600 disabled:opacity-50",
    rejected: "rounded-lg bg-error-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-error-600 disabled:opacity-50",
    completed: "rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50",
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          className={selectCls}
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value as StatusFilter); setPage(1); }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Feedback */}
      {actionSuccess && (
        <div className="rounded-lg bg-success-50 border border-success-200 px-4 py-3 text-theme-sm text-success-700 dark:bg-success-900/20 dark:border-success-800 dark:text-success-400">
          {actionSuccess}
        </div>
      )}
      {actionError && (
        <div className="rounded-lg bg-error-50 border border-error-200 px-4 py-3 text-theme-sm text-error-700 dark:bg-error-900/20 dark:border-error-800 dark:text-error-400">
          {actionError}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="overflow-x-auto no-scrollbar">
          <table className="min-w-full">
            <thead className="border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Merchant</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Amount</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Requested</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Updated</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {isLoading && <TableBodySkeleton cols={6} rows={6} />}
              {isError && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-theme-sm text-error-600 dark:text-error-400">
                    Failed to load withdrawals.
                  </td>
                </tr>
              )}
              {!isLoading && !isError && withdrawals.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    No withdrawals found.
                  </td>
                </tr>
              )}
              {withdrawals.map((w) => {
                const nexts = NEXT_STATUSES[w.status] ?? [];
                return (
                  <tr key={w.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="px-5 py-4">
                      <p className="text-theme-sm font-medium text-typography dark:text-white/90">{w.user_name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{w.user_email}</p>
                    </td>
                    <td className="px-5 py-4 text-theme-sm font-medium text-typography dark:text-white/90 whitespace-nowrap">
                      ₦{w.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <Badge size="sm" color={statusColor(w.status)}>
                        {w.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {new Date(w.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {new Date(w.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        {nexts.map((next) => (
                          <button
                            key={next}
                            type="button"
                            disabled={updateStatus.isPending}
                            onClick={() => handleStatusChange(w, next)}
                            className={actionBtnCls[next]}
                          >
                            {next.charAt(0).toUpperCase() + next.slice(1)}
                          </button>
                        ))}
                        {nexts.length === 0 && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 dark:border-white/5">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            {total === 0
              ? "No withdrawals"
              : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, total)} of ${total}`}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
            >
              Previous
            </button>
            <span className="text-theme-sm text-gray-600 dark:text-gray-400">
              {page} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
