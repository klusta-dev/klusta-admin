"use client";

import React from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import UserDetailsCard from "@/components/klusta/UserDetailsCard";
import { useAdminUser } from "@/lib/api/hooks";
import { mapApiUserToDisplay } from "@/lib/api/types";

export default function UserDetailsPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : null;
  const { data, isLoading, isError, error } = useAdminUser(id);

  if (!id) notFound();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-theme-sm text-gray-500 dark:text-gray-400">
        Loading user…
      </div>
    );
  }
  if (isError || !data?.data) {
    if (isError && error && (error as { response?: { status?: number } })?.response?.status === 404) notFound();
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <p className="text-theme-sm text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load user."}
        </p>
      </div>
    );
  }

  const raw = data.data;
  if (!raw || typeof raw !== "object" || !("id" in raw)) notFound();
  const user = mapApiUserToDisplay(raw as Parameters<typeof mapApiUserToDisplay>[0]);
  return <UserDetailsCard user={user} userId={id} />;
}
