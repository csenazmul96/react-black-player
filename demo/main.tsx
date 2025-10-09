import React from 'react';
import ReactDOM from 'react-dom/client';
import { VideoPlayer } from '../src/VideoPlayer';
import type { PlaylistItem, VideoSource, SubtitleTrack } from '../src/types';
import '../src/styles.css';

const App: React.FC = () => {
  // Sample video sources with multiple qualities
  const videoSources: VideoSource[] = [
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
  ];

  // Sample subtitles
  const sampleSubtitles: SubtitleTrack[] = [
    {
      src: '/subtitles/english.vtt',
      label: 'English',
      srclang: 'en',
      default: false,
    },
    {
      src: '/subtitles/spanish.vtt',
      label: 'Español',
      srclang: 'es',
      default: false,
    },
  ];

  // Sample playlist
  const playlist: PlaylistItem[] = [
    {
      id: '1',
      title: 'Big Buck Bunny',
      thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          type: 'video/mp4',
        },
      ],
      subtitles: sampleSubtitles,
    },
    {
      id: '2',
      title: 'Elephant Dream',
      thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          type: 'video/mp4',
        },
      ],
      subtitles: sampleSubtitles,
    },
    {
      id: '3',
      title: 'For Bigger Blazes',
      thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          type: 'video/mp4',
        },
      ],
      subtitles: sampleSubtitles,
    },
    {
      id: '4',
      title: 'For Bigger Escape',
      thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          type: 'video/mp4',
        },
      ],
      subtitles: sampleSubtitles,
    },
    {
      id: '5',
      title: 'For Bigger Fun',
      thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          type: 'video/mp4',
        },
      ],
      subtitles: sampleSubtitles,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          React Black Player
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          A professional black-themed video player with subtitle support and playlist functionality
        </p>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Full Featured Player</h2>
          <VideoPlayer
            sources={videoSources}
            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            subtitles={sampleSubtitles}
            playlist={playlist}
            showTime={true}
            showVolume={true}
            showSettings={true}
            showQuality={true}
            showSubtitles={true}
            showPlaylist={true}
            showNextPrev={true}
            autoPlayNext={true}
            aspectRatio="16/9"
            onPlay={() => console.log('Video played')}
            onPause={() => console.log('Video paused')}
            onTimeUpdate={(time) => console.log('Time update:', time)}
            onVolumeChange={(volume, muted) =>
              console.log('Volume changed:', { volume, muted })
            }
            onPlaybackRateChange={(rate) => console.log('Playback rate:', rate)}
            onQualityChange={(quality) => console.log('Quality changed:', quality)}
            onPlaylistItemChange={(item, index) =>
              console.log('Playlist item changed:', { item, index })
            }
            onFullscreenChange={(isFullscreen) =>
              console.log('Fullscreen:', isFullscreen)
            }
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Play/Pause with center button
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Progress bar with seeking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Volume control with mute
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Playback speed control
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Subtitle/Caption support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Quality selection
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Fullscreen mode
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Playlist with sidebar
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Next/Previous navigation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Auto-hide controls
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> HLS (m3u8) support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> All player events
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Responsive design
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Customizable options
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Pure black theme
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-500">✓</span> Thin lucide icons
            </li>
          </ul>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Usage Example</h2>
          <pre className="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
{`import { VideoPlayer } from 'react-black-player';

function App() {
  const sources = [
    {
      src: 'https://example.com/video.mp4',
      type: 'video/mp4',
      quality: '720p',
    },
  ];

  const playlist = [
    {
      id: '1',
      title: 'Video 1',
      sources: [{ src: 'video1.mp4' }],
    },
  ];

  return (
    <VideoPlayer
      sources={sources}
      playlist={playlist}
      showTime={true}
      showVolume={true}
      showSettings={true}
      showQuality={true}
      showPlaylist={true}
      onPlay={() => console.log('Playing')}
      onPause={() => console.log('Paused')}
    />
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
