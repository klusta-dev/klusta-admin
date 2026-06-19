import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PlatformSettings from "@/components/klusta/PlatformSettings";

export const metadata: Metadata = {
  title: "Settings | Klusta Admin",
  description: "Platform configuration and settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Settings" />
      <PlatformSettings />
    </div>
  );
}
