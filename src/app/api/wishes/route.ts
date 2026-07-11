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
  {
    id: "debug-3",
    targetName: "Sangeeta",
    conceptId: "color",
    conceptLabel: "a color",
    prompt: "If Sangeeta were a color, she'd be...",
    answer: "A warm, deep red",
    why: "Bold, full of life, and impossible to ignore in the best way.",
    fromName: "Priya",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "debug-4",
    targetName: "Sangeeta",
    conceptId: "drink",
    conceptLabel: "a drink",
    prompt: "If Sangeeta were a drink, she'd be...",
    answer: "A perfectly brewed cup of masala chai",
    why: "Comforting, a little spicy, and exactly what you need on a hard day.",
    note: "Wishing you the happiest of birthdays!",
    fromName: "Rohan",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: "debug-5",
    targetName: "Sangeeta",
    conceptId: "book",
    conceptLabel: "a book",
    prompt: "If Sangeeta were a book, she'd be...",
    answer: "One you can't put down and read again years later",
    why: "Every conversation with her teaches you something new.",
    fromName: "Ananya",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
  {
    id: "debug-6",
    targetName: "Sangeeta",
    conceptId: "season",
    conceptLabel: "a season",
    prompt: "If Sangeeta were a season, she'd be...",
    answer: "Spring, right when everything starts blooming again",
    why: "She has this way of making things feel new and hopeful.",
    fromName: "Karan",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
  },
  {
    id: "debug-7",
    targetName: "Sangeeta",
    conceptId: "movie",
    conceptLabel: "a movie genre",
    prompt: "If Sangeeta were a movie genre, she'd be...",
    answer: "A heartwarming comedy with a surprisingly deep plot",
    why: "Always laughing, but there's real wisdom behind everything she says.",
    note: "Sending you so much love today.",
    fromName: "Meera",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
  },
  {
    id: "debug-8",
    targetName: "Sangeeta",
    conceptId: "animal",
    conceptLabel: "an animal",
    prompt: "If Sangeeta were an animal, she'd be...",
    answer: "An owl — wise, watchful, and quietly looking out for everyone",
    why: "She notices things about people that most others miss.",
    fromName: "Vikram",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
  },
  {
    id: "debug-9",
    targetName: "Sangeeta",
    conceptId: "time-of-day",
    conceptLabel: "a time of day",
    prompt: "If Sangeeta were a time of day, she'd be...",
    answer: "Early morning, right as the light starts coming in",
    why: "Calm, grounding, and full of quiet possibility.",
    fromName: "Divya",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 192).toISOString(),
  },
  {
    id: "debug-10",
    targetName: "Sangeeta",
    conceptId: "place",
    conceptLabel: "a place",
    prompt: "If Sangeeta were a place, she'd be...",
    answer: "A cozy home that always smells like something good is cooking",
    why: "You always feel welcome and taken care of around her.",
    note: "Happy birthday to someone who makes everyone feel at home!",
    fromName: "Sameer",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 216).toISOString(),
  },
  {
    id: "debug-11",
    targetName: "Sangeeta",
    conceptId: "instrument",
    conceptLabel: "an instrument",
    prompt: "If Sangeeta were an instrument, she'd be...",
    answer: "A piano — capable of every mood, from playful to profound",
    why: "She meets people exactly where they are, every time.",
    fromName: "Neha",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 240).toISOString(),
  },
  {
    id: "debug-12",
    targetName: "Sangeeta",
    conceptId: "song",
    conceptLabel: "a song",
    prompt: "If Sangeeta were a song, she'd be...",
    answer: "A duet that somehow still works as a solo",
    why: "She makes every collaboration feel effortless.",
    fromName: "Priya",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 260).toISOString(),
  },
  {
    id: "debug-13",
    targetName: "Sangeeta",
    conceptId: "Song",
    conceptLabel: "a song",
    prompt: "If Sangeeta were a song, she'd be...",
    answer: "The one that plays when the credits roll and you're not ready to leave",
    why: "She lingers with you long after the moment's over.",
    fromName: "priya",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 280).toISOString(),
  },
  {
    id: "debug-14",
    targetName: "Sangeeta",
    conceptId: "color",
    conceptLabel: "a color",
    prompt: "If Sangeeta were a color, she'd be...",
    answer: "A soft gold that catches the light just right",
    why: "There's a warmth to her that's hard to describe but easy to feel.",
    fromName: "PRIYA",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 300).toISOString(),
  },
  {
    id: "debug-15",
    targetName: "Sangeeta",
    conceptId: "drink",
    conceptLabel: "a drink",
    prompt: "If Sangeeta were a drink, she'd be...",
    answer: "A cold brew that somehow still feels cozy",
    why: "Chill on the surface, but there's real depth once you get to know her.",
    fromName: "rohan",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 320).toISOString(),
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
