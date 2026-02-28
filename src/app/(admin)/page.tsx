import type { Metadata } from "next";
import React from "react";
import DashboardStats from "@/components/klusta/DashboardStats";
import RecentActivity from "@/components/klusta/RecentActivity";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata: Metadata = {
  title: "Dashboard | Klusta Admin",
  description: "Klusta admin dashboard overview",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Dashboard" />
      <DashboardStats />
      <RecentActivity />
    </div>
  );
}
