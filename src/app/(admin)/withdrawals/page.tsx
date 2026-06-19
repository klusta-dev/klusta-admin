import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import WithdrawalsList from "@/components/klusta/WithdrawalsList";

export const metadata: Metadata = {
  title: "Withdrawals | Klusta Admin",
  description: "Manage merchant withdrawal requests",
};

export default function WithdrawalsPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Withdrawals" />
      <WithdrawalsList />
    </div>
  );
}
