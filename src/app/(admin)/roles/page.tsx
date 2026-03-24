import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RolesList from "@/components/klusta/RolesList";

export const metadata: Metadata = {
  title: "Roles | Klusta Admin",
  description: "Manage roles",
};

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Roles" />
      <RolesList />
    </div>
  );
}
