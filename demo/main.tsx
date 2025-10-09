import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { VideoPlayer } from '../src/VideoPlayer';
import type { PlaylistItem, VideoSource, SubtitleTrack, Theme } from '../src/types';
import { defaultThemes } from '../src/themes';
import '../src/styles.css';

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0]);
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
      <div className="max-w-4xl mx-auto">
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
          themeConfig={{
            showThemeSelector: true,
            availableThemes: defaultThemes,
            defaultTheme: 'Dark'
          }}
          onPlay={() => console.log('Video played')}
          onPause={() => console.log('Video paused')}
          onTimeUpdate={(time) => console.log('Time update:', time)}
          onVolumeChange={(volume, muted) =>
            console.log('Volume changed:', { volume, muted })
          }
          onPlaybackRateChange={(rate) => console.log('Playback rate:', rate)}
          onQualityChange={(quality) => console.log('Quality changed:', quality)}
          onThemeChange={(theme) => {
            console.log('Theme changed:', theme);
            setCurrentTheme(theme);
          }}
          onPlaylistItemChange={(item, index) =>
            console.log('Playlist item changed:', { item, index })
          }
          onFullscreenChange={(isFullscreen) =>
            console.log('Fullscreen:', isFullscreen)
          }
        />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
