"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

const storageKey = "miraya-collection-wishlist";
const changeEvent = "miraya-wishlist-change";
type WishlistProduct = { id: string; image?: string; gallery?: string[] };

export function parseWishlist(value: string | null): string[] {
  try {
    const items: unknown = JSON.parse(value || "[]");
    return Array.isArray(items) ? [...new Set(items.filter((item): item is string => typeof item === "string" && Boolean(item.trim())))] : [];
  } catch {
    return [];
  }
}

export function isWishlisted(items: string[], product: WishlistProduct) {
  return items.includes(product.id) || Boolean(product.image && items.includes(product.image)) || Boolean(product.gallery?.some((image) => items.includes(image)));
}

function getSnapshot() {
  try { return window.localStorage.getItem(storageKey) || "[]"; }
  catch { return "[]"; }
}

function subscribe(notify: () => void) {
  const onStorage = (event: StorageEvent) => { if (event.key === storageKey || event.key === null) notify(); };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, notify);
  };
}

const getServerSnapshot = () => null;

export function useWishlist() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => parseWishlist(snapshot), [snapshot]);
  const [error, setError] = useState("");

  function toggle(product: WishlistProduct) {
    try {
      const current = parseWishlist(getSnapshot());
      const next = isWishlisted(current, product)
        ? current.filter((item) => item !== product.id && item !== product.image && !product.gallery?.includes(item))
        : [...current, product.id];
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      window.dispatchEvent(new Event(changeEvent));
      setError("");
    } catch {
      setError("Could not save your wishlist in this browser. Please allow local storage and try again.");
    }
  }

  return { items, ready: snapshot !== null, isSaved: (product: WishlistProduct) => isWishlisted(items, product), toggle, error };
}
