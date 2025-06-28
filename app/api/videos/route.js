import Mux from '@mux/mux-node';
import { NextResponse } from 'next/server';

export async function GET() {
  const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });

  try {
    const assets = await mux.video.assets.list();
    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching Mux assets:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}