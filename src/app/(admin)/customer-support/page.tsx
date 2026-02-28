import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomerSupportList from "@/components/klusta/CustomerSupportList";

export const metadata: Metadata = {
  title: "Customer support | Klusta Admin",
  description: "Support tickets and inquiries",
};

export default function CustomerSupportPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Customer support" />
      <CustomerSupportList />
    </div>
  );
}
