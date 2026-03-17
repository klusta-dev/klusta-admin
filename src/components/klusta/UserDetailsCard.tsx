"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, MailIcon, UserIcon } from "@/icons";
import type { UserDisplay } from "@/lib/api/types";
import { useAdminUserStatusMutation } from "@/lib/api/hooks";

const statusColor: Record<string, "success" | "warning" | "error"> = {
  active: "success",
  pending: "warning",
  inactive: "error",
};

interface UserDetailsCardProps {
  user: UserDisplay;
  userId: string;
}

export default function UserDetailsCard({ user: initialUser, userId }: UserDetailsCardProps) {
  const [status, setStatus] = useState<UserDisplay["status"]>(initialUser.status);
  const statusMutation = useAdminUserStatusMutation();

  const handleActivate = () => {
    statusMutation.mutate(
      { id: userId, body: { id: userId, is_active: true } },
      { onSuccess: () => setStatus("active") }
    );
  };
  const handleDeactivate = () => {
    statusMutation.mutate(
      { id: userId, body: { id: userId, is_active: false } },
      { onSuccess: () => setStatus("inactive") }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/users"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-50"
        >
          <ChevronLeftIcon className="size-4" />
          Back to Users
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex shrink-0">
            <div className="w-24 h-24 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700">
              {initialUser.avatar ? (
                <Image
                  width={96}
                  height={96}
                  src={initialUser.avatar}
                  alt={initialUser.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-3xl font-semibold text-gray-500 dark:text-gray-400">
                  {initialUser.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-typography dark:text-white/90">
                  {initialUser.name}
                </h1>
                <Badge size="sm" color={statusColor[status ?? "pending"]}>
                  {status}
                </Badge>
              </div>
              <div className="flex gap-2">
                {(status === "inactive" || status === "pending") && (
                  <Button
                    size="sm"
                    onClick={handleActivate}
                    disabled={statusMutation.isPending}
                    className="!bg-success-500 hover:!bg-success-600"
                  >
                    {statusMutation.isPending ? "Updating…" : "Activate user"}
                  </Button>
                )}
                {status === "active" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDeactivate}
                    disabled={statusMutation.isPending}
                    className="!ring-klusta-error/50 hover:!bg-klusta-error-10 hover:!text-klusta-error hover:!ring-klusta-error/30"
                  >
                    {statusMutation.isPending ? "Updating…" : "Deactivate user"}
                  </Button>
                )}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {initialUser.role}
            </p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-1">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-10 text-primary dark:bg-primary/20 dark:text-primary-50">
                  <MailIcon className="size-5" />
                </span>
                <div>
                  <dt className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                    Email
                  </dt>
                  <dd className="text-theme-sm font-medium text-typography dark:text-white/90">
                    {initialUser.email}
                  </dd>
                </div>
              </div>
              {initialUser.phone && (
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-10 text-secondary dark:bg-secondary-50">
                    <UserIcon className="size-5" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      Phone
                    </dt>
                    <dd className="text-theme-sm font-medium text-typography dark:text-white/90">
                      {initialUser.phone}
                    </dd>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <span className="text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                    Joined
                  </span>
                </span>
                <div>
                  <dt className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                    Joined at
                  </dt>
                  <dd className="text-theme-sm font-medium text-typography dark:text-white/90">
                    {initialUser.joinedAt
                      ? new Date(initialUser.joinedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      : "-"}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
