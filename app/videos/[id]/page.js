'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import for useRouter
import MuxPlayer from '@mux/mux-player-react';
import Link from 'next/link'; // Added Link import

export default function VideoPage() {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchVideo() {
        try {
          const res = await fetch(`/api/video/${id}`);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          setVideo(data);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }
      fetchVideo();
    }
  }, [id]);

  if (loading) return <div>Loading video...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!video) return <div>Video not found.</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Video Details</h1>
      {video.playback_ids && video.playback_ids[0] && (
        <div style={{ marginBottom: '20px' }}>
          <MuxPlayer
            playbackId={video.playback_ids[0].id}
            metadata={{
              video_id: video.id,
              video_title: `Video ID: ${video.id}`,
              viewer_user_id: 'user-123', // Replace with actual user ID
            }}
            autoPlay
            controls
            streamType="on-demand"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.5em', margin: '0 0 10px 0', color: '#555' }}>Video ID: {video.id}</h2>
        <p><strong>Status:</strong> {video.status}</p>
        <p><strong>Duration:</strong> {video.duration ? `${video.duration.toFixed(2)} seconds` : 'N/A'}</p>
        <p><strong>Aspect Ratio:</strong> {video.aspect_ratio || 'N/A'}</p>
        <p><strong>Created At:</strong> {new Date(video.created_at).toLocaleString()}</p>
        <p><strong>Max Resolution:</strong> {video.max_stored_resolution || 'N/A'}</p>
        <p><strong>Max Frame Rate:</strong> {video.max_frame_rate || 'N/A'}</p>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link href="/" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}