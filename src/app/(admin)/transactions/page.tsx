import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BookingsList from "@/components/klusta/BookingsList";

export const metadata: Metadata = {
  title: "Bookings | Klusta Admin",
  description: "View and manage all bookings",
};

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Bookings" />
      <BookingsList />
    </div>
  );
}
