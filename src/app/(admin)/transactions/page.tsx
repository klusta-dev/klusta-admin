import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TransactionsList from "@/components/klusta/TransactionsList";

export const metadata: Metadata = {
  title: "Transactions | Klusta Admin",
  description: "View transactions",
};

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Transactions" />
      <TransactionsList />
    </div>
  );
}
