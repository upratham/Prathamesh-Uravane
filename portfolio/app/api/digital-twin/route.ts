import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import path from "path";

import { digitalTwinSystemPrompt } from "@/lib/digitalTwin";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

export const runtime = "nodejs";

function sanitizeAssistantReply(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getGroqApiKey() {
  // First try process.env directly (works on Vercel)
  if (process.env.GROQ_API_KEY) {
    return process.env.GROQ_API_KEY;
  }

  // Fallback: try to read from .env file (for local dev)
  try {
    const rootEnvPath = path.resolve(process.cwd(), "..", ".env");
    if (existsSync(rootEnvPath)) {
      const envFile = readFileSync(rootEnvPath, "utf8");
      const match = envFile.match(/^GROQ_API_KEY\s*=\s*(.+)$/m);
      if (match?.[1]) {
        return match[1].trim().replace(/^['"]|['"]$/g, "");
      }
    }
  } catch (err) {
    // Silently fail and return null if file read fails
  }

  return null;
}

export async function POST(request: Request) {
  const groqApiKey = getGroqApiKey();

  if (!groqApiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is missing from the server environment." },
      { status: 500 },
    );
  }

  let messages: ChatMessage[] = [];

  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    if (Array.isArray(body.messages)) {
      messages = body.messages
        .filter((message) => message && typeof message.content === "string")
        .map((message) => ({
          role: message.role === "assistant" ? "assistant" : "user",
          content: message.content.slice(0, 4000),
        }));
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${groqApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: digitalTwinSystemPrompt,
        },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: "Groq request failed.",
        details: errorText.slice(0, 500),
      },
      { status: response.status },
    );
  }

  let data: { choices?: Array<{ message?: { content?: string } }> } = {};

  try {
    data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
  } catch (parseError) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        error: "Failed to parse Groq response as JSON.",
        details: `Response might be HTML error page: ${errorText.slice(0, 300)}`,
      },
      { status: 502 },
    );
  }

  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    return NextResponse.json({ error: "Empty response from Groq." }, { status: 502 });
  }

  return NextResponse.json({ reply: sanitizeAssistantReply(content) });
}
