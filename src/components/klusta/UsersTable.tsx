"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { mockUsers } from "@/data/mock";
import { EyeIcon } from "@/icons";

const statusColor: Record<string, "success" | "warning" | "error"> = {
  active: "success",
  pending: "warning",
  inactive: "error",
};

export default function UsersTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User
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
                Role
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-5 py-4 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
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
                  {user.role}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Badge size="sm" color={statusColor[user.status] ?? "success"}>
                    {user.status}
                  </Badge>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
