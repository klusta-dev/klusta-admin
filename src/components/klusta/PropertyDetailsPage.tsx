"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ChevronLeftIcon } from "@/icons";
import AmenityIcon from "@/components/klusta/AmenityIcon";
import PropertyDetailsStickyBar from "@/components/klusta/PropertyDetailsStickyBar";
import { useProperty } from "@/lib/api/hooks";
import { normalizeProperty } from "@/lib/api/normalize";
import { formatAmount } from "@/lib/format";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const starPath =
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="size-4 shrink-0" viewBox="0 0 20 20">
          {i < full ? (
            <path fill="currentColor" d={starPath} />
          ) : i === full && half ? (
            <path fill="currentColor" d={starPath} opacity={0.6} />
          ) : (
            <path fill="rgb(229 231 235)" d={starPath} className="dark:fill-gray-700" />
          )}
        </svg>
      ))}
    </span>
  );
}

interface PropertyDetailsPageProps {
  id: string;
}

export default function PropertyDetailsPage({ id }: PropertyDetailsPageProps) {
  const { data, isLoading } = useProperty(id);
  const property = normalizeProperty(data?.data, 0);

  if (isLoading) {
    return <div className="px-4 py-8 text-theme-sm text-gray-500 dark:text-gray-400">Loading property...</div>;
  }

  if (!data?.data || !property.id || property.id.startsWith("property-")) {
    return <div className="px-4 py-8 text-theme-sm text-gray-500 dark:text-gray-400">Property not found.</div>;
  }

  const images = property.images?.length ? property.images : property.image ? [property.image] : [];
  const reviews = property.reviews;
  const avgReviewRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const rating = property.rating ?? avgReviewRating;
  const reviewCount = property.reviewCount ?? reviews.length;

  return (
    <div className="min-h-screen bg-white pb-24 dark:bg-gray-900">
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-3 md:px-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-theme-sm font-medium text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-50"
          >
            <ChevronLeftIcon className="size-4" />
            Back to Property listings
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-6 md:px-6">
        <div className="flex gap-2 overflow-hidden rounded-2xl">
          <div className="relative aspect-[4/3] min-h-[240px] flex-1 bg-gray-200 dark:bg-gray-800">
            {images[0] ? (
              <Image
                src={images[0]}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">-</div>
            )}
          </div>
          {images[1] && (
            <div className="relative hidden aspect-[4/3] w-[280px] shrink-0 bg-gray-200 dark:bg-gray-800 md:block">
              <Image src={images[1]} alt="" fill className="object-cover" sizes="280px" />
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-typography dark:text-white/90 sm:text-2xl">{property.title}</h1>
            <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{property.address}, {property.city}</p>
          </div>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            {reviewCount > 0 && (
              <div className="flex items-center gap-1.5">
                <StarRating rating={rating} />
                <span className="text-theme-sm text-gray-600 dark:text-gray-300">
                  {rating.toFixed(1)} ({reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1)}k` : reviewCount} reviews)
                </span>
              </div>
            )}
            <p className="text-lg font-semibold text-primary dark:text-primary-50">{formatAmount(property.price)}</p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-base font-semibold text-typography dark:text-white/90">Description</h2>
          <p className="mt-2 text-theme-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {property.description ?? "No description provided."}
          </p>
        </section>

        {property.amenities.length > 0 && (
          <section className="mt-8">
            <h2 className="text-base font-semibold text-typography dark:text-white/90">Amenities</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {property.amenities.map((name) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50/50 py-4 dark:border-gray-700 dark:bg-gray-800/50"
                >
                  <AmenityIcon name={name} className="text-primary dark:text-primary-50" />
                  <span className="text-theme-xs font-medium text-typography dark:text-white/90">{name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {property.groundRules.length > 0 && (
          <section className="mt-8">
            <h2 className="text-base font-semibold text-typography dark:text-white/90">Ground Rules</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-theme-sm text-gray-600 dark:text-gray-300">
              {property.groundRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>
        )}

        {property.safetyItems.length > 0 && (
          <section className="mt-8">
            <h2 className="text-base font-semibold text-typography dark:text-white/90">Safety items</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-theme-sm text-gray-600 dark:text-gray-300">
              {property.safetyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {(property.homeownerName || property.ownerEmail || property.ownerPhone) && (
          <section className="mt-8">
            <h2 className="text-base font-semibold text-typography dark:text-white/90">Property owner</h2>
            <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/50">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-theme-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Name</p>
                  <p className="mt-1 text-theme-sm font-medium text-typography dark:text-white/90">
                    {property.homeownerName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-theme-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Email</p>
                  <p className="mt-1 text-theme-sm font-medium text-typography dark:text-white/90">
                    {property.ownerEmail || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-theme-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="mt-1 text-theme-sm font-medium text-typography dark:text-white/90">
                    {property.ownerPhone || "-"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-typography dark:text-white/90">Reviews to apartment</h2>
            {reviewCount > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={rating} />
                <span className="text-theme-sm text-gray-600 dark:text-gray-300">
                  {rating.toFixed(1)} ({reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1)}k` : reviewCount} reviews)
                </span>
              </div>
            )}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    {review.userAvatar ? (
                      <Image src={review.userAvatar} alt={review.userName} width={40} height={40} className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-500">{review.userName.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-typography dark:text-white/90">{review.userName}</p>
                    <div className="flex items-center gap-2 text-theme-xs text-gray-500 dark:text-gray-400">
                      <StarRating rating={review.rating} />
                      {review.timeAgo && <span>{new Date(review.timeAgo).toLocaleDateString()}</span>}
                    </div>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-theme-sm text-gray-600 dark:text-gray-300">{review.text}</p>
              </div>
            ))}
          </div>
          {reviews.length === 0 && (
            <p className="mt-4 text-theme-sm text-gray-500 dark:text-gray-400">No reviews yet.</p>
          )}
        </section>
      </div>

      <PropertyDetailsStickyBar
        propertyId={property.id}
        propertyTitle={property.title}
        status={property.status}
        price={formatAmount(property.price)}
        negotiable={property.negotiable}
      />
    </div>
  );
}
