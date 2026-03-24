import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UsersTable from "@/components/klusta/UsersTable";

export const metadata: Metadata = {
  title: "Regular Users | Klusta Admin",
  description: "Manage regular users",
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Regular Users" />
      <UsersTable />
    </div>
  );
}
