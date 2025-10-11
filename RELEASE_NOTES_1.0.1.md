# React Black Player v1.0.1 - Release Notes

## 📅 Release Date
January 11, 2025

## 🎯 Overview
This minor release focuses on improving the user interface experience with better volume slider visibility, smoother animations in the settings menu, and enhanced demo examples showing the full capabilities of the quality selector feature.

## ✨ What's New

### UI/UX Improvements

#### Volume Slider Enhancement
- **Updated volume slider track height to 4px** for improved visibility and easier interaction
- Added `!important` flag to ensure consistent styling across all browsers
- Better visual feedback when adjusting volume

#### Smooth Settings Accordion
- **Enhanced settings menu with smooth expand/collapse animations**
  - Speed control dropdown
  - Subtitles dropdown
  - Quality selector dropdown
  - Theme selector dropdown
- All dropdowns now feature a 300ms transition duration for smooth accordion-style animations
- Animated chevron icons that rotate when dropdowns open/close

### Demo Improvements
- **Updated demo with real multiple quality sources:**
  - 1080p: HLS streaming (adaptive bitrate)
  - 720p: Standard HD video
  - 480p: Standard definition video
  - 360p: Low quality option
- Playlist items now demonstrate quality switching with different video sources
- Better showcases the quality selector functionality

## 🔧 Technical Changes

### CSS Updates
- Volume slider track height: `2px` → `4px` with `!important`
- Settings dropdowns: Added `overflow-hidden transition-all duration-300` classes
- Dynamic `maxHeight` styling for accordion effect

### Component Updates
- Fixed theme dropdown closing animation
- Improved dropdown state management in settings menu
- Enhanced visual consistency across all interactive elements

## 📦 Package Details

### Bundle Size
- **style.css**: 12.52 kB (gzip: 3.01 kB)
- **index.esm.js**: 795.23 kB (gzip: 202.36 kB)
- **index.js**: 548.29 kB (gzip: 168.03 kB)

### Files Included
- `dist/` - Built files (JS, CSS, type definitions)
- `README.md` - Complete documentation
- `CHANGELOG.md` - Version history
- `LICENSE` - MIT License

## 🚀 Installation

### New Installation
```bash
npm install react-black-player
```

### Updating from v1.0.0
```bash
npm update react-black-player
```

## 📝 Usage Example with Quality Options

```tsx
import { ReactBlackPlayer } from 'react-black-player';
import 'react-black-player/dist/style.css';

function App() {
  return (
    <ReactBlackPlayer
      sources={[
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
        {
          src: 'https://example.com/video-480p.mp4',
          type: 'video/mp4',
          quality: '480p',
        },
      ]}
      showQuality={true}
      onQualityChange={(quality) => console.log('Quality changed to:', quality)}
    />
  );
}
```

## 🐛 Bug Fixes
- Fixed volume slider track height not applying correctly in some browsers
- Fixed settings menu dropdowns appearing instantly without animation
- Fixed theme dropdown closing without smooth transition

## 🔄 Migration from v1.0.0
No breaking changes! This is a drop-in replacement. Simply update your package version and rebuild.

## 🎨 Features Still Available
All features from v1.0.0 remain fully functional:
- ✅ HLS Streaming Support
- ✅ Multiple Quality Options
- ✅ Subtitle/Caption Support
- ✅ Playlist with Thumbnails
- ✅ 6 Built-in Themes + Custom Themes
- ✅ Playback Speed Control (0.25x - 2x)
- ✅ Fullscreen Mode
- ✅ Auto-play Next
- ✅ Portrait & Landscape Video Support
- ✅ TypeScript Support
- ✅ Responsive Design

## 📚 Documentation
- [README.md](./README.md) - Complete documentation
- [CHANGELOG.md](./CHANGELOG.md) - Full version history
- [Demo](./demo/main.tsx) - Live examples

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📄 License
MIT License - see [LICENSE](./LICENSE) file for details

## 🙏 Acknowledgments
Thank you to all users who provided feedback to make this release better!

---

**Full Changelog**: v1.0.0...v1.0.1
