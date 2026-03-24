import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import HomeOwnersOverview from "@/components/klusta/HomeOwnersOverview";

export const metadata: Metadata = {
  title: "Home Owners | Klusta Admin",
  description: "Home owners transactions, withdrawals, and properties",
};

export default function HomeOwnersPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Home Owners" />
      <HomeOwnersOverview />
    </div>
  );
}
