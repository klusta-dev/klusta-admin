"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import { formatAmount } from "@/lib/format";

interface PropertyDetailsStickyBarProps {
  propertyId: string;
  propertyTitle: string;
  status: "listed" | "unlisted" | "pending";
  price: string;
  negotiable?: boolean;
}

export default function PropertyDetailsStickyBar({
  propertyId,
  propertyTitle,
  status,
  price,
  negotiable,
}: PropertyDetailsStickyBarProps) {
  const [loading, setLoading] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleDisable = () => {
    if (!confirm(`Disable listing for "${propertyTitle}"? The property will be unlisted and hidden from search.`)) return;
    setLoading(true);
    setActionFeedback(null);
    // TODO: call API to set status to unlisted
    setTimeout(() => {
      setLoading(false);
      setActionFeedback("Listing disabled.");
    }, 500);
  };

  const handleEnable = () => {
    if (!confirm(`Re-enable listing for "${propertyTitle}"?`)) return;
    setLoading(true);
    setActionFeedback(null);
    // TODO: call API to set status to listed
    setTimeout(() => {
      setLoading(false);
      setActionFeedback("Listing enabled.");
    }, 500);
  };

  const handleTakeDown = () => {
    if (!confirm(`Take down "${propertyTitle}"? This will remove the property from the platform. You can restore it later from admin.`)) return;
    setLoading(true);
    setActionFeedback(null);
    // TODO: call API to take down property
    setTimeout(() => {
      setLoading(false);
      setActionFeedback("Property taken down.");
    }, 500);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-4 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900 md:px-6">
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-lg font-semibold text-typography dark:text-white/90">
            {formatAmount(price)}
          </p>
          {negotiable && (
            <span className="rounded-lg bg-warning-100 px-2.5 py-1 text-theme-xs font-medium text-warning-700 dark:bg-warning-500/20 dark:text-warning-400">
              Negotiable
            </span>
          )}
          {actionFeedback && (
            <span className="text-theme-sm text-primary dark:text-primary-50">
              {actionFeedback}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {status === "listed" ? (
            <Button
              size="md"
              variant="outline"
              onClick={handleDisable}
              disabled={loading}
              className="min-w-[140px] border-klusta-error/50 text-klusta-error hover:bg-klusta-error-10 hover:border-klusta-error hover:text-klusta-error dark:border-klusta-error/50 dark:text-klusta-error-100 dark:hover:bg-klusta-error/20"
            >
              Disable listing
            </Button>
          ) : (
            <Button
              size="md"
              variant="outline"
              onClick={handleEnable}
              disabled={loading}
              className="min-w-[140px] border-primary text-primary hover:bg-primary-10 dark:border-primary-50 dark:text-primary-50 dark:hover:bg-primary/20"
            >
              Enable listing
            </Button>
          )}
          <Button
            size="md"
            variant="outline"
            onClick={handleTakeDown}
            disabled={loading}
            className="min-w-[120px] border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Take down
          </Button>
        </div>
      </div>
    </div>
  );
}
