import type { Metadata } from "next";
import React from "react";
import DashboardStats from "@/components/klusta/DashboardStats";
import RecentTransactions from "@/components/klusta/RecentTransactions";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TransactionStatsCards from "@/components/klusta/TransactionStatsCards";

export const metadata: Metadata = {
  title: "Dashboard | Klusta Admin",
  description: "Klusta admin dashboard overview",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Dashboard" />
      <DashboardStats />
      <TransactionStatsCards />
      <RecentTransactions />
    </div>
  );
}
