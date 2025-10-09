export interface VideoSource {
  src: string;
  type?: string;
  quality?: string;
}

export interface Theme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export interface ThemeConfig {
  showThemeSelector?: boolean;
  availableThemes?: Theme[];
  customTheme?: Theme;
  defaultTheme?: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  thumbnail?: string;
  sources: VideoSource[];
  subtitles?: SubtitleTrack[];
}

export interface SubtitleTrack {
  src: string;
  label: string;
  srclang: string;
  default?: boolean;
}

export interface VideoPlayerConfig {
  // Display options
  showTime?: boolean;
  showVolume?: boolean;
  showSettings?: boolean;
  showQuality?: boolean;
  showSubtitles?: boolean;
  showPlaylist?: boolean;
  showNextPrev?: boolean;
  
  // Playlist
  playlist?: PlaylistItem[];
  autoPlayNext?: boolean;
  
  // Behavior
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  
  // Styling
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  
  // Theme
  themeConfig?: ThemeConfig;
}

export interface VideoPlayerEvents {
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onSeeked?: () => void;
  onSeeking?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onVolumeChange?: (volume: number, muted: boolean) => void;
  onQualityChange?: (quality: string) => void;
  onPlaybackRateChange?: (rate: number) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  onPlaylistItemChange?: (item: PlaylistItem, index: number) => void;
  onThemeChange?: (theme: Theme) => void;
  onError?: (error: any) => void;
  onLoadedMetadata?: () => void;
  onCanPlay?: () => void;
}

export type VideoPlayerProps = VideoPlayerConfig & VideoPlayerEvents & {
  sources: VideoSource[];
  poster?: string;
  subtitles?: SubtitleTrack[];
  className?: string;
};
