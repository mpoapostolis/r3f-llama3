import { NextRequest, NextResponse } from "next/server";
import ollama from "ollama";

export async function POST(req: NextRequest) {
  const {
    q,
    backStory = `"You are a kind farmer that the demon killed your family and you are seeking revenge"`,
  } = await req.json();

  const xx = await ollama.chat({
    stream: false,
    model: "llama3",
    messages: [
      { role: "system", content: backStory },
      { role: "user", content: q },
    ],
  });
  return NextResponse.json({ message: xx.message.content });
}
