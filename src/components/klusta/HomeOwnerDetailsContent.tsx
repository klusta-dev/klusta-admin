"use client";

import Link from "next/link";
import React, { useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import { useAdminUser, useAdminUserStatusMutation, useLockMerchantFunds, useReleaseMerchantFunds } from "@/lib/api/hooks";
import { UserDetailSkeleton } from "@/components/ui/skeleton";

interface Props {
  userId: string;
}

export default function HomeOwnerDetailsContent({ userId }: Props) {
  const { data, isLoading, isError } = useAdminUser(userId);
  const statusMutation = useAdminUserStatusMutation();
  const lockFunds = useLockMerchantFunds();
  const releaseFunds = useReleaseMerchantFunds();

  const [lockReason, setLockReason] = useState("");
  const [showLockForm, setShowLockForm] = useState(false);
  const [showReleaseForm, setShowReleaseForm] = useState(false);
  const [releaseReason, setReleaseReason] = useState("");
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

  const user = data?.data;

  function notify(msg: string, ok = true) {
    setFeedback({ msg, ok });
    setTimeout(() => setFeedback(null), 5000);
  }

  async function handleToggleStatus() {
    if (!user) return;
    const isVerified = !!(user.emailVerifiedAt ?? user.email_verified_at);
    const action = isVerified ? "deactivate" : "activate";
    if (!confirm(`${action.charAt(0).toUpperCase() + action.slice(1)} this user?`)) return;
    try {
      await statusMutation.mutateAsync({
        id: userId,
        body: { id: userId, is_active: !isVerified },
      });
      notify(`User ${action}d successfully.`);
    } catch {
      notify(`Failed to ${action} user.`, false);
    }
  }

  async function handleLockFunds(e: React.FormEvent) {
    e.preventDefault();
    if (!lockReason.trim()) return;
    try {
      await lockFunds.mutateAsync({ merchantId: userId, body: { reason: lockReason.trim() } });
      setShowLockForm(false);
      setLockReason("");
      notify("Merchant funds locked.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to lock funds.";
      notify(msg, false);
    }
  }

  async function handleReleaseFunds(e: React.FormEvent) {
    e.preventDefault();
    if (!releaseReason.trim()) return;
    try {
      await releaseFunds.mutateAsync({ merchantId: userId, body: { reason: releaseReason.trim() } });
      setShowReleaseForm(false);
      setReleaseReason("");
      notify("Merchant funds unlocked.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to release funds.";
      notify(msg, false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-theme-sm text-typography focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";

  if (isLoading) return <UserDetailSkeleton />;

  if (isError || !user) {
    return (
      <div className="space-y-4">
        <Link href="/home-owners" className="text-theme-sm text-primary hover:underline">
          ← Back to Home Owners
        </Link>
        <p className="text-theme-sm text-error-600 dark:text-error-400">
          Could not load home owner details.
        </p>
      </div>
    );
  }

  const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email?.split("@")[0] || "—";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/home-owners" className="text-theme-sm text-primary hover:underline">
            ← Back to Home Owners
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-typography dark:text-white/90">{name}</h1>
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            {user.email}
            {user.phone_number && ` • ${user.phone_number}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm" color={user.emailVerifiedAt ?? user.email_verified_at ? "success" : "error"}>
            {user.emailVerifiedAt ?? user.email_verified_at ? "Verified" : "Unverified"}
          </Badge>
          {user.account_type && (
            <Badge size="sm" color="info">
              {user.account_type}
            </Badge>
          )}
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`rounded-lg border px-4 py-3 text-theme-sm ${
            feedback.ok
              ? "bg-success-50 border-success-200 text-success-700 dark:bg-success-900/20 dark:border-success-800 dark:text-success-400"
              : "bg-error-50 border-error-200 text-error-700 dark:bg-error-900/20 dark:border-error-800 dark:text-error-400"
          }`}
        >
          {feedback.msg}
        </div>
      )}

      {/* Info cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">Email Verified</p>
          <p className="mt-2 text-lg font-semibold text-typography dark:text-white/90">
            {user.emailVerifiedAt ?? user.email_verified_at
              ? new Date(String(user.emailVerifiedAt ?? user.email_verified_at)).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
              : "Not verified"}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">Joined</p>
          <p className="mt-2 text-lg font-semibold text-typography dark:text-white/90">
            {user.created_at ? new Date(user.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" }) : "—"}
          </p>
        </div>
        {!!(user as Record<string, unknown>).address && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
            <p className="text-theme-sm text-gray-500 dark:text-gray-400">Address</p>
            <p className="mt-2 text-base font-semibold text-typography dark:text-white/90">
              {String((user as Record<string, unknown>).address)}
            </p>
          </div>
        )}
      </div>

      {/* Account actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <h2 className="mb-4 text-base font-semibold text-typography dark:text-white/90">Account Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={statusMutation.isPending}
            onClick={handleToggleStatus}
            className={`rounded-xl px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60 ${
              user.emailVerifiedAt ?? user.email_verified_at ? "bg-error-500 hover:bg-error-600" : "bg-success-500 hover:bg-success-600"
            }`}
          >
            {statusMutation.isPending ? "Updating…" : user.emailVerifiedAt ?? user.email_verified_at ? "Deactivate User" : "Activate User"}
          </button>
          <button
            type="button"
            onClick={() => { setShowLockForm((v) => !v); setShowReleaseForm(false); }}
            className="rounded-xl border border-error-300 px-5 py-2.5 text-sm font-medium text-error-600 hover:bg-error-50 dark:border-error-700 dark:text-error-400 dark:hover:bg-error-900/20"
          >
            Lock Funds
          </button>
          <button
            type="button"
            onClick={() => { setShowReleaseForm((v) => !v); setShowLockForm(false); }}
            className="rounded-xl border border-success-300 px-5 py-2.5 text-sm font-medium text-success-600 hover:bg-success-50 dark:border-success-700 dark:text-success-400 dark:hover:bg-success-900/20"
          >
            Release Funds
          </button>
        </div>

        {/* Lock funds form */}
        {showLockForm && (
          <form onSubmit={handleLockFunds} className="mt-4 space-y-3 rounded-xl border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-900/10">
            <p className="text-sm font-medium text-error-700 dark:text-error-400">
              Lock this merchant&apos;s withdrawal access
            </p>
            <div>
              <label className="mb-1.5 block text-xs text-gray-600 dark:text-gray-400" htmlFor="lock-reason">
                Reason <span className="text-error-500">*</span>
              </label>
              <input
                id="lock-reason"
                type="text"
                required
                minLength={1}
                value={lockReason}
                onChange={(e) => setLockReason(e.target.value)}
                placeholder="e.g. Fraudulent activity reported"
                className={inputCls}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={lockFunds.isPending}
                className="rounded-lg bg-error-500 px-4 py-2 text-sm font-medium text-white hover:bg-error-600 disabled:opacity-60"
              >
                {lockFunds.isPending ? "Locking…" : "Confirm Lock"}
              </button>
              <button
                type="button"
                onClick={() => setShowLockForm(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Release funds form */}
        {showReleaseForm && (
          <form onSubmit={handleReleaseFunds} className="mt-4 space-y-3 rounded-xl border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-900/10">
            <p className="text-sm font-medium text-success-700 dark:text-success-400">
              Lift the active fund lock on this merchant
            </p>
            <div>
              <label className="mb-1.5 block text-xs text-gray-600 dark:text-gray-400" htmlFor="release-reason">
                Reason <span className="text-error-500">*</span>
              </label>
              <input
                id="release-reason"
                type="text"
                required
                minLength={1}
                value={releaseReason}
                onChange={(e) => setReleaseReason(e.target.value)}
                placeholder="e.g. Issue resolved after review"
                className={inputCls}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={releaseFunds.isPending}
                className="rounded-lg bg-success-500 px-4 py-2 text-sm font-medium text-white hover:bg-success-600 disabled:opacity-60"
              >
                {releaseFunds.isPending ? "Releasing…" : "Confirm Release"}
              </button>
              <button
                type="button"
                onClick={() => setShowReleaseForm(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
