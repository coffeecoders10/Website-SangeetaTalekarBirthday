import type { CreateWishInput, WishEntry } from "@/types/wish";

export async function getWishes(): Promise<WishEntry[]> {
  // TODO: Replace this fetch with the real backend GET endpoint when available.
  const response = await fetch("/api/wishes", { method: "GET", cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch wishes");
  return response.json();
}

export async function createWish(input: CreateWishInput): Promise<WishEntry> {
  const response = await fetch("/api/wishes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error("Failed to create wish");
  return response.json();
}
