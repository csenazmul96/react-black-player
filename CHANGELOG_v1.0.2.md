# Changelog - Version 1.0.2

## 🎉 New Features

### ✨ Smooth Progress Bar Seeking
- **Drag-to-seek functionality** - Click and drag the progress bar bullet for smooth seeking
- **Instant visual feedback** - Progress updates immediately as you drag
- **No jumping back** - Fixed issue where progress would jump to old position after seeking
- **Smooth animations** - Butter-smooth 60fps progress updates during normal playback

### 🎨 Buffering Spinner
- **Beautiful dual-ring spinner** - Professional loading indicator during buffering
- **Theme-integrated colors** - Automatically matches your selected theme
- **Smart display logic** - Shows during video loading, seeking, and network buffering
- **Performance optimized** - Smooth 60fps animation with CSS transforms

### 📝 Enhanced Subtitle System
- **Transparent background** - Clean subtitle display without distracting boxes
- **Customizable font size** - Set to 22px for optimal readability
- **Multi-directional text shadow** - Strong outline ensures readability on any background
- **Subtitle persistence** - Subtitles now properly persist when:
  - Changing video quality
  - Switching between playlist videos
  - Auto-playing next video
- **Smart subtitle matching** - Remembers your subtitle language preference
- **Proper WebVTT styling** - Full support for WebVTT subtitle format

### 🖼️ Smart Aspect Ratio Handling
- **Automatic video detection** - Detects portrait (9:16) vs landscape (16:9) videos
- **Portrait video optimization** - 
  - Limited height (70vh max) to prevent excessive height
  - Centered video with black pillarbox bars on sides
  - Looks professional like Facebook/YouTube
- **Landscape video support** - Full width adjustment with responsive height
- **No configuration needed** - Works automatically based on video dimensions

### 🎚️ Volume Control Improvements
- **Fixed track height** - Precise 4px height for consistent appearance
- **Smooth slider** - Improved interaction and visual feedback

## 🐛 Bug Fixes

- Fixed progress bar jumping back to old position after seeking
- Fixed subtitle not showing after quality change
- Fixed subtitle not showing when switching playlist videos
- Removed all debug console logs from production build
- Fixed TypeScript compilation errors
- Cleaned up unused state variables

## 🔧 Technical Improvements

- Improved subtitle effect with retry logic for reliable track loading
- Added React key-based track reloading on source changes
- Optimized video metadata handling
- Better state management for seeking operations
- Removed unnecessary `isChangingQuality` flag complexity
- Simplified quality change logic
- Added proper TypeScript type imports

## 📦 Package Updates

- Version bumped to 1.0.2
- Package size: 380.3 KB
- Unpacked size: 1.4 MB
- All dependencies up to date

## 🎯 What's Improved

1. **User Experience**
   - Smoother seeking with drag support
   - Better visual feedback during loading
   - More professional subtitle display
   - Automatic smart handling of different video orientations

2. **Reliability**
   - Subtitles persist across quality changes
   - Subtitles persist across playlist navigation
   - No more jumping progress bar
   - Stable state management

3. **Performance**
   - Optimized rendering with proper React keys
   - Removed unnecessary re-renders
   - Cleaner code with fewer dependencies

4. **Developer Experience**
   - Better TypeScript support
   - Cleaner codebase
   - Removed debug logs from production

## 🚀 Upgrade Guide

To upgrade from 1.0.1 to 1.0.2:

```bash
npm install react-black-player@1.0.2
```

Or update your package.json:

```json
{
  "dependencies": {
    "react-black-player": "^1.0.2"
  }
}
```

No breaking changes - all existing code will work without modifications!

## 📝 Notes

- Default subtitle style changed to transparent background with 22px font
- Portrait videos now limited to 70vh max height by default
- Progress bar now supports full drag-to-seek functionality
- Buffering spinner appears automatically during loading states

---

**Full Changelog**: https://github.com/yourusername/react-black-player/compare/v1.0.1...v1.0.2
