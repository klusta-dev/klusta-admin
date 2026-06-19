"use client";

import React, { useState } from "react";
import { useSendTestPush, useSimulateAllPush } from "@/lib/api/hooks";

const PUSH_CATEGORIES = ["transactional", "host_ops", "account_security", "marketing"] as const;
const EVENT_TYPES: Record<string, string[]> = {
  transactional: ["message.new", "booking.created", "booking.updated", "booking.reminder", "booking.expired", "payment.update"],
  host_ops: ["booking.created", "booking.updated", "booking.reminder", "booking.expired", "payment.update"],
  account_security: ["account.security"],
  marketing: ["marketing.generic"],
};

type PushMode = "single" | "broadcast";

export default function NotificationsList() {
  const [mode, setMode] = useState<PushMode>("single");
  const [targetUserId, setTargetUserId] = useState("");
  const [category, setCategory] = useState<(typeof PUSH_CATEGORIES)[number]>("transactional");
  const [eventType, setEventType] = useState("booking.created");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [entityId, setEntityId] = useState("");
  const [screen, setScreen] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [resultOk, setResultOk] = useState(true);

  const sendTest = useSendTestPush();
  const sendAll = useSimulateAllPush();

  const availableEvents = EVENT_TYPES[category] ?? [];

  function handleCategoryChange(c: (typeof PUSH_CATEGORIES)[number]) {
    setCategory(c);
    const events = EVENT_TYPES[c] ?? [];
    setEventType(events[0] ?? "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setResult("Title and body are required.");
      setResultOk(false);
      return;
    }

    try {
      if (mode === "single") {
        if (!targetUserId.trim()) {
          setResult("Target User ID is required for single-user push.");
          setResultOk(false);
          return;
        }
        const res = await sendTest.mutateAsync({
          target_user_id: targetUserId.trim(),
          category,
          event_type: eventType,
          title: title.trim(),
          body: body.trim(),
          ...(entityId && { entity_id: entityId }),
          ...(screen && { screen }),
        });
        if (res?.data?.dispatched) {
          setResult(`Dispatched! OneSignal ID: ${res.data.onesignal_id}`);
          setResultOk(true);
        } else {
          setResult(`Skipped — ${res?.data?.skip_reason ?? "unknown reason"}`);
          setResultOk(false);
        }
      } else {
        const res = await sendAll.mutateAsync({
          category,
          event_type: eventType,
          title: title.trim(),
          body: body.trim(),
          entity_id: entityId || null,
          ...(screen && { screen }),
        });
        if (res?.data?.dispatched) {
          setResult(
            `Broadcast sent to ${res.data.user_count} users (${res.data.token_count} tokens). OneSignal ID: ${res.data.onesignal_id}`
          );
          setResultOk(true);
        } else {
          setResult("Broadcast returned without dispatch.");
          setResultOk(false);
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send notification.";
      setResult(msg);
      setResultOk(false);
    }
    setTimeout(() => setResult(null), 8000);
  }

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-theme-sm text-typography focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";
  const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

  const isPending = sendTest.isPending || sendAll.isPending;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <h2 className="mb-2 text-base font-semibold text-typography dark:text-white/90">
          Send Push Notification
        </h2>
        <p className="mb-6 text-theme-sm text-gray-500 dark:text-gray-400">
          Send a test push to a specific user or broadcast to all active users.
        </p>

        {/* Mode toggle */}
        <div className="mb-6 flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden w-fit">
          <button
            type="button"
            onClick={() => setMode("single")}
            className={`px-5 py-2 text-sm font-medium transition-colors ${
              mode === "single"
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
            }`}
          >
            Single User
          </button>
          <button
            type="button"
            onClick={() => setMode("broadcast")}
            className={`px-5 py-2 text-sm font-medium transition-colors ${
              mode === "broadcast"
                ? "bg-primary text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
            }`}
          >
            Broadcast All
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Target user (single mode only) */}
          {mode === "single" && (
            <div>
              <label className={labelCls} htmlFor="target-user-id">
                Target User ID <span className="text-error-500">*</span>
              </label>
              <input
                id="target-user-id"
                type="text"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="User UUID"
                className={inputCls}
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="category">
                Category <span className="text-error-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as (typeof PUSH_CATEGORIES)[number])}
                className={inputCls}
              >
                {PUSH_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="event-type">
                Event Type <span className="text-error-500">*</span>
              </label>
              <select
                id="event-type"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className={inputCls}
              >
                {availableEvents.map((ev) => (
                  <option key={ev} value={ev}>
                    {ev}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="push-title">
              Title <span className="text-error-500">*</span>
            </label>
            <input
              id="push-title"
              type="text"
              maxLength={80}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification title (max 80 chars)"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="push-body">
              Body <span className="text-error-500">*</span>
            </label>
            <textarea
              id="push-body"
              maxLength={240}
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Notification message (max 240 chars)"
              className={inputCls + " resize-none"}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="entity-id">
                Entity ID <span className="text-xs font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="entity-id"
                type="text"
                maxLength={64}
                value={entityId}
                onChange={(e) => setEntityId(e.target.value)}
                placeholder="Related entity UUID"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="screen">
                Deep-link Screen <span className="text-xs font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="screen"
                type="text"
                maxLength={64}
                value={screen}
                onChange={(e) => setScreen(e.target.value)}
                placeholder="e.g. BookingDetails"
                className={inputCls}
              />
            </div>
          </div>

          {result && (
            <div
              className={`rounded-lg border px-4 py-3 text-theme-sm ${
                resultOk
                  ? "bg-success-50 border-success-200 text-success-700 dark:bg-success-900/20 dark:border-success-800 dark:text-success-400"
                  : "bg-error-50 border-error-200 text-error-700 dark:bg-error-900/20 dark:border-error-800 dark:text-error-400"
              }`}
            >
              {result}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {isPending
                ? "Sending…"
                : mode === "broadcast"
                ? "Broadcast to All Users"
                : "Send Push Notification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
