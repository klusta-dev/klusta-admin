import { Metadata } from "next";
import PropertyDetailContent from "@/components/klusta/PropertyDetailContent";

interface PageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Property | Klusta Admin",
};

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params);
  return <PropertyDetailContent id={id} />;
}
