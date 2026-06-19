"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import {
  useAdminBookings,
  useReleaseEscrow,
  useCancelBooking,
} from "@/lib/api/hooks";
import type { BookingListItem } from "@/lib/api/types";
import { TableBodySkeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 20;

type BookingStatusFilter = "" | "upcoming" | "ongoing" | "closed" | "cancelled";
type PaymentStatusFilter = "" | "pending" | "confirmed" | "failed";
type EscrowStatusFilter = "" | "held" | "released" | "none";

function bookingStatusColor(s: string): "info" | "warning" | "success" | "error" | "primary" {
  if (s === "closed") return "success";
  if (s === "ongoing") return "info";
  if (s === "upcoming") return "primary";
  if (s === "cancelled") return "error";
  return "warning";
}

function paymentStatusColor(s: string): "success" | "warning" | "error" {
  if (s === "confirmed") return "success";
  if (s === "failed") return "error";
  return "warning";
}

function escrowStatusColor(s: string): "success" | "warning" | "error" {
  if (s === "released") return "success";
  if (s === "held") return "warning";
  return "error";
}

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BookingsList() {
  const [page, setPage] = useState(1);
  const [bookingStatus, setBookingStatus] = useState<BookingStatusFilter>("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusFilter>("");
  const [escrowStatus, setEscrowStatus] = useState<EscrowStatusFilter>("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const params = {
    page,
    limit: PAGE_SIZE,
    ...(bookingStatus && { booking_status: bookingStatus }),
    ...(paymentStatus && { payment_status: paymentStatus }),
    ...(escrowStatus && { escrow_status: escrowStatus }),
  } as Parameters<typeof useAdminBookings>[0];

  const { data, isLoading, isError } = useAdminBookings(params);
  const releaseEscrow = useReleaseEscrow();
  const cancelBooking = useCancelBooking();

  const bookings = data?.data?.bookings ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function notify(msg: string, isErr = false) {
    setActionError(isErr ? msg : null);
    setActionSuccess(!isErr ? msg : null);
    setTimeout(() => { setActionError(null); setActionSuccess(null); }, 4000);
  }

  async function handleReleaseEscrow(booking: BookingListItem) {
    if (!confirm(`Release escrow for booking ${booking.id.slice(0, 8)}…? This pays out ₦${booking.host_earnings.toLocaleString()} to the host.`)) return;
    try {
      await releaseEscrow.mutateAsync(booking.id);
      notify("Escrow released successfully.");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to release escrow.";
      notify(msg, true);
    }
  }

  async function handleCancelBooking(booking: BookingListItem) {
    if (!confirm(`Cancel booking ${booking.id.slice(0, 8)}…? This cannot be undone.`)) return;
    try {
      await cancelBooking.mutateAsync(booking.id);
      notify("Booking cancelled.");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to cancel booking.";
      notify(msg, true);
    }
  }

  const selectCls =
    "rounded-lg border border-gray-200 bg-white px-3 py-2 text-theme-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300";

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          className={selectCls}
          value={bookingStatus}
          onChange={(e) => { setBookingStatus(e.target.value as BookingStatusFilter); setPage(1); }}
        >
          <option value="">All Booking Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="closed">Closed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          className={selectCls}
          value={paymentStatus}
          onChange={(e) => { setPaymentStatus(e.target.value as PaymentStatusFilter); setPage(1); }}
        >
          <option value="">All Payment Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="failed">Failed</option>
        </select>
        <select
          className={selectCls}
          value={escrowStatus}
          onChange={(e) => { setEscrowStatus(e.target.value as EscrowStatusFilter); setPage(1); }}
        >
          <option value="">All Escrow Statuses</option>
          <option value="held">Held</option>
          <option value="released">Released</option>
          <option value="none">None</option>
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
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Property</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Guest</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Dates</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Amount</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Host Earnings</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Status</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Payment</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Escrow</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {isLoading && <TableBodySkeleton cols={9} rows={6} />}
              {isError && (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-theme-sm text-error-600 dark:text-error-400">
                    Failed to load bookings.
                  </td>
                </tr>
              )}
              {!isLoading && !isError && bookings.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              )}
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="px-5 py-4">
                    <p className="text-theme-sm font-medium text-typography dark:text-white/90">
                      {booking.property_name}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {booking.payment_ref ?? "—"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-theme-sm text-typography dark:text-white/90">{booking.guest_name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{booking.guest_email}</p>
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    <span>{formatDate(booking.check_in)}</span>
                    <span className="mx-1">→</span>
                    <span>{formatDate(booking.check_out)}</span>
                  </td>
                  <td className="px-5 py-4 text-theme-sm font-medium text-typography dark:text-white/90 whitespace-nowrap">
                    ₦{booking.total_amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    ₦{booking.host_earnings.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <Badge size="sm" color={bookingStatusColor(booking.booking_status)}>
                      {booking.booking_status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge size="sm" color={paymentStatusColor(booking.payment_status)}>
                      {booking.payment_status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge size="sm" color={escrowStatusColor(booking.escrow_status)}>
                      {booking.escrow_status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      {booking.escrow_status === "held" && booking.payment_status === "confirmed" && (
                        <button
                          type="button"
                          disabled={releaseEscrow.isPending}
                          onClick={() => handleReleaseEscrow(booking)}
                          className="rounded-lg bg-success-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-success-600 disabled:opacity-50"
                        >
                          Release
                        </button>
                      )}
                      {booking.booking_status !== "cancelled" && booking.escrow_status !== "released" && (
                        <button
                          type="button"
                          disabled={cancelBooking.isPending}
                          onClick={() => handleCancelBooking(booking)}
                          className="rounded-lg bg-error-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-error-600 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 dark:border-white/5">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            {total === 0
              ? "No bookings"
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
