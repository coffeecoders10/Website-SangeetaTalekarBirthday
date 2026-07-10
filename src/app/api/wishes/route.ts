import { NextResponse } from "next/server";
import type { CreateWishInput, WishEntry } from "@/types/wish";

const DICTIONARY_ID = "birthday_montage";
const RECORD_ID = "1";

function isDebug() {
  return process.env.DEBUG === "true";
}

const FAKE_WISHES: WishEntry[] = [
  {
    id: "debug-1",
    targetName: "Sangeeta",
    conceptId: "song",
    conceptLabel: "a song",
    prompt: "If Sangeeta were a song, she'd be...",
    answer: "A feel-good anthem that gets stuck in your head for days",
    why: "Because she brings that same energy into every room she walks into.",
    note: "Happy birthday! Hope your day is as bright as you are.",
    fromName: "Debug User",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "debug-2",
    targetName: "Sangeeta",
    conceptId: "weather",
    conceptLabel: "weather",
    prompt: "If Sangeeta were weather, she'd be...",
    answer: "Golden hour sunlight after a long day",
    why: "Warm, comforting, and always makes things feel a little better.",
    fromName: "Another Friend",
    createdAt: new Date().toISOString(),
  },
];

function getConfig() {
  const baseUrl = process.env.API_BASE_URL;
  const token = process.env.API_BEARER_TOKEN;
  if (!baseUrl || !token) return null;
  return {
    url: `${baseUrl}/flask_api/db_query/${DICTIONARY_ID}/${RECORD_ID}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

async function fetchWishes(url: string, headers: HeadersInit): Promise<WishEntry[]> {
  const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
  if (!res.ok) {
    if (res.status === 404) return [];
    throw new Error(`Failed to fetch wishes (${res.status})`);
  }

  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.wishes)) return data.wishes;
  if (Array.isArray(data?.value)) return data.value;
  return [];
}

export async function GET() {
  if (isDebug()) {
    return NextResponse.json(FAKE_WISHES);
  }

  const config = getConfig();
  if (!config) {
    return NextResponse.json({ error: "API configuration missing" }, { status: 500 });
  }

  try {
    const wishes = await fetchWishes(config.url, config.headers);
    return NextResponse.json(wishes);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const input = (await request.json()) as CreateWishInput;

  const entry: WishEntry = {
    id: crypto.randomUUID(),
    targetName: input.targetName,
    conceptId: input.conceptId,
    conceptLabel: input.conceptLabel,
    prompt: input.prompt,
    answer: input.answer,
    why: input.why,
    note: input.note || undefined,
    fromName: input.fromName || "Anonymous",
    createdAt: new Date().toISOString(),
  };

  if (isDebug()) {
    return NextResponse.json(entry, { status: 201 });
  }

  const config = getConfig();
  if (!config) {
    return NextResponse.json({ error: "API configuration missing" }, { status: 500 });
  }

  try {
    // Always pull the most recent blob before appending, to avoid overwriting
    // wishes submitted by others since we last read.
    const existingWishes = await fetchWishes(config.url, config.headers);
    const updatedWishes = [...existingWishes, entry];

    const res = await fetch(config.url, {
      method: "PUT",
      headers: config.headers,
      body: JSON.stringify(updatedWishes),
    });

    if (!res.ok) {
      throw new Error(`Failed to save wish (${res.status})`);
    }

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
