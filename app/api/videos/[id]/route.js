import Mux from '@mux/mux-node';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });

  try {
    const asset = await mux.video.assets.get(id);
    return NextResponse.json(asset);
  } catch (error) {
    console.error(`Error fetching Mux asset with ID ${id}:`, error);
    return NextResponse.json({ error: `Failed to fetch video with ID ${id}` }, { status: 500 });
  }
}