import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ReportsList from "@/components/klusta/ReportsList";

export const metadata: Metadata = {
  title: "Reports | Klusta Admin",
  description: "User and property reports",
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Reports" />
      <ReportsList />
    </div>
  );
}
