import { NextResponse } from "next/server";
import { PERSON_PROFILE } from "@/config/person";
import type { WishEntry } from "@/types/wish";

// TODO: Replace this in-memory mock list with a real database fetch.
const mockWishes: WishEntry[] = [
  {
    id: "mock-1",
    targetName: PERSON_PROFILE.name,
    conceptId: "season",
    conceptLabel: "season",
    prompt: `If ${PERSON_PROFILE.name} were a season, what would ${PERSON_PROFILE.pronouns.subject} be?`,
    answer: "Spring after a long winter",
    why: "Because you always bring warmth after the hardest stretches.",
    note: "The kind that makes everything feel possible again.",
    fromName: "A friend",
    imageUrl: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "mock-2",
    targetName: PERSON_PROFILE.name,
    conceptId: "color",
    conceptLabel: "color",
    prompt: `If ${PERSON_PROFILE.name} were a color, what would ${PERSON_PROFILE.pronouns.subject} be?`,
    answer: "The color of sunlight on a kitchen wall",
    why: "Warm, golden, and impossible not to smile at.",
    fromName: "Someone who loves you",
    imageUrl: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "mock-3",
    targetName: PERSON_PROFILE.name,
    conceptId: "animal",
    conceptLabel: "animal",
    prompt: `If ${PERSON_PROFILE.name} were an animal, what would ${PERSON_PROFILE.pronouns.subject} be?`,
    answer: "A golden retriever with old-soul eyes",
    why: "Loyal to a fault and always the first to greet you.",
    note: "Loyal, warm, and always happy to see you at the door.",
    fromName: "The kids",
    imageUrl: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "mock-4",
    targetName: PERSON_PROFILE.name,
    conceptId: "bird",
    conceptLabel: "bird",
    prompt: `If ${PERSON_PROFILE.name} were a bird, what would ${PERSON_PROFILE.pronouns.subject} be?`,
    answer: "A hummingbird, always in motion, never missing a beat",
    why: "You never sit still and somehow keep everyone else energized too.",
    fromName: "A cousin",
    imageUrl: "",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

export async function GET() {
  // TODO: Replace with real database fetch.
  return NextResponse.json(mockWishes);
}

export async function POST(request: Request) {
  // TODO: Replace with real multipart parsing, validation, image storage, and database insert.
  const formData = await request.formData();

  const entry: WishEntry = {
    id: crypto.randomUUID(),
    targetName: String(formData.get("targetName") ?? PERSON_PROFILE.name),
    conceptId: String(formData.get("conceptId") ?? "unknown"),
    conceptLabel: String(formData.get("conceptLabel") ?? "thing"),
    prompt: String(formData.get("prompt") ?? ""),
    answer: String(formData.get("answer") ?? ""),
    why: String(formData.get("why") ?? ""),
    note: String(formData.get("note") ?? "") || undefined,
    fromName: String(formData.get("fromName") ?? "Anonymous"),
    imageUrl: "",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(entry, { status: 201 });
}
