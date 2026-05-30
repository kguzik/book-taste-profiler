import { NextResponse } from 'next/server';
import type { SavedBook, TasteProfileResponse } from '@/types/book';
import { buildTasteProfilePrompt, MIN_BOOKS_FOR_PROFILE } from '@/data/taste-profile';

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
  }

  let books: SavedBook[];
  try {
    const body = await request.json();
    books = body.books;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!Array.isArray(books) || books.length < MIN_BOOKS_FOR_PROFILE) {
    return NextResponse.json(
      { error: `At least ${MIN_BOOKS_FOR_PROFILE} books are required` },
      { status: 400 },
    );
  }

  const prompt = buildTasteProfilePrompt(books);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'OpenAI request failed' }, { status: 502 });
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    return NextResponse.json({ error: 'Empty response from OpenAI' }, { status: 502 });
  }

  let parsed: TasteProfileResponse;
  try {
    parsed = JSON.parse(content);
  } catch {
    return NextResponse.json({ error: 'Failed to parse OpenAI response' }, { status: 502 });
  }

  if (
    typeof parsed.summary !== 'string' ||
    !Array.isArray(parsed.recommendations)
  ) {
    return NextResponse.json({ error: 'Unexpected response shape from OpenAI' }, { status: 502 });
  }

  return NextResponse.json(parsed);
}
