"use client";

import React from "react";
import Link from "next/link";
import {
  UserCircleIcon,
  FolderIcon,
  BoxCubeIcon,
  ListIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@/icons";
import { mockRecentActivity } from "@/data/mock";
import type { ActivityType } from "@/data/mock";

const activityConfig: Record<
  ActivityType,
  { icon: React.ReactNode; bg: string; text: string }
> = {
  user_added: {
    icon: <UserCircleIcon className="size-5" />,
    bg: "bg-secondary-10",
    text: "text-secondary",
  },
  user_activated: {
    icon: <CheckCircleIcon className="size-5" />,
    bg: "bg-success-50",
    text: "text-success-600",
  },
  property_listed: {
    icon: <FolderIcon className="size-5" />,
    bg: "bg-primary-10",
    text: "text-primary",
  },
  property_updated: {
    icon: <FolderIcon className="size-5" />,
    bg: "bg-primary-20",
    text: "text-primary",
  },
  amenity_created: {
    icon: <BoxCubeIcon className="size-5" />,
    bg: "bg-primary-10",
    text: "text-primary",
  },
  category_created: {
    icon: <ListIcon className="size-5" />,
    bg: "bg-secondary-10",
    text: "text-secondary",
  },
};

function formatTimeAgo(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default function RecentActivity() {
  const activities = mockRecentActivity.slice(0, 8);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="border-b border-gray-100 px-5 py-4 dark:border-white/5 md:px-6">
        <h2 className="text-base font-semibold text-typography dark:text-white/90">
          Recent activity
        </h2>
        <p className="mt-0.5 text-theme-sm text-gray-500 dark:text-gray-400">
          Latest updates across the platform
        </p>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-white/5">
        {activities.map((activity) => {
          const config = activityConfig[activity.type];
          const content = (
            <div className="flex items-start gap-3 px-5 py-4 md:px-6">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.text}`}
              >
                {config.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-theme-sm font-medium text-typography dark:text-white/90">
                  {activity.message}
                </p>
                <p className="mt-0.5 text-theme-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(activity.createdAt)}
                </p>
              </div>
              {activity.href && (
                <span className="shrink-0 text-primary dark:text-primary-50">
                  <ArrowRightIcon className="size-4" />
                </span>
              )}
            </div>
          );

          if (activity.href) {
            return (
              <Link
                key={activity.id}
                href={activity.href}
                className="block transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
              >
                {content}
              </Link>
            );
          }

          return <div key={activity.id}>{content}</div>;
        })}
      </div>
    </div>
  );
}
