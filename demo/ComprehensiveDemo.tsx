import React from 'react';
import { ReactBlackPlayer } from '../src';
import type { VideoSource, PlaylistItem } from '../src/types';

/**
 * Comprehensive Demo - Normal Videos + HLS/ABR Streams
 * 
 * This demo showcases:
 * 1. Single normal video with multiple quality sources
 * 2. Single HLS stream with adaptive bitrate
 * 3. Playlist with normal videos
 * 4. Playlist with HLS streams
 * 5. Mixed playlist (normal + HLS)
 */
const ComprehensiveDemo: React.FC = () => {
  
  // ========================================
  // 1. SINGLE VIDEO - Normal MP4 with Multiple Qualities
  // ========================================
  const normalVideoSources: VideoSource[] = [
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4',
      quality: '720p',
      poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      aspectRatio: '16/9',
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      type: 'video/mp4',
      quality: '480p',
      poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      aspectRatio: '16/9',
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      type: 'video/mp4',
      quality: '360p',
      poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      aspectRatio: '16/9',
    },
  ];

  // ========================================
  // 2. SINGLE VIDEO - HLS Stream with ABR
  // ========================================
  const hlsVideoSource: VideoSource[] = [
    {
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL',
      quality: 'auto',
      poster: 'https://image.mux.com/x36xhzz/thumbnail.jpg',
      aspectRatio: '16/9',
    },
  ];

  // ========================================
  // 3. PLAYLIST - Normal MP4 Videos
  // ========================================
  const normalPlaylist: PlaylistItem[] = [
    {
      id: '1',
      title: 'Big Buck Bunny',
      thumbnail: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          type: 'video/mp4',
          quality: '720p',
        },
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          type: 'video/mp4',
          quality: '480p',
        },
      ],
    },
    {
      id: '2',
      title: 'Elephants Dream',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/300px-Elephants_Dream_s5_both.jpg',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          type: 'video/mp4',
          quality: '720p',
        },
      ],
    },
    {
      id: '3',
      title: 'For Bigger Blazes',
      thumbnail: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          type: 'video/mp4',
          quality: '720p',
        },
      ],
    },
    {
      id: '4',
      title: 'Sintel Trailer',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sintel_poster.jpg/220px-Sintel_poster.jpg',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          type: 'video/mp4',
          quality: '720p',
        },
      ],
    },
  ];

  // ========================================
  // 4. PLAYLIST - HLS Streams with ABR
  // ========================================
  const hlsPlaylist: PlaylistItem[] = [
    {
      id: '1',
      title: 'Big Buck Bunny (HLS - Multi-bitrate)',
      thumbnail: 'https://image.mux.com/x36xhzz/thumbnail.jpg',
      sources: [
        {
          src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
    {
      id: '2',
      title: 'Sintel Trailer (HLS - Multi-bitrate)',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sintel_poster.jpg/220px-Sintel_poster.jpg',
      sources: [
        {
          src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
    {
      id: '3',
      title: 'Art of Motion (HLS - Multi-bitrate)',
      thumbnail: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/poster.jpg',
      sources: [
        {
          src: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
  ];

  // ========================================
  // 5. PLAYLIST - Mixed (Normal + HLS)
  // ========================================
  const mixedPlaylist: PlaylistItem[] = [
    {
      id: '1',
      title: 'Big Buck Bunny (Normal MP4)',
      thumbnail: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          type: 'video/mp4',
          quality: '720p',
        },
      ],
    },
    {
      id: '2',
      title: 'Mux Test Stream (HLS - ABR)',
      thumbnail: 'https://image.mux.com/x36xhzz/thumbnail.jpg',
      sources: [
        {
          src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
    {
      id: '3',
      title: 'Elephants Dream (Normal MP4)',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/300px-Elephants_Dream_s5_both.jpg',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          type: 'video/mp4',
          quality: '720p',
        },
      ],
    },
    {
      id: '4',
      title: 'Sintel (HLS - ABR)',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sintel_poster.jpg/220px-Sintel_poster.jpg',
      sources: [
        {
          src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px', color: '#111' }}>
        React Black Player - Comprehensive Demo
      </h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>
        Showcasing normal videos and HLS/ABR streams in single player and playlist modes
      </p>

      {/* ========================================
          SECTION 1: Single Normal Video
          ======================================== */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        border: '2px solid #e5e7eb', 
        borderRadius: '12px', 
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <span style={{ fontSize: '24px' }}>🎬</span>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            Single Video - Normal MP4 (Multiple Qualities)
          </h2>
        </div>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
          Traditional video player with manual quality switching between different MP4 sources (720p, 480p, 360p)
        </p>
        <ReactBlackPlayer
          sources={normalVideoSources}
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
          autoPlay={false}
          muted={false}
          loop={false}
          preload="metadata"
          width="100%"
          height="auto"
          aspectRatio="16/9"
          controls={{
            time: true,
            volume: true,
            settings: true,
            quality: true,
            subtitles: false,
            playlist: false,
            nextPrev: false,
            pictureInPicture: true,
            hideController: false,
          }}
          onQualityChange={(quality) => {
            console.log('✅ Quality changed to:', quality);
          }}
        />
      </div>

      {/* ========================================
          SECTION 2: Single HLS Video
          ======================================== */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        border: '2px solid #3b82f6', 
        borderRadius: '12px', 
        padding: '30px',
        boxShadow: '0 4px 6px rgba(59, 130, 246, 0.2)',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <span style={{ fontSize: '24px' }}>📡</span>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#3b82f6' }}>
            Single Video - HLS Stream (Adaptive Bitrate)
          </h2>
        </div>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
          HLS streaming with automatic quality detection and adaptive bitrate switching. Qualities are auto-detected from the manifest.
        </p>
        <ReactBlackPlayer
          sources={hlsVideoSource}
          poster="https://image.mux.com/x36xhzz/thumbnail.jpg"
          autoPlay={false}
          muted={false}
          loop={false}
          preload="metadata"
          width="100%"
          height="auto"
          aspectRatio="16/9"
          controls={{
            time: true,
            volume: true,
            settings: true,
            quality: true,
            subtitles: false,
            playlist: false,
            nextPrev: false,
            pictureInPicture: true,
            hideController: false,
          }}
          onQualityChange={(quality) => {
            console.log('✅ HLS Quality changed to:', quality);
          }}
        />
      </div>

      {/* ========================================
          SECTION 3: Playlist - Normal Videos
          ======================================== */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        border: '2px solid #10b981', 
        borderRadius: '12px', 
        padding: '30px',
        boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <span style={{ fontSize: '24px' }}>📋</span>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#10b981' }}>
            Playlist - Normal MP4 Videos
          </h2>
        </div>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
          Playlist with 4 normal MP4 videos. Auto-play next video when current one ends.
        </p>
        <ReactBlackPlayer
          playlist={normalPlaylist}
          autoPlay={false}
          muted={false}
          autoPlayNext={true}
          loop={false}
          preload="metadata"
          width="100%"
          height="auto"
          aspectRatio="16/9"
          controls={{
            time: true,
            volume: true,
            settings: true,
            quality: true,
            subtitles: false,
            playlist: true,
            nextPrev: true,
            pictureInPicture: true,
            hideController: false,
          }}
          onQualityChange={(quality) => {
            console.log('✅ Playlist Quality changed to:', quality);
          }}
          onPlaylistItemChange={(item, index) => {
            console.log('🎵 Now playing:', item.title, 'at index:', index);
          }}
        />
      </div>

      {/* ========================================
          SECTION 4: Playlist - HLS Streams
          ======================================== */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        border: '2px solid #8b5cf6', 
        borderRadius: '12px', 
        padding: '30px',
        boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <span style={{ fontSize: '24px' }}>🎞️</span>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#8b5cf6' }}>
            Playlist - HLS Streams (All ABR)
          </h2>
        </div>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
          Playlist with 3 HLS streams, each with adaptive bitrate. Quality levels auto-detected for each video.
        </p>
        <ReactBlackPlayer
          playlist={hlsPlaylist}
          autoPlay={false}
          muted={false}
          autoPlayNext={true}
          loop={false}
          preload="metadata"
          width="100%"
          height="auto"
          aspectRatio="16/9"
          controls={{
            time: true,
            volume: true,
            settings: true,
            quality: true,
            subtitles: false,
            playlist: true,
            nextPrev: true,
            pictureInPicture: true,
            hideController: false,
          }}
          onQualityChange={(quality) => {
            console.log('✅ HLS Playlist Quality changed to:', quality);
          }}
          onPlaylistItemChange={(item, index) => {
            console.log('🎵 Now playing HLS:', item.title, 'at index:', index);
          }}
        />
      </div>

      {/* ========================================
          SECTION 5: Mixed Playlist
          ======================================== */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        border: '2px solid #f59e0b', 
        borderRadius: '12px', 
        padding: '30px',
        boxShadow: '0 4px 6px rgba(245, 158, 11, 0.2)',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <span style={{ fontSize: '24px' }}>🎭</span>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#f59e0b' }}>
            Playlist - Mixed (Normal MP4 + HLS)
          </h2>
        </div>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
          Playlist combining both normal MP4 videos and HLS streams. Seamless switching between different formats.
        </p>
        <ReactBlackPlayer
          playlist={mixedPlaylist}
          autoPlay={false}
          muted={false}
          autoPlayNext={true}
          loop={false}
          preload="metadata"
          width="100%"
          height="auto"
          aspectRatio="16/9"
          controls={{
            time: true,
            volume: true,
            settings: true,
            quality: true,
            subtitles: false,
            playlist: true,
            nextPrev: true,
            pictureInPicture: true,
            hideController: false,
          }}
          onQualityChange={(quality) => {
            console.log('✅ Mixed Playlist Quality changed to:', quality);
          }}
          onPlaylistItemChange={(item, index) => {
            console.log('🎵 Now playing:', item.title, 'at index:', index);
          }}
        />
      </div>

      {/* ========================================
          USAGE GUIDE
          ======================================== */}
      <div style={{ 
        backgroundColor: '#f9fafb', 
        border: '1px solid #d1d5db', 
        borderRadius: '12px', 
        padding: '30px',
        marginTop: '40px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          📚 Usage Guide
        </h2>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#374151' }}>
            1️⃣ Single Normal Video with Multiple Qualities
          </h3>
          <pre style={{ 
            backgroundColor: '#1f2937', 
            color: '#f9fafb', 
            padding: '15px', 
            borderRadius: '8px', 
            overflow: 'auto',
            fontSize: '13px'
          }}>
{`const sources: VideoSource[] = [
  {
    src: 'https://example.com/video-720p.mp4',
    type: 'video/mp4',
    quality: '720p',
    poster: 'https://example.com/poster.jpg',
    aspectRatio: '16/9',
  },
  {
    src: 'https://example.com/video-480p.mp4',
    type: 'video/mp4',
    quality: '480p',
  },
];

<ReactBlackPlayer sources={sources} controls={{ quality: true }} />`}
          </pre>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#374151' }}>
            2️⃣ Single HLS Stream (Auto Quality Detection)
          </h3>
          <pre style={{ 
            backgroundColor: '#1f2937', 
            color: '#f9fafb', 
            padding: '15px', 
            borderRadius: '8px', 
            overflow: 'auto',
            fontSize: '13px'
          }}>
{`const hlsSource: VideoSource[] = [
  {
    src: 'https://example.com/playlist.m3u8',
    type: 'application/x-mpegURL',
    quality: 'auto',
    poster: 'https://example.com/poster.jpg',
    aspectRatio: '16/9',
  },
];

<ReactBlackPlayer sources={hlsSource} controls={{ quality: true }} />`}
          </pre>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#374151' }}>
            3️⃣ Playlist with Normal Videos
          </h3>
          <pre style={{ 
            backgroundColor: '#1f2937', 
            color: '#f9fafb', 
            padding: '15px', 
            borderRadius: '8px', 
            overflow: 'auto',
            fontSize: '13px'
          }}>
{`const playlist: PlaylistItem[] = [
  {
    id: '1',
    title: 'Video 1',
    thumbnail: 'https://example.com/thumb1.jpg',
    sources: [
      { src: 'https://example.com/video1.mp4', type: 'video/mp4', quality: '720p' },
    ],
  },
  {
    id: '2',
    title: 'Video 2',
    thumbnail: 'https://example.com/thumb2.jpg',
    sources: [
      { src: 'https://example.com/video2.mp4', type: 'video/mp4', quality: '720p' },
    ],
  },
];

<ReactBlackPlayer 
  playlist={playlist} 
  autoPlayNext={true}
  controls={{ playlist: true, nextPrev: true }} 
/>`}
          </pre>
        </div>

        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#374151' }}>
            4️⃣ Mixed Playlist (Normal + HLS)
          </h3>
          <pre style={{ 
            backgroundColor: '#1f2937', 
            color: '#f9fafb', 
            padding: '15px', 
            borderRadius: '8px', 
            overflow: 'auto',
            fontSize: '13px'
          }}>
{`const mixedPlaylist: PlaylistItem[] = [
  {
    id: '1',
    title: 'Normal Video',
    sources: [
      { src: 'https://example.com/video.mp4', type: 'video/mp4', quality: '720p' },
    ],
  },
  {
    id: '2',
    title: 'HLS Stream',
    sources: [
      { src: 'https://example.com/stream.m3u8', type: 'application/x-mpegURL', quality: 'auto' },
    ],
  },
];

<ReactBlackPlayer playlist={mixedPlaylist} autoPlayNext={true} />`}
          </pre>
        </div>
      </div>

      {/* ========================================
          FEATURES LIST
          ======================================== */}
      <div style={{ 
        backgroundColor: '#ecfdf5', 
        border: '1px solid #10b981', 
        borderRadius: '12px', 
        padding: '30px',
        marginTop: '30px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#065f46' }}>
          ✨ Key Features Demonstrated
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
          <li>✅ <strong>Normal MP4 Videos</strong> - Multiple quality sources with manual switching</li>
          <li>✅ <strong>HLS Streaming</strong> - Adaptive bitrate with auto quality detection</li>
          <li>✅ <strong>Playlist Support</strong> - Auto-play next, previous/next controls</li>
          <li>✅ <strong>Mixed Playlists</strong> - Seamlessly combine MP4 and HLS</li>
          <li>✅ <strong>Quality Switching</strong> - Maintains playback position during quality changes</li>
          <li>✅ <strong>Custom Themes</strong> - Fully customizable player appearance</li>
          <li>✅ <strong>Picture-in-Picture</strong> - Watch while browsing</li>
          <li>✅ <strong>Keyboard Controls</strong> - Space, arrows, M for mute, F for fullscreen</li>
          <li>✅ <strong>Event Callbacks</strong> - Track quality changes, playlist navigation, etc.</li>
        </ul>
      </div>
    </div>
  );
};

export default ComprehensiveDemo;
