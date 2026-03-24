import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NotificationsList from "@/components/klusta/NotificationsList";

export const metadata: Metadata = {
  title: "Notifications | Klusta Admin",
  description: "View platform notifications",
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Notifications" />
      <NotificationsList />
    </div>
  );
}
