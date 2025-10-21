/**
 * 🎥 HOW TO USE YOUR OWN VIDEO WITH ABR
 * 
 * Replace the src URL with your own HLS stream and test!
 */

import React from 'react';
import { ReactBlackPlayer } from 'react-black-player';
import type { VideoSource, PlaylistItem } from 'react-black-player';

// ============================================
// EXAMPLE 1: Single HLS Stream
// ============================================
const YourSingleVideoExample = () => {
  const yourVideoSource: VideoSource[] = [
    {
      // 👇 REPLACE THIS WITH YOUR HLS STREAM URL
      src: 'https://your-domain.com/path/to/your-video/playlist.m3u8',
      
      type: 'application/x-mpegURL', // Required for HLS
      quality: 'auto', // Start with auto quality
      poster: 'https://your-domain.com/poster.jpg', // Optional poster image
      aspectRatio: '16/9', // Optional aspect ratio
    },
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '50px auto' }}>
      <h1>Your Video with ABR</h1>
      
      <ReactBlackPlayer
        sources={yourVideoSource}
        controls={{
          quality: true,    // ✅ Enable quality selector
          settings: true,   // ✅ Enable settings menu
          volume: true,
          time: true,
          pictureInPicture: true,
        }}
        autoPlay={false}
        muted={false}
        width="100%"
        height="auto"
        aspectRatio="16/9"
        onQualityChange={(quality) => {
          console.log('✅ Quality changed to:', quality);
        }}
        onError={(error) => {
          console.error('❌ Error loading video:', error);
        }}
      />
    </div>
  );
};

// ============================================
// EXAMPLE 2: Multiple Videos in Playlist
// ============================================
const YourPlaylistExample = () => {
  const yourPlaylist: PlaylistItem[] = [
    {
      id: '1',
      title: 'Your First Video',
      thumbnail: 'https://your-domain.com/thumb1.jpg',
      sources: [
        {
          // 👇 REPLACE WITH YOUR FIRST VIDEO URL
          src: 'https://your-domain.com/video1/playlist.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
    {
      id: '2',
      title: 'Your Second Video',
      thumbnail: 'https://your-domain.com/thumb2.jpg',
      sources: [
        {
          // 👇 REPLACE WITH YOUR SECOND VIDEO URL
          src: 'https://your-domain.com/video2/playlist.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
    {
      id: '3',
      title: 'Your Third Video',
      thumbnail: 'https://your-domain.com/thumb3.jpg',
      sources: [
        {
          // 👇 REPLACE WITH YOUR THIRD VIDEO URL
          src: 'https://your-domain.com/video3/playlist.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '50px auto' }}>
      <h1>Your Video Playlist with ABR</h1>
      
      <ReactBlackPlayer
        playlist={yourPlaylist}
        controls={{
          quality: true,
          settings: true,
          playlist: true,   // ✅ Show playlist sidebar
          nextPrev: true,   // ✅ Show next/prev buttons
          volume: true,
          time: true,
        }}
        autoPlayNext={true}  // ✅ Auto-play next video
        width="100%"
        height="auto"
        aspectRatio="16/9"
        onQualityChange={(quality) => {
          console.log('Quality changed to:', quality);
        }}
        onPlaylistItemChange={(item, index) => {
          console.log('Now playing:', item.title, 'at index:', index);
        }}
      />
    </div>
  );
};

// ============================================
// EXAMPLE 3: With Subtitles
// ============================================
const YourVideoWithSubtitles = () => {
  const videoWithSubtitles: VideoSource[] = [
    {
      src: 'https://your-domain.com/video/playlist.m3u8',
      type: 'application/x-mpegURL',
      quality: 'auto',
    },
  ];

  const subtitles = [
    {
      src: 'https://your-domain.com/subtitles/english.vtt',
      label: 'English',
      srclang: 'en',
      default: true,
    },
    {
      src: 'https://your-domain.com/subtitles/spanish.vtt',
      label: 'Español',
      srclang: 'es',
    },
    {
      src: 'https://your-domain.com/subtitles/french.vtt',
      label: 'Français',
      srclang: 'fr',
    },
  ];

  return (
    <ReactBlackPlayer
      sources={videoWithSubtitles}
      subtitles={subtitles}
      controls={{
        quality: true,
        subtitles: true,  // ✅ Enable subtitle selector
        settings: true,
      }}
    />
  );
};

// ============================================
// EXAMPLE 4: With Custom Theme
// ============================================
const YourVideoWithCustomTheme = () => {
  const customTheme = {
    name: 'My Brand',
    primaryColor: '#1a1a2e',
    secondaryColor: '#0f3460',
    backgroundColor: '#16213e',
    textColor: '#ffffff',
    accentColor: '#e94560',
  };

  return (
    <ReactBlackPlayer
      sources={[
        {
          src: 'https://your-domain.com/video/playlist.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ]}
      themeConfig={{
        themes: [customTheme],
        defaultTheme: 'My Brand',
        showThemeSelector: false, // Hide theme selector if you want only your theme
      }}
      controls={{ quality: true }}
    />
  );
};

// ============================================
// 📝 CHECKLIST FOR YOUR VIDEO
// ============================================
/*

✅ BEFORE TESTING:

1. ✅ Your video is in HLS format (.m3u8)
2. ✅ Your HLS stream has multiple quality levels (for ABR to work)
3. ✅ Your video URL is publicly accessible (or accessible from your app)
4. ✅ CORS is properly configured on your video server
5. ✅ You've set type: 'application/x-mpegURL'

📊 HOW TO CREATE HLS STREAM:

If you don't have an HLS stream yet, you can create one using:

1. FFmpeg (free):
   ffmpeg -i input.mp4 -c:v h264 -c:a aac -f hls -hls_time 10 -hls_playlist_type vod \
   -hls_segment_filename "segment%03d.ts" playlist.m3u8

2. Cloud Services:
   - AWS MediaConvert
   - Google Cloud Transcoder
   - Cloudflare Stream
   - Mux Video

3. Online Tools:
   - Bitmovin Encoding
   - Wowza Streaming Engine

🎯 EXPECTED QUALITY LEVELS:

Your HLS stream should have multiple renditions like:
- 1920x1080 (1080p)
- 1280x720 (720p)
- 854x480 (480p)
- 640x360 (360p)
- 426x240 (240p)

The player will automatically detect and display all available levels!

*/

// ============================================
// 🚀 EXPORT YOUR COMPONENT
// ============================================
export default YourSingleVideoExample;

// Or use one of the other examples:
// export default YourPlaylistExample;
// export default YourVideoWithSubtitles;
// export default YourVideoWithCustomTheme;
