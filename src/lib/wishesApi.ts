import type { CreateWishInput, WishEntry } from "@/types/wish";

export async function getWishes(): Promise<WishEntry[]> {
  // TODO: Replace this fetch with the real backend GET endpoint when available.
  const response = await fetch("/api/wishes", { method: "GET", cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch wishes");
  return response.json();
}

export async function createWish(input: CreateWishInput): Promise<WishEntry> {
  // TODO: Replace this placeholder POST with the real backend endpoint when available.
  const formData = new FormData();
  formData.append("targetName", input.targetName);
  formData.append("conceptId", input.conceptId);
  formData.append("conceptLabel", input.conceptLabel);
  formData.append("prompt", input.prompt);
  formData.append("answer", input.answer);
  formData.append("fromName", input.fromName);
  if (input.note) formData.append("note", input.note);
  if (input.image) formData.append("image", input.image);

  const response = await fetch("/api/wishes", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to create wish");
  return response.json();
}
