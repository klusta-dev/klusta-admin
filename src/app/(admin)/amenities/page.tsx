import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AmenitiesManager from "@/components/klusta/AmenitiesManager";

export const metadata: Metadata = {
  title: "Amenities | Klusta Admin",
  description: "Create, update, and delete amenities",
};

export default function AmenitiesPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Amenities" />
      <AmenitiesManager />
    </div>
  );
}
