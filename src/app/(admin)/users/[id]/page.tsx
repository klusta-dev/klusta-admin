import { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { mockUsers } from "@/data/mock";
import UserDetailsCard from "@/components/klusta/UserDetailsCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);
  return {
    title: user ? `${user.name} | Klusta Admin` : "User | Klusta Admin",
  };
}

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const user = mockUsers.find((u) => u.id === id);
  if (!user) notFound();

  return <UserDetailsCard user={user} />;
}
