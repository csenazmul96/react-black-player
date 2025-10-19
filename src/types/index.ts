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
  /** Poster/banner image URL for this video source */
  poster?: string;
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
  /** Whether to show theme selector in settings menu. Defaults to true. */
  showThemeSelector?: boolean;
  /** Array of themes to be available in the player. */
  themes?: Theme[];
  /** Name of the default theme to use on load. Must match the name of a theme in the `themes` array. */
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
  /** Language code (e.g., 'en', 'es', 'fr'), must be a valid BCP 47 language tag */
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
 * Configuration for the visibility of player controls
 * @interface ControlsVisibility
 */
export interface ControlsVisibility {
  /** Show/hide current time and duration display. Defaults to true. */
  time?: boolean;
  /** Show/hide volume control. Defaults to true. */
  volume?: boolean;
  /** Show/hide settings menu (speed, quality, subtitles, theme). Defaults to true. */
  settings?: boolean;
  /** Show/hide quality selector in settings. Defaults to true. */
  quality?: boolean;
  /** Show/hide subtitle selector in settings. Defaults to true. */
  subtitles?: boolean;
  /** Show/hide playlist sidebar. Defaults to true. */
  playlist?: boolean;
  /** Show/hide previous/next buttons when playlist is available. Defaults to true. */
  nextPrev?: boolean;
  /** Show/hide Picture-in-Picture button. Defaults to false. */
  pictureInPicture?: boolean;
  /** Show/hide all player controls. Defaults to true. */
  all?: boolean;
}


/**
 * Configuration options for the React Black Player
 * @interface ReactBlackPlayerConfig
 */
export interface ReactBlackPlayerConfig {
  /** Configuration for the visibility of player controls */
  controls?: ControlsVisibility;

  // Security
  /** Protect video source from being easily copied (disables right-click, prevents URL inspection) */
  protectSource?: boolean;
  
  // Text customization
  /** Custom text labels for UI elements */
  labels?: TextLabels;
  
  // Playlist
  /** Array of playlist items */
  playlist?: PlaylistItem[];
  /** Automatically play next video when current video ends (default: false) */
  autoPlayNext?: boolean;
  
  // Behavior
  /** Start playing video automatically on load */
  autoPlay?: boolean;
  /** Start with audio muted */
  muted?: boolean;
  /** Loop the video when it ends */
  loop?: boolean;
  /** Loop the current video when it ends (default: false) */
  loopCurrentVideo?: boolean;
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
  onPlay?: (event: any) => void;
  /** Callback when video is paused */
  onPause?: (event: any) => void;
  /** Callback when video playback ends */
  onEnded?: (event: any) => void;
  /** Callback when seek operation completes */
  onSeeked?: (event: any) => void;
  /** Callback when seeking starts */
  onSeeking?: (event: any) => void;
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
  /** Callback when auto-playing next video (triggered by autoPlayNext) */
  onNextVideoPlay?: (item: PlaylistItem, index: number) => void;
  /** Callback when theme is changed */
  onThemeChange?: (theme: Theme) => void;
  /** Callback when an error occurs */
  onError?: (error: any) => void;
  /** Callback when video metadata is loaded */
  onLoadedMetadata?: (event: any) => void;
  /** Callback when video can start playing */
  onCanPlay?: (event: any) => void;
  /** Callback when the browser starts loading the video */
  onLoadStart?: (event: any) => void;
  /** Callback when the browser is downloading the video */
  onProgress?: (event: any) => void;
  /** Callback when the browser is intentionally not getting media data */
  onSuspend?: (event: any) => void;
  /** Callback when the fetching of the media data is aborted */
  onAbort?: (event: any) => void;
  /** Callback when the media has become empty */
  onEmptied?: (event: any) => void;
  /** Callback when the browser is trying to get media data, but data is not available */
  onStalled?: (event: any) => void;
  /** Callback when the browser has loaded the current frame of the media */
  onLoadedData?: (event: any) => void;
  /** Callback when the browser can play through the media without stopping for buffering */
  onCanPlayThrough?: (event: any) => void;
  /** Callback when the video is playing */
  onPlaying?: (event: any) => void;
  /** Callback when the video stops because it needs to buffer the next frame */
  onWaiting?: (event: any) => void;
  /** Callback when the duration of the media is changed */
  onDurationChange?: (event: any) => void;
  /** Callback when the video element's size has changed */
  onResize?: (event: any) => void;
  /** Callback when the playback rate changes */
  onRateChange?: (event: any) => void;
  /** Callback when the video enters Picture-in-Picture mode */
  onEnterPictureInPicture?: (event: any) => void;
  /** Callback when the video leaves Picture-in-Picture mode */
  onLeavePictureInPicture?: (event: any) => void;
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