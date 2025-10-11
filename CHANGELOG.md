# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-01-11

### Changed
- Updated volume slider track height to 4px for better visibility and control
- Enhanced settings accordion with smooth expand/collapse transitions (300ms duration)
- Improved quality selector with proper dropdown animation

### Fixed
- Volume slider track height now properly enforced with !important flag
- Settings menu dropdowns now have smooth accordion-style animations
- Theme dropdown properly closes with smooth transition
- Playlist toggle button now always visible (not hidden when controls auto-hide)
- Removed height constraint on input[type="range"] that was causing layout issues

### Improved
- Demo now includes multiple actual quality sources (1080p HLS, 720p, 480p, 360p)
- Playlist items now demonstrate quality options with different video sources
- Better visual feedback with animated chevron icons in settings dropdowns
- Increased CSS specificity with `.react-black-player` scoping for better isolation in packaged builds
- Ensured consistent styling between dev and production builds
- Removed unused CSS class names and styles for cleaner codebase
- Playlist toggle button now shows/hides with player controls on hover

## [1.0.0] - 2025-01-11

### Added
- Initial release of React Black Player
- Video playback with custom controls
- HLS streaming support (.m3u8 files)
- Multiple video quality options
- Subtitle/caption support with multiple tracks
- Playlist functionality with thumbnails
- Auto-play next video in playlist
- Six built-in themes (Dark, Light, Ocean, Sunset, Forest, Royal)
- Custom theme support
- Playback speed control (0.25x - 2x)
- Fullscreen mode
- Volume control with mute option
- Progress bar with seek functionality
- Time display (current time / duration)
- Portrait video support (9:16 aspect ratio)
- Landscape video support (16:9 aspect ratio)
- Responsive design
- TypeScript support with full type definitions
- Comprehensive event handlers
- Settings menu for speed, quality, subtitles, and themes
- Smooth animations and transitions
- Hover effects on controls
- Auto-hide controls during playback

### Features
- ✅ Play/Pause control
- ✅ Volume control with slider
- ✅ Progress bar with seek
- ✅ Fullscreen toggle
- ✅ Settings menu
- ✅ Playback speed selection
- ✅ Quality selector
- ✅ Subtitle/caption selector
- ✅ Theme selector
- ✅ Playlist sidebar
- ✅ Previous/Next buttons
- ✅ Poster image support
- ✅ Auto-play option
- ✅ Loop option
- ✅ Preload options
- ✅ Custom styling support
- ✅ Event callbacks for all player interactions

### Technical
- Built with React 18
- TypeScript for type safety
- TailwindCSS for styling
- HLS.js for streaming
- Lucide React for icons
- Vite for build tooling
- Responsive and mobile-friendly
- Optimized performance
- Cross-browser compatible

## [Unreleased]

### Planned
- Keyboard shortcuts
- Picture-in-Picture mode
- Screen mirroring support
- Advanced analytics
- Chromecast support
- Video chapters/markers
- Live streaming enhancements
- 360° video support
- Virtual reality support
- Audio-only mode
- Download option
- Share functionality
- Playlist management (add/remove/reorder)
- Multiple playlist support
- Video bookmarks
- Watch history
- Configurable keyboard shortcuts
- Touch gestures for mobile
- Mini player mode
- Theater mode
- Custom controls layout
- Plugin system
- Accessibility improvements (ARIA labels, screen reader support)
- Internationalization (i18n)
