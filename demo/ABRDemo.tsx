import React from 'react';
import { ReactBlackPlayer } from '../src';
import type { VideoSource, PlaylistItem } from '../src/types';

/**
 * Adaptive Bitrate Streaming (ABR) Demo
 * 
 * This demo showcases the automatic quality detection feature for HLS streams.
 * The player will automatically detect all available quality levels from the HLS manifest
 * and display them in the Settings > Quality menu.
 */
const ABRDemo: React.FC = () => {
  // Example 1: Single HLS stream with ABR
  // The player will automatically detect quality levels (240p, 360p, 480p, 720p, 1080p, etc.)
  const hlsVideoSources: VideoSource[] = [
    {
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL',
      quality: 'auto', // This will be the default
      poster: 'https://image.mux.com/x36xhzz/thumbnail.jpg',
      aspectRatio: '16/9',
    },
  ];

  // Example 2: Multiple HLS streams in a playlist
  const hlsPlaylist: PlaylistItem[] = [
    {
      id: '1',
      title: 'Big Buck Bunny (Multi-bitrate HLS)',
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
      title: 'Sintel Trailer (Multi-bitrate HLS)',
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
      title: 'Art of Motion (Multi-bitrate HLS)',
      thumbnail: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/poster.jpg',
      sources: [
        {
          src: 'https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
    {
      id: '4',
      title: 'Apple Advanced HLS Stream',
      thumbnail: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.jpg',
      sources: [
        {
          src: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        Adaptive Bitrate Streaming (ABR) Demo
      </h1>
      
      <div style={{ 
        backgroundColor: '#f0f9ff', 
        border: '1px solid #0ea5e9', 
        borderRadius: '8px', 
        padding: '20px', 
        marginBottom: '30px' 
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#0369a1' }}>
          🎯 How It Works
        </h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>The player automatically detects all quality levels from HLS streams</li>
          <li>Quality levels are displayed in <strong>Settings → Quality</strong> menu</li>
          <li>Select <strong>"auto"</strong> for automatic quality switching based on bandwidth</li>
          <li>Select specific quality (240p, 360p, 480p, 720p, 1080p, etc.) for manual control</li>
          <li>Quality switching is seamless without interrupting playback</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#ffffff', 
        border: '1px solid #e5e7eb', 
        borderRadius: '12px', 
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
          Single HLS Stream with ABR
        </h2>
        <ReactBlackPlayer
          sources={hlsVideoSources}
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
            subtitles: true,
            playlist: false,
            nextPrev: false,
            pictureInPicture: true,
            hideController: false,
          }}
          onQualityChange={(quality) => {
            console.log('Quality changed to:', quality);
          }}
        />
      </div>

      <div style={{ 
        backgroundColor: '#ffffff', 
        border: '1px solid #e5e7eb', 
        borderRadius: '12px', 
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
          HLS Playlist with Multiple ABR Streams
        </h2>
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
            subtitles: true,
            playlist: true,
            nextPrev: true,
            pictureInPicture: true,
            hideController: false,
          }}
          onQualityChange={(quality) => {
            console.log('Quality changed to:', quality);
          }}
          onPlaylistItemChange={(item, index) => {
            console.log('Playing:', item.title, 'at index:', index);
          }}
        />
      </div>

      <div style={{ 
        backgroundColor: '#fef3c7', 
        border: '1px solid #f59e0b', 
        borderRadius: '8px', 
        padding: '20px',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#92400e' }}>
          📝 Testing Instructions
        </h2>
        <ol style={{ listStyle: 'decimal', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>Click the <strong>Settings</strong> icon (gear icon) in the player controls</li>
          <li>Navigate to the <strong>Quality</strong> section</li>
          <li>You'll see all available quality levels detected from the HLS stream</li>
          <li>Try switching between different qualities and notice seamless transitions</li>
          <li>Select <strong>"auto"</strong> to let the player choose the best quality automatically</li>
        </ol>
      </div>

      <div style={{ 
        backgroundColor: '#f3f4f6', 
        border: '1px solid #d1d5db', 
        borderRadius: '8px', 
        padding: '20px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
          🔗 Test HLS Streams Used
        </h2>
        <div style={{ fontSize: '14px', lineHeight: '1.8', fontFamily: 'monospace' }}>
          <p><strong>1. Mux Test Stream:</strong></p>
          <code style={{ backgroundColor: '#e5e7eb', padding: '4px 8px', borderRadius: '4px', display: 'block', marginBottom: '10px' }}>
            https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
          </code>
          
          <p><strong>2. Bitmovin Sintel:</strong></p>
          <code style={{ backgroundColor: '#e5e7eb', padding: '4px 8px', borderRadius: '4px', display: 'block', marginBottom: '10px' }}>
            https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
          </code>
          
          <p><strong>3. Bitmovin Art of Motion:</strong></p>
          <code style={{ backgroundColor: '#e5e7eb', padding: '4px 8px', borderRadius: '4px', display: 'block', marginBottom: '10px' }}>
            https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
          </code>
          
          <p><strong>4. Apple Advanced Stream:</strong></p>
          <code style={{ backgroundColor: '#e5e7eb', padding: '4px 8px', borderRadius: '4px', display: 'block' }}>
            https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8
          </code>
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
          💡 Using Your Own HLS Stream
        </h2>
        <p style={{ marginBottom: '10px' }}>To use your own HLS stream with ABR:</p>
        <pre style={{ 
          backgroundColor: '#1f2937', 
          color: '#f9fafb', 
          padding: '15px', 
          borderRadius: '8px', 
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`const myHlsSource: VideoSource[] = [
  {
    src: 'https://your-domain.com/path/to/playlist.m3u8',
    type: 'application/x-mpegURL',
    quality: 'auto',
    poster: 'https://your-domain.com/poster.jpg',
    aspectRatio: '16/9',
  },
];

<ReactBlackPlayer
  sources={myHlsSource}
  controls={{ quality: true }}
  onQualityChange={(quality) => {
    console.log('Quality changed to:', quality);
  }}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default ABRDemo;
