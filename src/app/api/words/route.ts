// app/api/words/route.ts

import { NextRequest, NextResponse } from 'next/server';
import client from '../../../lib/cassandra';

// Function to retrieve all words
const getAllWords = async () => {
  const query = 'SELECT * FROM words';
  const result = await client.execute(query);
  return result.rows;
};

// Function to create a new word
const createWord = async (word: string) => {
  const query = 'INSERT INTO words (word) VALUES (?)';
  await client.execute(query, [word], { prepare: true });
};

export async function GET(request: NextRequest) {
  try {
    const words = await getAllWords();
    return NextResponse.json(words);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { word } = await request.json();
    if (!word) {
      return NextResponse.json({ error: 'Word is required' }, { status: 400 });
    }
    await createWord(word);
    return NextResponse.json({ word }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
