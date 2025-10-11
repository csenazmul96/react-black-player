# React Black Player

A modern, feature-rich, and highly customizable video player component for React applications. Built with TypeScript, TailwindCSS, and HLS.js support.

![React Black Player Demo](https://img.shields.io/badge/version-1.0.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🎨 **Fully Customizable Themes** - Multiple built-in themes with support for custom themes
- 📱 **Responsive Design** - Adapts to any screen size and aspect ratio
- 🎬 **Playlist Support** - Built-in playlist with thumbnail previews
- 📺 **HLS Streaming** - Native support for HLS (.m3u8) streaming
- 🎯 **Multiple Quality Options** - Automatic and manual quality selection
- 📝 **Subtitle Support** - Multiple subtitle tracks with easy switching
- ⚡ **Variable Playback Speed** - 0.25x to 2x speed control
- 🖼️ **Portrait & Landscape Videos** - Automatically handles 9:16 and 16:9 aspect ratios
- 🎛️ **Comprehensive Controls** - Play, pause, volume, fullscreen, and more
- 🔄 **Auto-play Next** - Automatic playlist progression
- 🎨 **Hover Effects** - Smooth animations and transitions
- ⌨️ **Keyboard Shortcuts** - (Coming soon)
- 📦 **TypeScript Support** - Full type definitions included

## 📦 Installation

```bash
npm install react-black-player
```

Or with yarn:

```bash
yarn add react-black-player
```

Or with pnpm:

```bash
pnpm add react-black-player
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { ReactBlackPlayer } from 'react-black-player';
import 'react-black-player/dist/style.css';

function App() {
  return (
    <ReactBlackPlayer
      sources={[
        {
          src: 'https://example.com/video.mp4',
          type: 'video/mp4',
          quality: '1080p',
        },
      ]}
      poster="https://example.com/poster.jpg"
      width="100%"
      aspectRatio="16/9"
    />
  );
}

export default App;
```

## 📖 Usage Examples

### Basic Video Player

```tsx
import { ReactBlackPlayer } from 'react-black-player';

<ReactBlackPlayer
  sources={[
    {
      src: '/videos/sample.mp4',
      type: 'video/mp4',
    },
  ]}
  autoPlay={false}
  muted={false}
  loop={false}
/>
```

### Multiple Quality Options

```tsx
<ReactBlackPlayer
  sources={[
    {
      src: 'https://example.com/video-4k.mp4',
      type: 'video/mp4',
      quality: '4K',
    },
    {
      src: 'https://example.com/video-1080p.mp4',
      type: 'video/mp4',
      quality: '1080p',
    },
    {
      src: 'https://example.com/video-720p.mp4',
      type: 'video/mp4',
      quality: '720p',
    },
  ]}
  showQuality={true}
/>
```

### With Subtitles

```tsx
<ReactBlackPlayer
  sources={[
    {
      src: '/videos/movie.mp4',
      type: 'video/mp4',
    },
  ]}
  subtitles={[
    {
      src: '/subtitles/english.vtt',
      label: 'English',
      srclang: 'en',
      default: true,
    },
    {
      src: '/subtitles/spanish.vtt',
      label: 'Español',
      srclang: 'es',
    },
  ]}
  showSubtitles={true}
/>
```

### With Playlist

```tsx
<ReactBlackPlayer
  sources={[
    {
      src: '/videos/video1.mp4',
      type: 'video/mp4',
    },
  ]}
  playlist={[
    {
      id: '1',
      title: 'First Video',
      thumbnail: '/thumbnails/1.jpg',
      sources: [
        {
          src: '/videos/video1.mp4',
          type: 'video/mp4',
        },
      ],
    },
    {
      id: '2',
      title: 'Second Video',
      thumbnail: '/thumbnails/2.jpg',
      sources: [
        {
          src: '/videos/video2.mp4',
          type: 'video/mp4',
        },
      ],
    },
  ]}
  showPlaylist={true}
  autoPlayNext={true}
/>
```

### HLS Streaming

```tsx
<ReactBlackPlayer
  sources={[
    {
      src: 'https://example.com/stream/master.m3u8',
      type: 'application/x-mpegURL',
    },
  ]}
/>
```

### Custom Theme

```tsx
import { ReactBlackPlayer, createCustomTheme } from 'react-black-player';

const myTheme = {
  name: 'My Theme',
  primaryColor: '#1a1a2e',
  secondaryColor: '#16213e',
  backgroundColor: '#0f0f23',
  textColor: '#eaeaea',
  accentColor: '#e94560',
};

<ReactBlackPlayer
  sources={[
    {
      src: '/videos/video.mp4',
      type: 'video/mp4',
    },
  ]}
  themeConfig={{
    showThemeSelector: true,
    customThemes: [myTheme],
    defaultTheme: 'My Theme',
  }}
/>
```

### With Event Handlers

```tsx
<ReactBlackPlayer
  sources={[
    {
      src: '/videos/video.mp4',
      type: 'video/mp4',
    },
  ]}
  onPlay={() => console.log('Video started playing')}
  onPause={() => console.log('Video paused')}
  onEnded={() => console.log('Video ended')}
  onTimeUpdate={(currentTime) => console.log('Current time:', currentTime)}
  onVolumeChange={(volume, muted) => 
    console.log('Volume:', volume, 'Muted:', muted)
  }
  onPlaybackRateChange={(rate) => console.log('Speed:', rate)}
  onQualityChange={(quality) => console.log('Quality:', quality)}
  onFullscreenChange={(isFullscreen) => 
    console.log('Fullscreen:', isFullscreen)
  }
/>
```

### Portrait Video (9:16)

The player automatically handles portrait videos by centering them with black bars on the sides:

```tsx
<ReactBlackPlayer
  sources={[
    {
      src: '/videos/vertical-video.mp4',
      type: 'video/mp4',
    },
  ]}
  width="100%"
  aspectRatio="16/9"
/>
```

## 📚 API Reference

### ReactBlackPlayer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sources` | `VideoSource[]` | *required* | Array of video sources |
| `poster` | `string` | `undefined` | URL of poster image |
| `subtitles` | `SubtitleTrack[]` | `[]` | Array of subtitle tracks |
| `className` | `string` | `''` | Additional CSS classes |
| `width` | `string \| number` | `'100%'` | Player width |
| `height` | `string \| number` | `'auto'` | Player height |
| `aspectRatio` | `string` | `'16/9'` | Aspect ratio when height is auto |

### Display Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showTime` | `boolean` | `true` | Show time display |
| `showVolume` | `boolean` | `true` | Show volume control |
| `showSettings` | `boolean` | `true` | Show settings menu |
| `showQuality` | `boolean` | `true` | Show quality selector |
| `showSubtitles` | `boolean` | `true` | Show subtitle selector |
| `showPlaylist` | `boolean` | `true` | Show playlist sidebar |
| `showNextPrev` | `boolean` | `true` | Show next/previous buttons |

### Behavior Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoPlay` | `boolean` | `false` | Auto-play on load |
| `muted` | `boolean` | `false` | Start muted |
| `loop` | `boolean` | `false` | Loop video |
| `preload` | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | Preload strategy |
| `autoPlayNext` | `boolean` | `true` | Auto-play next in playlist |

### Event Handlers

| Prop | Type | Description |
|------|------|-------------|
| `onPlay` | `() => void` | Called when video starts playing |
| `onPause` | `() => void` | Called when video is paused |
| `onEnded` | `() => void` | Called when video ends |
| `onSeeked` | `() => void` | Called when seek completes |
| `onSeeking` | `() => void` | Called when seeking starts |
| `onTimeUpdate` | `(currentTime: number) => void` | Called on time update |
| `onVolumeChange` | `(volume: number, muted: boolean) => void` | Called on volume change |
| `onQualityChange` | `(quality: string) => void` | Called on quality change |
| `onPlaybackRateChange` | `(rate: number) => void` | Called on speed change |
| `onFullscreenChange` | `(isFullscreen: boolean) => void` | Called on fullscreen toggle |
| `onPlaylistItemChange` | `(item: PlaylistItem, index: number) => void` | Called on playlist change |
| `onThemeChange` | `(theme: Theme) => void` | Called on theme change |
| `onError` | `(error: any) => void` | Called on error |
| `onLoadedMetadata` | `() => void` | Called when metadata loads |
| `onCanPlay` | `() => void` | Called when can play |

### Type Definitions

#### VideoSource

```typescript
interface VideoSource {
  src: string;           // Video URL
  type?: string;         // MIME type
  quality?: string;      // Quality label (e.g., '1080p')
}
```

#### SubtitleTrack

```typescript
interface SubtitleTrack {
  src: string;           // Subtitle file URL (WebVTT)
  label: string;         // Display label
  srclang: string;       // Language code (e.g., 'en')
  default?: boolean;     // Default subtitle
}
```

#### PlaylistItem

```typescript
interface PlaylistItem {
  id: string;                    // Unique ID
  title: string;                 // Display title
  thumbnail?: string;            // Thumbnail URL
  sources: VideoSource[];        // Video sources
  subtitles?: SubtitleTrack[];   // Subtitle tracks
}
```

#### Theme

```typescript
interface Theme {
  name: string;              // Theme name
  primaryColor: string;      // Primary color
  secondaryColor: string;    // Secondary color
  backgroundColor?: string;  // Background color
  textColor?: string;        // Text color
  accentColor?: string;      // Accent color
}
```

## 🎨 Built-in Themes

- **Dark** (default) - Modern dark theme
- **Light** - Clean light theme
- **Ocean** - Blue ocean theme
- **Sunset** - Warm sunset theme
- **Forest** - Green forest theme
- **Royal** - Purple royal theme

## 🛠️ Development

### Clone and Install

```bash
git clone https://github.com/yourusername/react-black-player.git
cd react-black-player
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [HLS.js](https://github.com/video-dev/hls.js/) - HLS streaming support
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [TailwindCSS](https://tailwindcss.com/) - Styling framework

## 📧 Support

For support, email support@example.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Keyboard shortcuts
- [ ] Picture-in-Picture mode
- [ ] Screen mirroring support
- [ ] Advanced analytics
- [ ] Chromecast support
- [ ] Video chapters/markers
- [ ] Live streaming support
- [ ] 360° video support

---

Made with ❤️ by [Your Name](https://github.com/yourusername)
