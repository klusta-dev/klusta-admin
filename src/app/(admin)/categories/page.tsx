import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CategoriesManager from "@/components/klusta/CategoriesManager";

export const metadata: Metadata = {
  title: "Categories | Klusta Admin",
  description: "Create, update, and delete categories",
};

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Categories" />
      <CategoriesManager />
    </div>
  );
}
