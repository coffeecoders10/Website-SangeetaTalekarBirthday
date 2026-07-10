import { NextResponse } from "next/server";
import type { CreateWishInput, WishEntry } from "@/types/wish";

const DICTIONARY_ID = "birthday_montage";
const RECORD_ID = "1";

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
  const config = getConfig();
  if (!config) {
    return NextResponse.json({ error: "API configuration missing" }, { status: 500 });
  }

  try {
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
