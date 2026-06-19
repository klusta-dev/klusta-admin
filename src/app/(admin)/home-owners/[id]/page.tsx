import { Metadata } from "next";
import React from "react";
import HomeOwnerDetailsContent from "@/components/klusta/HomeOwnerDetailsContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Home Owner ${id.slice(0, 8)} | Klusta Admin`,
  };
}

export default async function HomeOwnerDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <HomeOwnerDetailsContent userId={id} />;
}
