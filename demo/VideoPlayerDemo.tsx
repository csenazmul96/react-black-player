import React from 'react';
import { ReactBlackPlayer } from 'react-black-player';
import type { VideoSource, PlaylistItem } from 'react-black-player/dist/types';

const VideoPlayerDemo: React.FC = () => {
  // Define your video sources with quality, individual poster, and aspect ratio
  const videoSources: VideoSource[] = [
    {
      src: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      type: 'application/x-mpegURL', // HLS stream
      quality: 'auto', // HLS typically handles quality switching automatically
      poster: 'https://davidani.com/api/storage/items/2025-10-17/compressed/hls_poster.webp', // Specific poster for HLS
      aspectRatio: '16/9', // Specific aspect ratio for this source
    },
    {
      src: '/file_example_MOV_640_800kB.mov', // Local video file
      type: 'video/mp4',
      quality: '480p',
      poster: 'https://davidani.com/api/storage/items/2025-10-17/compressed/480p_poster.webp', // Specific poster for 480p
      aspectRatio: '4/3', // Specific aspect ratio for this source
    },
    {
      src: 'sample_960x400_ocean_with_audio.mkv', // Another local video file
      type: 'video/mp4',
      quality: '360p',
      // No specific poster for this source, will fall back to main poster prop
      // No specific aspect ratio, will fall back to main aspectRatio prop or video metadata
    },
  ];

  // Example subtitles (optional)
  const subtitles = [
    { src: '/subtitles/english.vtt', srclang: 'en', label: 'English', default: true },
    { src: '/subtitles/spanish.vtt', srclang: 'es', label: 'Spanish' },
  ];

  // Example playlist (optional)
  const playlist: PlaylistItem[] = [
    {
      id: '1',
      title: 'Art of Motion',
      thumbnail: 'https://davidani.com/api/storage/items/2025-10-17/compressed/thumb1.webp',
      sources: [
        { src: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8', type: 'application/x-mpegURL', quality: 'auto' },
      ],
      subtitles: [
        { src: '/subtitles/english.vtt', srclang: 'en', label: 'English', default: true },
      ],
    },
    {
      id: '2',
      title: 'Local 480p Video',
      thumbnail: 'https://davidani.com/api/storage/items/2025-10-17/compressed/thumb2.webp',
      sources: [
        { src: '/file_example_MOV_640_800kB.mov', type: 'video/mp4', quality: '480p', poster: 'https://davidani.com/api/storage/items/2025-10-17/compressed/480p_playlist_poster.webp' },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', border: '1px solid #ccc', padding: '10px' }}>
      <h2>React Black Player - Sources Prop Demo</h2>
      <p>This example demonstrates how to use the `sources` prop with individual `poster` and `aspectRatio` settings.</p>
      <p>Try changing video qualities to see the poster and aspect ratio update dynamically.</p>

      <ReactBlackPlayer
        sources={videoSources} // Pass the array of video sources
        subtitles={subtitles}
        poster="https://davidani.com/api/storage/items/2025-10-17/compressed/main_fallback_poster.webp" // Main fallback poster
        playlist={playlist}
        autoPlay={false}
        muted={false}
        loop={false}
        preload="metadata"
        width="100%"
        height="auto"
        aspectRatio="16/9" // Main fallback aspect ratio
        controls={{
          time: true,
          volume: true,
          settings: true,
          quality: true,
          subtitles: true,
          playlist: true,
          nextPrev: true,
          pictureInPicture: true,
          hideController: false,
        }}
        // You can also pass custom icons here if needed
        // icons={myCustomIcons}
      />

      <h3>Explanation:</h3>
      <ul>
        <li>Each object in the `sources` array can now have its own `poster` and `aspectRatio` properties.</li>
        <li>When a video source is selected (e.g., by changing quality or playlist item), the player will first try to use the `poster` and `aspectRatio` defined within that specific `VideoSource` object.</li>
        <li>If a `VideoSource` does not have its own `poster` or `aspectRatio` defined, the player will fall back to the `poster` and `aspectRatio` props provided directly to the `ReactBlackPlayer` component.</li>
        <li>If neither a source-specific nor a main `poster` is provided, no poster will be shown.</li>
        <li>If neither a source-specific nor a main `aspectRatio` is provided, the player will attempt to determine the aspect ratio from the video metadata once loaded.</li>
      </ul>
    </div>
  );
};

export default VideoPlayerDemo;
