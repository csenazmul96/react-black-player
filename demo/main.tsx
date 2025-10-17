import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactBlackPlayer } from '../src';
import type { PlaylistItem, VideoSource, SubtitleTrack, Theme } from '../src/types';
import { defaultThemes } from '../src/themes';
import '../src/components/ReactBlackPlayer/styles.css';

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0]);
  // Sample video sources with multiple qualities
  const videoSources: VideoSource[] = [
    {
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL',
      quality: '1080p',
      poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4',
      quality: '720p',
      poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      type: 'video/mp4',
      quality: '480p',
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      type: 'video/mp4',
      quality: '360p',
    },
  ];

  // Sample subtitles
  const sampleSubtitles: SubtitleTrack[] = [
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
          quality: '720p',
          poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
        },
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          type: 'video/mp4',
          quality: '480p',
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
          quality: '1080p',
          poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
        },
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          type: 'video/mp4',
          quality: '720p',
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
          poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
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
          poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
        },
      ],
      subtitles: sampleSubtitles,
    },
    {
      id: '5',
      title: 'For Bigger Fun',
      sources: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          type: 'video/mp4',
          poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
        },
      ],
      subtitles: sampleSubtitles,
    },
    {
      id: '6',
      title: 'Vertical Portrait Video (9:16)',
      thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
      sources: [
        {
          src: '/4678261-hd_1080_1920_25fps.mp4',
          type: 'video/mp4',
          poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
        },
      ],
      subtitles: [],
    },
    {
      id: '7',
      title: 'SoundHelix Song 1',
      sources: [
        {
          src: '/sample-audio.mp3',
          type: 'audio/mpeg',
        },
      ],
    },
  ];

  const customTheme: Theme = {
    name: 'Custom',
    primaryColor: '#2E8B57',
    secondaryColor: '#FFD700',
    backgroundColor: '#2E8B57',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
        <ReactBlackPlayer
          sources={videoSources}
          subtitles={sampleSubtitles}
          playlist={playlist}
          showTime={true}
          showVolume={true}
          showSettings={true}
          showQuality={true}
          showSubtitles={false}
          showPlaylist={true}
          showNextPrev={true}
          showPictureInPicture={true}
          autoPlayNext={false}
          loopCurrentVideo={false}
          aspectRatio="16/9"
          themeConfig={{
            showThemeSelector: true,
            availableThemes: defaultThemes,
            customThemes: [customTheme],
            defaultTheme: 'Dark'
          }}
          onThemeChange={(theme) => {
            setCurrentTheme(theme);
          }}
        />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
