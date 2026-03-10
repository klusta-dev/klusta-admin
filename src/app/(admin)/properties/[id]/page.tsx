import { Metadata } from "next";
import PropertyDetailContent from "@/components/klusta/PropertyDetailContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Property | Klusta Admin",
};

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return <PropertyDetailContent id={id} />;
}
