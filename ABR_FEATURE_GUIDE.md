# Adaptive Bitrate Streaming (ABR) Feature Guide

## Overview

The React Black Player now supports **Adaptive Bitrate Streaming (ABR)** with automatic quality detection for HLS streams. The player automatically detects all available quality levels from HLS manifests and displays them in the Settings → Quality menu.

## Features

✅ **Automatic Quality Detection** - Detects all quality levels from HLS streams (240p, 360p, 480p, 720p, 1080p, 1440p, 4K)  
✅ **Seamless Quality Switching** - Switch between qualities without interrupting playback  
✅ **Auto Mode** - Let the player automatically select the best quality based on bandwidth  
✅ **Manual Control** - Select specific quality levels for manual control  
✅ **Unified Quality Menu** - Merges HLS qualities with manual source qualities  
✅ **Native Safari Support** - Works with Safari's native HLS support  

## How It Works

### 1. HLS Quality Detection

When an HLS stream is loaded, the player:
1. Parses the HLS manifest (`.m3u8` file)
2. Extracts all available quality levels
3. Automatically generates quality names based on resolution (e.g., 720p, 1080p)
4. Displays them in the Settings → Quality menu

### 2. Quality Switching

- **Auto Mode** (`quality: 'auto'`): The player automatically switches between quality levels based on available bandwidth
- **Manual Mode**: Select a specific quality level to lock playback at that resolution

### 3. Quality Level Naming

The player automatically generates quality names based on video height:
- 2160p or higher → **4K**
- 1440p → **1440p**
- 1080p → **1080p**
- 720p → **720p**
- 480p → **480p**
- 360p → **360p**
- 240p → **240p**

## Usage Examples

### Basic HLS Stream with ABR

```tsx
import { ReactBlackPlayer } from 'react-black-player';
import type { VideoSource } from 'react-black-player';

const MyPlayer = () => {
  const hlsSource: VideoSource[] = [
    {
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL',
      quality: 'auto',
      poster: 'https://example.com/poster.jpg',
    },
  ];

  return (
    <ReactBlackPlayer
      sources={hlsSource}
      controls={{ quality: true }}
      onQualityChange={(quality) => {
        console.log('Quality changed to:', quality);
      }}
    />
  );
};
```

### HLS Playlist with ABR

```tsx
import { ReactBlackPlayer } from 'react-black-player';
import type { PlaylistItem } from 'react-black-player';

const MyPlaylistPlayer = () => {
  const playlist: PlaylistItem[] = [
    {
      id: '1',
      title: 'Video 1',
      sources: [
        {
          src: 'https://example.com/video1/playlist.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
    {
      id: '2',
      title: 'Video 2',
      sources: [
        {
          src: 'https://example.com/video2/playlist.m3u8',
          type: 'application/x-mpegURL',
          quality: 'auto',
        },
      ],
    },
  ];

  return (
    <ReactBlackPlayer
      playlist={playlist}
      controls={{ quality: true, playlist: true }}
      autoPlayNext={true}
      onQualityChange={(quality) => {
        console.log('Quality changed to:', quality);
      }}
    />
  );
};
```

### Mixing HLS and Manual Sources

```tsx
const mixedSources: VideoSource[] = [
  {
    src: 'https://example.com/hls/playlist.m3u8',
    type: 'application/x-mpegURL',
    quality: 'auto', // HLS with ABR
  },
  {
    src: 'https://example.com/video-720p.mp4',
    type: 'video/mp4',
    quality: '720p', // Manual source
  },
  {
    src: 'https://example.com/video-480p.mp4',
    type: 'video/mp4',
    quality: '480p', // Manual source
  },
];

<ReactBlackPlayer sources={mixedSources} controls={{ quality: true }} />
```

## Test HLS Streams

Here are some public HLS streams you can use for testing:

### 1. Mux Test Stream (Multi-bitrate)
```
https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
```
- Multiple quality levels
- Good for testing ABR

### 2. Bitmovin Sintel (Multi-bitrate)
```
https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
```
- High-quality test stream
- Multiple resolutions

### 3. Bitmovin Art of Motion (Multi-bitrate)
```
https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
```
- Professional quality
- Wide range of bitrates

### 4. Apple Advanced HLS Stream
```
https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8
```
- Apple's official test stream
- Multiple variants

## API Reference

### Props

#### `sources` (VideoSource[])
Array of video sources. For HLS streams, set `type: 'application/x-mpegURL'`.

```tsx
interface VideoSource {
  src: string;
  type?: string;
  quality?: string;
  poster?: string;
  aspectRatio?: string;
}
```

#### `onQualityChange` (callback)
Called when quality level changes.

```tsx
onQualityChange?: (quality: string) => void;
```

**Parameters:**
- `quality` (string): The selected quality level (e.g., 'auto', '720p', '1080p')

### Controls

Enable quality selector in controls:

```tsx
controls={{
  quality: true, // Show quality selector in settings menu
}}
```

## Technical Details

### HLS.js Configuration

The player uses HLS.js with the following configuration:

```typescript
{
  enableWorker: true,
  lowLatencyMode: false,
}
```

### Quality Level Detection

Quality levels are detected from the HLS manifest using the `MANIFEST_PARSED` event:

```typescript
hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
  const levels = data.levels.map((level, index) => ({
    height: level.height,
    width: level.width,
    bitrate: level.bitrate,
    name: generateQualityName(level.height),
    level: index,
  }));
});
```

### Quality Switching

Quality switching is handled by setting the `currentLevel` property:

```typescript
// Auto mode (ABR)
hls.currentLevel = -1;

// Manual mode (specific quality)
hls.currentLevel = levelIndex;
```

## Browser Compatibility

- **Chrome/Edge/Firefox**: Uses HLS.js for HLS playback
- **Safari**: Uses native HLS support (Safari has built-in HLS support)
- **Mobile browsers**: Full support on iOS Safari and Chrome/Firefox on Android

## Troubleshooting

### Quality levels not showing up

1. Ensure the HLS stream has multiple quality levels in the manifest
2. Check that the stream URL is accessible
3. Verify the `type` is set to `'application/x-mpegURL'`
4. Check browser console for HLS.js errors

### Quality switching not working

1. Ensure HLS.js is properly loaded
2. Check that the stream supports quality switching
3. Verify network conditions (auto mode requires stable connection)

### Safari-specific issues

Safari uses native HLS support, which has limited programmatic control over quality levels. The player will still show available qualities, but switching behavior may differ from Chrome/Firefox.

## Performance Tips

1. **Use Auto Mode**: Let the player automatically select the best quality for optimal performance
2. **Preload Strategy**: Set `preload="metadata"` for faster initial load
3. **Poster Images**: Provide poster images to improve perceived load time
4. **CDN**: Host HLS streams on a CDN for better performance

## Demo

Run the demo to see ABR in action:

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

The demo includes:
- Single HLS stream with ABR
- Playlist with multiple HLS streams
- Quality switching examples
- Test streams from various providers

## Future Enhancements

Potential future improvements:
- Bandwidth estimation display
- Quality change notifications
- Custom quality naming
- Quality level filtering
- Advanced HLS.js configuration options

## Support

For issues or questions:
- GitHub Issues: [Your Repository URL]
- Documentation: [Your Docs URL]

---

**Note**: This feature requires HLS.js v1.5.7 or higher, which is included as a dependency in the package.
