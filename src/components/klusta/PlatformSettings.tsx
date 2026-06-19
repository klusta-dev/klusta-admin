"use client";

import React, { useEffect, useState } from "react";
import { useAdminSettings, useUpdateAdminSettings, useDisburseFunds } from "@/lib/api/hooks";
import { SettingsFormSkeleton } from "@/components/ui/skeleton";

export default function PlatformSettings() {
  const { data, isLoading } = useAdminSettings();
  const updateSettings = useUpdateAdminSettings();
  const disburse = useDisburseFunds();

  const settings = data?.data;

  const [commission, setCommission] = useState("");
  const [autoPayment, setAutoPayment] = useState(false);
  const [waitTime, setWaitTime] = useState("");
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const [disburseMsg, setDisburseMsg] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setCommission(String(settings.platform_commission_percentage ?? 0));
      setAutoPayment(settings.automatic_payment ?? false);
      setWaitTime(String(settings.transaction_wait_time_minutes ?? 30));
    }
  }, [settings]);

  function notify(msg: string, ok = true) {
    setFeedback({ msg, ok });
    setTimeout(() => setFeedback(null), 5000);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const commissionVal = parseFloat(commission);
    const waitVal = parseInt(waitTime, 10);
    if (isNaN(commissionVal) || commissionVal < 0 || commissionVal > 100) {
      notify("Commission must be between 0 and 100.", false);
      return;
    }
    if (isNaN(waitVal) || waitVal < 1 || waitVal > 1440) {
      notify("Wait time must be between 1 and 1440 minutes.", false);
      return;
    }
    try {
      await updateSettings.mutateAsync({
        platform_commission_percentage: commissionVal,
        automatic_payment: autoPayment,
        transaction_wait_time_minutes: waitVal,
      });
      notify("Settings saved successfully.");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to save settings.";
      notify(msg, false);
    }
  }

  async function handleDisburse() {
    if (!confirm("Trigger auto-release of all eligible escrow funds now?")) return;
    try {
      const res = await disburse.mutateAsync();
      setDisburseMsg(res?.data?.message ?? "Disburse triggered.");
      setTimeout(() => setDisburseMsg(null), 6000);
    } catch {
      setDisburseMsg("Failed to trigger disburse.");
      setTimeout(() => setDisburseMsg(null), 6000);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-theme-sm text-typography focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";
  const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

  if (isLoading) return <SettingsFormSkeleton />;

  return (
    <div className="space-y-6">
      {/* Settings form */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <h2 className="mb-6 text-base font-semibold text-typography dark:text-white/90">
          Platform Settings
        </h2>

        <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className={labelCls} htmlFor="commission">
                Platform Commission (%)
              </label>
              <input
                id="commission"
                type="number"
                min={0}
                max={100}
                step={0.01}
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                className={inputCls}
                placeholder="e.g. 5"
              />
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Percentage cut taken from each booking (0–100, up to 2 decimal places).
              </p>
            </div>

            <div>
              <label className={labelCls} htmlFor="wait-time">
                Transaction Wait Time (minutes)
              </label>
              <input
                id="wait-time"
                type="number"
                min={1}
                max={1440}
                step={1}
                value={waitTime}
                onChange={(e) => setWaitTime(e.target.value)}
                className={inputCls}
                placeholder="e.g. 30"
              />
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Minutes a guest has to complete payment after negotiation acceptance (1–1440).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div
                role="checkbox"
                aria-checked={autoPayment}
                tabIndex={0}
                onClick={() => setAutoPayment((v) => !v)}
                onKeyDown={(e) => e.key === " " && setAutoPayment((v) => !v)}
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                  autoPayment ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    autoPayment ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-typography dark:text-white/90">
                  Automatic Payment
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  When enabled, escrow is auto-released after check-out via /admin/disburse.
                </p>
              </div>
            </div>

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

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updateSettings.isPending}
                className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {updateSettings.isPending ? "Saving…" : "Save Settings"}
              </button>
            </div>
          </form>
      </div>

      {/* Manual disburse */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <h2 className="mb-2 text-base font-semibold text-typography dark:text-white/90">
          Manual Escrow Release
        </h2>
        <p className="mb-4 text-theme-sm text-gray-500 dark:text-gray-400">
          Processes all confirmed bookings whose check-out has passed and escrow is still held.
          Only runs when Automatic Payment is enabled.
        </p>
        {disburseMsg && (
          <div className="mb-4 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 text-theme-sm text-primary dark:bg-primary-900/20 dark:border-primary-800">
            {disburseMsg}
          </div>
        )}
        <button
          type="button"
          disabled={disburse.isPending}
          onClick={handleDisburse}
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {disburse.isPending ? "Processing…" : "Trigger Disburse"}
        </button>
      </div>
    </div>
  );
}
