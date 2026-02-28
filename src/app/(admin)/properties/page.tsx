import { Metadata } from "next";
import React from "react";
import PropertyListingCards from "@/components/klusta/PropertyListingCards";

export const metadata: Metadata = {
  title: "Properties | Klusta Admin",
  description: "Property listings",
};

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <PropertyListingCards />
    </div>
  );
}
