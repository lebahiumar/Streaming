'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setVideos(data.data); // Mux API returns assets in a 'data' array
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (loading) return <div>Loading videos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (videos.length === 0) return <div>No videos found. Upload some videos to Mux!</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Mux Video Streaming Platform</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {videos.map((video) => (
          <Link key={video.id} href={`/videos/${video.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s', cursor: 'pointer' }}
                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              {video.playback_ids && video.playback_ids[0] && (
                <img
                  src={`https://image.mux.com/${video.playback_ids[0].id}/thumbnail.jpg?time=0&width=250`}
                  alt={video.id}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: '15px' }}>
                <h2 style={{ fontSize: '1.1em', margin: '0 0 10px 0', color: '#555' }}>Video ID: {video.id}</h2>
                <p style={{ fontSize: '0.9em', color: '#777' }}>Status: {video.status}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}