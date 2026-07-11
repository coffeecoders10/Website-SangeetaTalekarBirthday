import type { CreateWishInput, WishEntry } from "@/types/wish";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE ?? "";

export async function getWishes(): Promise<WishEntry[]> {
  const response = await fetch(`${API_ROUTE}/api/wishes`, { method: "GET", cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch wishes");
  return response.json();
}

export async function createWish(input: CreateWishInput): Promise<WishEntry> {
  const response = await fetch(`${API_ROUTE}/api/wishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error("Failed to create wish");
  return response.json();
}
