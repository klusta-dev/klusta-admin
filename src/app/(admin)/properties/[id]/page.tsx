import type { Metadata } from "next";
import React from "react";
import PropertyDetailsPage from "@/components/klusta/PropertyDetailsPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Property | Klusta Admin",
};

export default async function PropertyDetailsRoute({ params }: PageProps) {
  const { id } = await params;
  return <PropertyDetailsPage id={id} />;
}
