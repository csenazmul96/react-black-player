# React Black Player - Demo Examples

This document provides comprehensive examples for using React Black Player with both normal video sources and HLS/ABR streams.

## Table of Contents

1. [Single Video - Normal MP4](#1-single-video---normal-mp4)
2. [Single Video - HLS Stream](#2-single-video---hls-stream)
3. [Playlist - Normal Videos](#3-playlist---normal-videos)
4. [Playlist - HLS Streams](#4-playlist---hls-streams)
5. [Mixed Playlist](#5-mixed-playlist)
6. [Advanced Configuration](#6-advanced-configuration)

---

## 1. Single Video - Normal MP4

### Basic Example
```tsx
import { ReactBlackPlayer } from 'react-black-player';
import type { VideoSource } from 'react-black-player';

const sources: VideoSource[] = [
  {
    src: 'https://example.com/video.mp4',
    type: 'video/mp4',
    quality: '720p',
    poster: 'https://example.com/poster.jpg',
    aspectRatio: '16/9',
  },
];

<ReactBlackPlayer sources={sources} />
```

### Multiple Quality Sources
```tsx
const sources: VideoSource[] = [
  {
    src: 'https://example.com/video-1080p.mp4',
    type: 'video/mp4',
    quality: '1080p',
    poster: 'https://example.com/poster.jpg',
    aspectRatio: '16/9',
  },
  {
    src: 'https://example.com/video-720p.mp4',
    type: 'video/mp4',
    quality: '720p',
  },
  {
    src: 'https://example.com/video-480p.mp4',
    type: 'video/mp4',
    quality: '480p',
  },
  {
    src: 'https://example.com/video-360p.mp4',
    type: 'video/mp4',
    quality: '360p',
  },
];

<ReactBlackPlayer 
  sources={sources}
  controls={{
    quality: true,  // Enable quality selector
    settings: true,
  }}
  onQualityChange={(quality) => {
    console.log('Quality changed to:', quality);
  }}
/>
```

---

## 2. Single Video - HLS Stream

### Basic HLS Stream
```tsx
const hlsSource: VideoSource[] = [
  {
    src: 'https://example.com/stream.m3u8',
    type: 'application/x-mpegURL',
    quality: 'auto',
    poster: 'https://example.com/poster.jpg',
    aspectRatio: '16/9',
  },
];

<ReactBlackPlayer 
  sources={hlsSource}
  controls={{
    quality: true,  // Quality levels auto-detected from manifest
    settings: true,
  }}
/>
```

### HLS with Quality Change Callback
```tsx
<ReactBlackPlayer 
  sources={hlsSource}
  controls={{ quality: true }}
  onQualityChange={(quality) => {
    console.log('HLS Quality changed to:', quality);
    // quality can be: 'auto', '240p', '360p', '480p', '720p', '1080p', etc.
  }}
/>
```

### Popular Test HLS Streams
```tsx
// Mux Test Stream (Multi-bitrate)
const muxStream: VideoSource[] = [
  {
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    type: 'application/x-mpegURL',
    quality: 'auto',
  },
];

// Bitmovin Sintel
const sintelStream: VideoSource[] = [
  {
    src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    type: 'application/x-mpegURL',
    quality: 'auto',
  },
];

// Apple Advanced Stream
const appleStream: VideoSource[] = [
  {
    src: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    type: 'application/x-mpegURL',
    quality: 'auto',
  },
];
```

---

## 3. Playlist - Normal Videos

### Basic Playlist
```tsx
import type { PlaylistItem } from 'react-black-player';

const playlist: PlaylistItem[] = [
  {
    id: '1',
    title: 'Video 1',
    thumbnail: 'https://example.com/thumb1.jpg',
    sources: [
      {
        src: 'https://example.com/video1.mp4',
        type: 'video/mp4',
        quality: '720p',
      },
    ],
  },
  {
    id: '2',
    title: 'Video 2',
    thumbnail: 'https://example.com/thumb2.jpg',
    sources: [
      {
        src: 'https://example.com/video2.mp4',
        type: 'video/mp4',
        quality: '720p',
      },
    ],
  },
  {
    id: '3',
    title: 'Video 3',
    thumbnail: 'https://example.com/thumb3.jpg',
    sources: [
      {
        src: 'https://example.com/video3.mp4',
        type: 'video/mp4',
        quality: '720p',
      },
    ],
  },
];

<ReactBlackPlayer 
  playlist={playlist}
  autoPlayNext={true}
  controls={{
    playlist: true,
    nextPrev: true,
  }}
/>
```

### Playlist with Multiple Qualities per Video
```tsx
const playlist: PlaylistItem[] = [
  {
    id: '1',
    title: 'Video 1',
    thumbnail: 'https://example.com/thumb1.jpg',
    sources: [
      {
        src: 'https://example.com/video1-1080p.mp4',
        type: 'video/mp4',
        quality: '1080p',
      },
      {
        src: 'https://example.com/video1-720p.mp4',
        type: 'video/mp4',
        quality: '720p',
      },
      {
        src: 'https://example.com/video1-480p.mp4',
        type: 'video/mp4',
        quality: '480p',
      },
    ],
  },
  {
    id: '2',
    title: 'Video 2',
    thumbnail: 'https://example.com/thumb2.jpg',
    sources: [
      {
        src: 'https://example.com/video2-1080p.mp4',
        type: 'video/mp4',
        quality: '1080p',
      },
      {
        src: 'https://example.com/video2-720p.mp4',
        type: 'video/mp4',
        quality: '720p',
      },
    ],
  },
];

<ReactBlackPlayer 
  playlist={playlist}
  autoPlayNext={true}
  controls={{
    playlist: true,
    nextPrev: true,
    quality: true,
  }}
  onPlaylistItemChange={(item, index) => {
    console.log('Now playing:', item.title, 'at index:', index);
  }}
/>
```

---

## 4. Playlist - HLS Streams

### Basic HLS Playlist
```tsx
const hlsPlaylist: PlaylistItem[] = [
  {
    id: '1',
    title: 'Stream 1 (HLS)',
    thumbnail: 'https://example.com/thumb1.jpg',
    sources: [
      {
        src: 'https://example.com/stream1.m3u8',
        type: 'application/x-mpegURL',
        quality: 'auto',
      },
    ],
  },
  {
    id: '2',
    title: 'Stream 2 (HLS)',
    thumbnail: 'https://example.com/thumb2.jpg',
    sources: [
      {
        src: 'https://example.com/stream2.m3u8',
        type: 'application/x-mpegURL',
        quality: 'auto',
      },
    ],
  },
  {
    id: '3',
    title: 'Stream 3 (HLS)',
    thumbnail: 'https://example.com/thumb3.jpg',
    sources: [
      {
        src: 'https://example.com/stream3.m3u8',
        type: 'application/x-mpegURL',
        quality: 'auto',
      },
    ],
  },
];

<ReactBlackPlayer 
  playlist={hlsPlaylist}
  autoPlayNext={true}
  controls={{
    playlist: true,
    nextPrev: true,
    quality: true,  // Quality levels auto-detected for each stream
  }}
  onQualityChange={(quality) => {
    console.log('Quality changed to:', quality);
  }}
  onPlaylistItemChange={(item, index) => {
    console.log('Now playing:', item.title);
  }}
/>
```

---

## 5. Mixed Playlist

### Combining Normal Videos and HLS Streams
```tsx
const mixedPlaylist: PlaylistItem[] = [
  // Normal MP4 Video
  {
    id: '1',
    title: 'Normal Video 1',
    thumbnail: 'https://example.com/thumb1.jpg',
    sources: [
      {
        src: 'https://example.com/video1-720p.mp4',
        type: 'video/mp4',
        quality: '720p',
      },
      {
        src: 'https://example.com/video1-480p.mp4',
        type: 'video/mp4',
        quality: '480p',
      },
    ],
  },
  // HLS Stream
  {
    id: '2',
    title: 'HLS Stream 1',
    thumbnail: 'https://example.com/thumb2.jpg',
    sources: [
      {
        src: 'https://example.com/stream1.m3u8',
        type: 'application/x-mpegURL',
        quality: 'auto',
      },
    ],
  },
  // Another Normal MP4 Video
  {
    id: '3',
    title: 'Normal Video 2',
    thumbnail: 'https://example.com/thumb3.jpg',
    sources: [
      {
        src: 'https://example.com/video2.mp4',
        type: 'video/mp4',
        quality: '720p',
      },
    ],
  },
  // Another HLS Stream
  {
    id: '4',
    title: 'HLS Stream 2',
    thumbnail: 'https://example.com/thumb4.jpg',
    sources: [
      {
        src: 'https://example.com/stream2.m3u8',
        type: 'application/x-mpegURL',
        quality: 'auto',
      },
    ],
  },
];

<ReactBlackPlayer 
  playlist={mixedPlaylist}
  autoPlayNext={true}
  loop={false}
  controls={{
    playlist: true,
    nextPrev: true,
    quality: true,
  }}
  onPlaylistItemChange={(item, index) => {
    console.log('Now playing:', item.title, 'at index:', index);
  }}
  onQualityChange={(quality) => {
    console.log('Quality changed to:', quality);
  }}
/>
```

---

## 6. Advanced Configuration

### Full Configuration Example
```tsx
<ReactBlackPlayer 
  // Video sources or playlist
  sources={sources}
  // OR
  playlist={playlist}
  
  // Poster image
  poster="https://example.com/poster.jpg"
  
  // Playback settings
  autoPlay={false}
  muted={false}
  loop={false}
  loopCurrentVideo={false}
  autoPlayNext={true}
  preload="metadata"  // 'auto' | 'metadata' | 'none'
  
  // Dimensions
  width="100%"
  height="auto"
  aspectRatio="16/9"
  
  // Controls visibility
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
  
  // Custom labels
  labels={{
    playlist: 'Playlist',
    speed: 'Speed',
    subtitles: 'Subtitles',
    quality: 'Quality',
    theme: 'Theme',
  }}
  
  // Theme configuration
  themeConfig={{
    showThemeSelector: true,
    defaultTheme: 'Dark',
    themes: [
      {
        name: 'Dark',
        primaryColor: '#1a1a1a',
        secondaryColor: '#ff0000',
        textColor: '#ffffff',
        accentColor: '#ff0000',
      },
      {
        name: 'Light',
        primaryColor: '#ffffff',
        secondaryColor: '#0066cc',
        textColor: '#000000',
        accentColor: '#0066cc',
      },
    ],
  }}
  
  // Event callbacks
  onPlay={() => console.log('Playing')}
  onPause={() => console.log('Paused')}
  onEnded={() => console.log('Ended')}
  onTimeUpdate={(time) => console.log('Time:', time)}
  onVolumeChange={(volume) => console.log('Volume:', volume)}
  onQualityChange={(quality) => console.log('Quality:', quality)}
  onPlaybackRateChange={(rate) => console.log('Speed:', rate)}
  onFullscreenChange={(isFullscreen) => console.log('Fullscreen:', isFullscreen)}
  onPlaylistItemChange={(item, index) => console.log('Playlist item:', item.title)}
  onThemeChange={(theme) => console.log('Theme:', theme.name)}
  onError={(error) => console.error('Error:', error)}
/>
```

### With Subtitles
```tsx
import type { SubtitleTrack } from 'react-black-player';

const subtitles: SubtitleTrack[] = [
  {
    src: 'https://example.com/subtitles-en.vtt',
    label: 'English',
    srclang: 'en',
    default: true,
  },
  {
    src: 'https://example.com/subtitles-es.vtt',
    label: 'Spanish',
    srclang: 'es',
  },
  {
    src: 'https://example.com/subtitles-fr.vtt',
    label: 'French',
    srclang: 'fr',
  },
];

<ReactBlackPlayer 
  sources={sources}
  subtitles={subtitles}
  controls={{ subtitles: true }}
/>
```

---

## Quality Switching Behavior

### For Normal Videos (MP4)
- Quality switching changes the video source
- Playback position is maintained
- Player automatically resumes if video was playing

### For HLS Streams
- Quality levels are auto-detected from the manifest
- Switching to "auto" enables adaptive bitrate
- Selecting a specific quality locks to that level
- Seamless switching without interrupting playback

---

## Keyboard Shortcuts

- **Space**: Play/Pause
- **Arrow Left**: Seek backward 5 seconds
- **Arrow Right**: Seek forward 5 seconds
- **Arrow Up**: Increase volume
- **Arrow Down**: Decrease volume
- **M**: Toggle mute
- **F**: Toggle fullscreen

---

## Running the Demo

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` to see all examples in action.

---

## Notes

- **HLS Support**: Requires hls.js for browsers that don't natively support HLS (all except Safari)
- **Quality Detection**: HLS quality levels are automatically detected from the manifest
- **Playlist Navigation**: Use next/previous buttons or let videos auto-play
- **Mixed Playlists**: Seamlessly combine MP4 and HLS sources in the same playlist
- **Responsive**: Player automatically adapts to container size

---

## Support

For issues, questions, or contributions, please visit the GitHub repository.
