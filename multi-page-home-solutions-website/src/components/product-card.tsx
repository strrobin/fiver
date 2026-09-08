"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Stars, Badge } from "./ui";
import { AddToCart, WishlistButton } from "./cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const hasBadge = product.badge || product.isNew;
  return (
    <div className={cn("group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream transition-all duration-300 hover:shadow-lift", className)}>
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block aspect-[4/5] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {hasBadge ? (
            <Badge tone={product.badge === "Coming soon" ? "charcoal" : "olive"}>
              {product.badge ?? "New"}
            </Badge>
          ) : null}
        </div>

        <div className="absolute right-3 top-3">
          <WishlistButton slug={product.slug} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/product/${product.slug}`} className="text-xs font-semibold uppercase tracking-wide text-olive-2">
          {product.categoryName}
        </Link>
        <Link href={`/product/${product.slug}`} className="mt-1 font-serif text-lg leading-snug text-charcoal transition-colors group-hover:text-olive-2">
          {product.name}
        </Link>
        {product.priceUnit ? <p className="mt-0.5 text-xs text-ink-3">{product.priceUnit}</p> : null}

        <div className="mt-2 flex items-center gap-1.5">
          <Stars rating={product.rating} size={13} />
          <span className="text-xs text-ink-3">({product.reviewCount})</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-xl text-charcoal">{formatPrice(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-sm text-ink-3 line-through">{formatPrice(product.compareAtPrice)}</span>
          ) : null}
        </div>

        <div className="mt-auto pt-4 flex items-center gap-2">
          <AddToCart product={product} size="sm" className="flex-1" />
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex h-9 items-center justify-center rounded-full border border-line px-3 text-xs font-medium text-charcoal hover:border-olive hover:text-olive-2"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
