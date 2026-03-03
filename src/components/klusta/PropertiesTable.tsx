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
import { EyeIcon } from "@/icons";
import type { PropertyView } from "@/lib/api/normalize";
import { formatAmount } from "@/lib/format";

const statusColor: Record<string, "success" | "warning" | "error"> = {
  listed: "success",
  pending: "warning",
  unlisted: "error",
};

interface PropertiesTableProps {
  properties: PropertyView[];
}

export default function PropertiesTable({ properties }: PropertiesTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/5">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Property
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Location
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price
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
          <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="px-5 py-4 text-start">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                      {property.image ? (
                        <Image
                          width={64}
                          height={48}
                          src={property.image}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-xs font-medium text-gray-400">
                          —
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {property.title}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {property.slug}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-600 text-theme-sm dark:text-gray-400">
                  {property.address}, {property.city}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-600 text-theme-sm dark:text-gray-400">
                  {property.categoryName}
                </TableCell>
                <TableCell className="px-5 py-4 font-medium text-typography text-theme-sm dark:text-white/90">
                  {formatAmount(property.price)}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Badge size="sm" color={statusColor[property.status] ?? "success"}>
                    {property.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4 text-end">
                  <Link
                    href={`/properties/${property.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary-10 dark:text-primary-50 dark:hover:bg-primary/20"
                  >
                    <EyeIcon className="size-4" />
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {properties.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                  No properties found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
