import Mux from '@mux/mux-node';

export default async function handler(req, res) {
  const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });

  try {
    const assets = await mux.video.assets.list();
    res.status(200).json(assets);
  } catch (error) {
    console.error('Error fetching Mux assets:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}