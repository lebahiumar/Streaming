import Mux from '@mux/mux-node';

export default async function handler(req, res) {
  const { id } = req.query;
  const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });

  try {
    const asset = await mux.video.assets.get(id);
    res.status(200).json(asset);
  } catch (error) {
    console.error(`Error fetching Mux asset with ID ${id}:`, error);
    res.status(500).json({ error: `Failed to fetch video with ID ${id}` });
  }
}