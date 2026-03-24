import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PendingPropertiesList from "@/components/klusta/PendingPropertiesList";

export const metadata: Metadata = {
  title: "Pending Properties | Klusta Admin",
  description: "Review pending property listings",
};

export default function PendingPropertiesPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Pending Properties" />
      <PendingPropertiesList />
    </div>
  );
}
