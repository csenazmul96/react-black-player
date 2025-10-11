/**
 * Represents a video source with quality options
 * @interface VideoSource
 */
export interface VideoSource {
  /** The URL of the video source */
  src: string;
  /** MIME type of the video (e.g., 'video/mp4', 'application/x-mpegURL') */
  type?: string;
  /** Quality label for the video (e.g., '720p', '1080p', '4K') */
  quality?: string;
}

/**
 * Theme configuration for customizing player appearance
 * @interface Theme
 */
export interface Theme {
  /** Unique name for the theme */
  name: string;
  /** Primary color (used for player background and overlays) */
  primaryColor: string;
  /** Secondary color (used for progress bar and highlights) */
  secondaryColor: string;
  /** Background color for the player container */
  backgroundColor?: string;
  /** Text color for all UI elements */
  textColor?: string;
  /** Accent color for hover states and active elements */
  accentColor?: string;
}

/**
 * Configuration for theme system
 * @interface ThemeConfig
 */
export interface ThemeConfig {
  /** Whether to show theme selector in settings menu */
  showThemeSelector?: boolean;
  /** List of available themes to choose from */
  availableThemes?: Theme[];
  /** Custom themes to add to the theme selector */
  customThemes?: Theme[];
  /** Name of the default theme to use on load */
  defaultTheme?: string;
}

/**
 * Represents an item in the playlist
 * @interface PlaylistItem
 */
export interface PlaylistItem {
  /** Unique identifier for the playlist item */
  id: string;
  /** Display title for the video */
  title: string;
  /** URL of the thumbnail image */
  thumbnail?: string;
  /** Array of video sources with different qualities */
  sources: VideoSource[];
  /** Array of subtitle tracks for this video */
  subtitles?: SubtitleTrack[];
}

/**
 * Represents a subtitle/caption track
 * @interface SubtitleTrack
 */
export interface SubtitleTrack {
  /** URL of the subtitle file (WebVTT format) */
  src: string;
  /** Display label for the subtitle track */
  label: string;
  /** Language code (e.g., 'en', 'es', 'fr') */
  srclang: string;
  /** Whether this subtitle should be enabled by default */
  default?: boolean;
}

/**
 * Text labels for UI customization and internationalization
 * @interface TextLabels
 */
export interface TextLabels {
  /** Playlist sidebar heading */
  playlist?: string;
  /** Settings menu - Speed section label */
  speed?: string;
  /** Settings menu - Subtitles section label */
  subtitles?: string;
  /** Settings menu - Quality section label */
  quality?: string;
  /** Settings menu - Theme section label */
  theme?: string;
}

/**
 * Configuration options for the React Black Player
 * @interface ReactBlackPlayerConfig
 */
export interface ReactBlackPlayerConfig {
  // Display options
  /** Show/hide current time and duration display */
  showTime?: boolean;
  /** Show/hide volume control */
  showVolume?: boolean;
  /** Show/hide settings menu (speed, quality, subtitles, theme) */
  showSettings?: boolean;
  /** Show/hide quality selector in settings */
  showQuality?: boolean;
  /** Show/hide subtitle selector in settings */
  showSubtitles?: boolean;
  /** Show/hide playlist sidebar */
  showPlaylist?: boolean;
  /** Show/hide previous/next buttons when playlist is available */
  showNextPrev?: boolean;
  /** Show/hide Picture-in-Picture button */
  showPictureInPicture?: boolean;
  /** Show/hide all player controls */
  showControls?: boolean;
  
  // Security
  /** Protect video source from being easily copied (disables right-click, prevents URL inspection) */
  protectSource?: boolean;
  
  // Text customization
  /** Custom text labels for UI elements */
  labels?: TextLabels;
  
  // Playlist
  /** Array of playlist items */
  playlist?: PlaylistItem[];
  /** Automatically play next video when current video ends */
  autoPlayNext?: boolean;
  
  // Behavior
  /** Start playing video automatically on load */
  autoPlay?: boolean;
  /** Start with audio muted */
  muted?: boolean;
  /** Loop the video when it ends */
  loop?: boolean;
  /** Video preload strategy */
  preload?: 'auto' | 'metadata' | 'none';
  
  // Styling
  /** Width of the player (e.g., '100%', '800px', 800) */
  width?: string | number;
  /** Height of the player (e.g., 'auto', '450px', 450) */
  height?: string | number;
  /** Aspect ratio when height is 'auto' (e.g., '16/9', '4/3') */
  aspectRatio?: string;
  
  // Theme
  /** Theme configuration for customizing player colors */
  themeConfig?: ThemeConfig;
}

/**
 * Event handlers for React Black Player interactions
 * @interface ReactBlackPlayerEvents
 */
export interface ReactBlackPlayerEvents {
  /** Callback when video starts playing */
  onPlay?: () => void;
  /** Callback when video is paused */
  onPause?: () => void;
  /** Callback when video playback ends */
  onEnded?: () => void;
  /** Callback when seek operation completes */
  onSeeked?: () => void;
  /** Callback when seeking starts */
  onSeeking?: () => void;
  /** Callback on time update with current playback time */
  onTimeUpdate?: (currentTime: number) => void;
  /** Callback when volume changes */
  onVolumeChange?: (volume: number, muted: boolean) => void;
  /** Callback when quality is changed */
  onQualityChange?: (quality: string) => void;
  /** Callback when playback speed changes */
  onPlaybackRateChange?: (rate: number) => void;
  /** Callback when fullscreen state changes */
  onFullscreenChange?: (isFullscreen: boolean) => void;
  /** Callback when playlist item changes */
  onPlaylistItemChange?: (item: PlaylistItem, index: number) => void;
  /** Callback when theme is changed */
  onThemeChange?: (theme: Theme) => void;
  /** Callback when an error occurs */
  onError?: (error: any) => void;
  /** Callback when video metadata is loaded */
  onLoadedMetadata?: () => void;
  /** Callback when video can start playing */
  onCanPlay?: () => void;
}

/**
 * Complete props for the ReactBlackPlayer component
 * Combines configuration, events, and required props
 * @type ReactBlackPlayerProps
 */
export type ReactBlackPlayerProps = ReactBlackPlayerConfig & ReactBlackPlayerEvents & {
  /** Array of video sources (required) */
  sources: VideoSource[];
  /** URL of the poster image to show before playback */
  poster?: string;
  /** Array of subtitle tracks */
  subtitles?: SubtitleTrack[];
  /** Additional CSS classes for the container */
  className?: string;
};
