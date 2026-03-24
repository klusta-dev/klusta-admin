"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import Badge from "@/components/ui/badge/Badge";
import type { HomeOwnerItem } from "@/lib/mock/home-owners";

const PROPERTIES_PAGE_SIZE = 5;
const TRANSACTIONS_PAGE_SIZE = 5;

interface HomeOwnerDetailsContentProps {
  owner: HomeOwnerItem;
}

export default function HomeOwnerDetailsContent({ owner }: HomeOwnerDetailsContentProps) {
  const [propertiesPage, setPropertiesPage] = useState(1);
  const [transactionsPage, setTransactionsPage] = useState(1);

  const propertiesTotalPages = Math.max(1, Math.ceil(owner.properties.length / PROPERTIES_PAGE_SIZE));
  const transactionsTotalPages = Math.max(
    1,
    Math.ceil(owner.transactionHistory.length / TRANSACTIONS_PAGE_SIZE)
  );

  const pagedProperties = useMemo(() => {
    const start = (propertiesPage - 1) * PROPERTIES_PAGE_SIZE;
    return owner.properties.slice(start, start + PROPERTIES_PAGE_SIZE);
  }, [owner.properties, propertiesPage]);

  const pagedTransactions = useMemo(() => {
    const start = (transactionsPage - 1) * TRANSACTIONS_PAGE_SIZE;
    return owner.transactionHistory.slice(start, start + TRANSACTIONS_PAGE_SIZE);
  }, [owner.transactionHistory, transactionsPage]);

  const propertiesStart = owner.properties.length === 0 ? 0 : (propertiesPage - 1) * PROPERTIES_PAGE_SIZE + 1;
  const propertiesEnd = Math.min(propertiesPage * PROPERTIES_PAGE_SIZE, owner.properties.length);

  const transactionsStart =
    owner.transactionHistory.length === 0 ? 0 : (transactionsPage - 1) * TRANSACTIONS_PAGE_SIZE + 1;
  const transactionsEnd = Math.min(
    transactionsPage * TRANSACTIONS_PAGE_SIZE,
    owner.transactionHistory.length
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/home-owners" className="text-theme-sm text-primary hover:underline">
            Back to Home Owners
          </Link>
          <h1 className="mt-1 text-2xl font-semibold text-typography dark:text-white/90">{owner.name}</h1>
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            {owner.email} • {owner.phone}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">Transactions</p>
          <p className="mt-2 text-2xl font-semibold text-typography dark:text-white/90">{owner.transactions}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">Houses Sold</p>
          <p className="mt-2 text-2xl font-semibold text-typography dark:text-white/90">{owner.soldHouses}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">Active Houses</p>
          <p className="mt-2 text-2xl font-semibold text-typography dark:text-white/90">{owner.activeHouses}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">Withdrawals</p>
          <p className="mt-2 text-2xl font-semibold text-typography dark:text-white/90">{owner.withdrawals}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-white/5">
          <h2 className="text-base font-semibold text-typography dark:text-white/90">Properties</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Name</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">City</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Price</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {pagedProperties.map((property) => (
                <tr key={property.id}>
                  <td className="px-5 py-4 text-theme-sm font-medium text-typography dark:text-white/90">{property.name}</td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">{property.city}</td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">₦{property.price.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <Badge size="sm" color={property.status === "active" ? "success" : "warning"}>
                      {property.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 dark:border-white/5">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            Showing {propertiesStart}-{propertiesEnd} of {owner.properties.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPropertiesPage((p) => Math.max(1, p - 1))}
              disabled={propertiesPage === 1}
              className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
            >
              Previous
            </button>
            <span className="text-theme-sm text-gray-600 dark:text-gray-400">
              {propertiesPage}/{propertiesTotalPages}
            </span>
            <button
              type="button"
              onClick={() => setPropertiesPage((p) => Math.min(propertiesTotalPages, p + 1))}
              disabled={propertiesPage === propertiesTotalPages}
              className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-white/5">
          <h2 className="text-base font-semibold text-typography dark:text-white/90">Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-100 dark:border-white/5">
              <tr>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Type</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Reference</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Amount</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Date</th>
                <th className="px-5 py-3 text-left text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {pagedTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">{txn.type}</td>
                  <td className="px-5 py-4 text-theme-sm font-medium text-typography dark:text-white/90">{txn.propertyName}</td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">₦{txn.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-theme-sm text-gray-600 dark:text-gray-400">{txn.date}</td>
                  <td className="px-5 py-4">
                    <Badge
                      size="sm"
                      color={txn.status === "completed" ? "success" : txn.status === "pending" ? "warning" : "error"}
                    >
                      {txn.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 dark:border-white/5">
          <p className="text-theme-sm text-gray-500 dark:text-gray-400">
            Showing {transactionsStart}-{transactionsEnd} of {owner.transactionHistory.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTransactionsPage((p) => Math.max(1, p - 1))}
              disabled={transactionsPage === 1}
              className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
            >
              Previous
            </button>
            <span className="text-theme-sm text-gray-600 dark:text-gray-400">
              {transactionsPage}/{transactionsTotalPages}
            </span>
            <button
              type="button"
              onClick={() => setTransactionsPage((p) => Math.min(transactionsTotalPages, p + 1))}
              disabled={transactionsPage === transactionsTotalPages}
              className="rounded-lg border border-gray-200 px-3 py-2 text-theme-sm text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
