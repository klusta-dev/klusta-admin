import { Metadata } from "next";
import React from "react";
import UserDetailsCard from "@/components/klusta/UserDetailsCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "User | Klusta Admin",
};

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <UserDetailsCard userId={id} />;
}
