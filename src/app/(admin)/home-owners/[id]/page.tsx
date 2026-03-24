import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { HOME_OWNERS } from "@/lib/mock/home-owners";
import HomeOwnerDetailsContent from "@/components/klusta/HomeOwnerDetailsContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const owner = HOME_OWNERS.find((item) => item.id === id);
  return {
    title: owner ? `${owner.name} | Home Owner` : "Home Owner Details",
  };
}

export default async function HomeOwnerDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const owner = HOME_OWNERS.find((item) => item.id === id);

  if (!owner) notFound();

  return <HomeOwnerDetailsContent owner={owner} />;
}
