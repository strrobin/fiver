"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import type { CartLine, Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

const CART_KEY = "havenwell.cart.v1";
const WISH_KEY = "havenwell.wishlist.v1";

interface CartContextValue {
  items: CartLine[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
  isInCart: (slug: string) => boolean;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
      const w = localStorage.getItem(WISH_KEY);
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {
      /* ignore */
    }
  }, [wishlist, loaded]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productSlug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.productSlug === product.slug ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          productSlug: product.slug,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.images[0],
          quantity,
          unit: product.priceUnit,
          categoryName: product.categoryName,
        },
      ];
    });
    setOpenCart(true);
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.productSlug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.productSlug !== slug)
        : prev.map((i) => (i.productSlug === slug ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const isWishlisted = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);
  const isInCart = useCallback((slug: string) => items.some((i) => i.productSlug === slug), [items]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      count,
      isInCart,
      wishlist,
      toggleWishlist,
      isWishlisted,
      openCart,
      setOpenCart,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, subtotal, count, isInCart, wishlist, toggleWishlist, isWishlisted, openCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ---------- Action components ----------

export function Quantity({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "md";
}) {
  const btn = cn(
    "inline-flex items-center justify-center text-charcoal transition-colors hover:bg-ink/5 disabled:opacity-40",
    size === "sm" ? "h-8 w-8" : "h-10 w-10"
  );
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-cream",
        size === "sm" ? "h-9" : "h-11"
      )}
    >
      <button type="button" className={btn} onClick={() => onChange(value - 1)} aria-label="Decrease quantity">
        <Icon name="minus" size={16} />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-charcoal">{value}</span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}

export function AddToCart({
  product,
  quantity = 1,
  size = "md",
  variant = "primary",
  block,
  className,
}: {
  product: Product;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  block?: boolean;
  className?: string;
}) {
  const { addItem } = useCart();
  return (
    <Button
      onClick={() => addItem(product, quantity)}
      variant={variant}
      size={size}
      icon="cart"
      className={cn(block && "w-full", className)}
    >
      Add to cart
    </Button>
  );
}

export function WishlistButton({ slug, className }: { slug: string; className?: string }) {
  const { isWishlisted, toggleWishlist } = useCart();
  const active = isWishlisted(slug);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => toggleWishlist(slug)}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border bg-cream text-charcoal transition-all hover:border-clay/50 hover:text-clay",
        active && "text-clay",
        className
      )}
    >
      <Icon name={active ? "heartFilled" : "heart"} size={18} />
    </button>
  );
}

export function CartDrawer() {
  const { items, openCart, setOpenCart, subtotal, updateQuantity, removeItem, count } = useCart();

  if (!openCart) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={() => setOpenCart(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-xl text-charcoal">Your cart</h2>
          <button
            onClick={() => setOpenCart(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-ink/5"
            aria-label="Close cart"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone text-olive">
              <Icon name="cart" size={28} />
            </span>
            <p className="font-serif text-xl text-charcoal">Your cart is empty</p>
            <p className="text-sm text-ink-2">Explore our products and find something for your home.</p>
            <Button href="/products" variant="primary" size="md">
              Explore products
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((i) => (
                <div key={i.productSlug} className="flex gap-4">
                  <img src={i.image} alt={i.name} className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{i.name}</p>
                        {i.unit ? <p className="text-xs text-ink-3">{i.unit}</p> : null}
                      </div>
                      <button
                        onClick={() => removeItem(i.productSlug)}
                        className="text-ink-3 hover:text-clay"
                        aria-label={`Remove ${i.name}`}
                      >
                        <Icon name="close" size={16} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <Quantity value={i.quantity} onChange={(v) => updateQuantity(i.productSlug, v)} size="sm" />
                      <span className="text-sm font-semibold text-charcoal">
                        {formatPrice(i.price * i.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-2">Subtotal ({count} items)</span>
                <span className="font-serif text-lg text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-ink-3">Delivery calculated at checkout. Taxes included.</p>
              <div className="mt-4 grid gap-2">
                <Button href="/checkout" variant="primary" size="lg" icon="arrowRight" className="w-full">
                  Proceed to checkout
                </Button>
                <Button href="/products" variant="ghost" size="md" className="w-full">
                  Continue shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
