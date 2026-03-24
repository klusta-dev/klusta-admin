// @ts-nocheck
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon } from "@/icons";
import { useAdminUsers } from "@/lib/api/hooks";
import { mapApiUserToDisplay } from "@/lib/api/types";

const PAGE_SIZE = 10;
export default function UsersTable() {
  const [page, setPage] = useState(1);
  const offset = page * PAGE_SIZE;
  const { data, isLoading, isError, error } = useAdminUsers({ limit: PAGE_SIZE, offset });
  const adminUsersResponse = data?.data;
  const users = adminUsersResponse || [];
  const total = adminUsersResponse?.total ?? 0;
  const displayUsers = users.map((user: any) => mapApiUserToDisplay(user));
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hasNext = page < totalPages - 1;
  const hasPrev = page > 0;

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="flex items-center justify-center py-16 text-theme-sm text-gray-500 dark:text-gray-400">
          Loading users…
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
        <p className="text-theme-sm text-red-600 dark:text-red-400">
          {error instanceof Error ? error.message : "Failed to load users."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Regular User
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Active Bookings
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total Bookings
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total Spent
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {displayUsers.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-12 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    No users found.
                  </TableCell>
                  <TableCell className="px-5 py-12">{null}</TableCell>
                  <TableCell className="px-5 py-12">{null}</TableCell>
                  <TableCell className="px-5 py-12">{null}</TableCell>
                  <TableCell className="px-5 py-12">{null}</TableCell>
                  <TableCell className="px-5 py-12">{null}</TableCell>
                </TableRow>
              ) : (
                displayUsers.map((user: any, index: number) => {
                  const rawUser = users[index] as Record<string, unknown> | undefined;
                  const activeBookings =
                    typeof rawUser?.active_bookings === "number" ? rawUser.active_bookings : 0;
                  const totalBookings =
                    typeof rawUser?.total_bookings === "number" ? rawUser.total_bookings : 0;
                  const totalSpentValue =
                    typeof rawUser?.total_spent === "number" ? rawUser.total_spent : 0;

                  return (
                  <TableRow key={user.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          {user.avatar ? (
                            <Image
                              width={40}
                              height={40}
                              src={user.avatar}
                              alt={user.name}
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400">
                              {user.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {user.name}
                          </span>
                          {user.phone && (
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {user.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-600 text-theme-sm dark:text-gray-400">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-gray-600 text-theme-sm dark:text-gray-400">
                      {activeBookings}
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <span className="text-gray-600 text-theme-sm dark:text-gray-400">
                        {totalBookings}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <span className="font-medium text-typography text-theme-sm dark:text-white/90">
                        ₦{totalSpentValue.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-end">
                      <Link
                        href={`/users/${user.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary-10 dark:text-primary-50 dark:hover:bg-primary/20"
                      >
                        <EyeIcon className="size-4" />
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            Showing {offset + 1}–{Math.min(offset + PAGE_SIZE, total)} of {total}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={!hasPrev}
              className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={!hasNext}
              className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
