# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is **react-black-player** - a professional black-themed React video player library with comprehensive features including subtitle support, playlist functionality, HLS streaming, and quality selection. The project is configured as a publishable npm library built with Vite and TypeScript.

## Development Commands

### Building and Development
- `npm run dev` - Start Vite development server for the demo
- `npm run build` - Build library for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview the built demo
- `npm run prepublishOnly` - Build before publishing to npm

### Testing the Component
The demo is located in `/demo/main.tsx` and serves as both documentation and testing environment. Run `npm run dev` to see the player in action with sample videos and playlists.

## Architecture and Structure

### Core Components
- **VideoPlayer.tsx** (740+ lines) - The main component containing all player logic
- **types.ts** - TypeScript definitions for all interfaces and props
- **index.tsx** - Library entry point exporting the component and types
- **styles.css** - Custom CSS for scrollbars and Tailwind imports

### Key Architecture Patterns

**State Management**: Uses React hooks (useState, useEffect, useRef) for all player state including playback, volume, playlist position, settings menus, and UI visibility.

**HLS Support**: Integrates hls.js for streaming video support with fallback to native HLS on Safari. The component detects .m3u8 URLs automatically.

**Event System**: Comprehensive callback system for all player events (play, pause, time updates, quality changes, playlist navigation, etc.).

**Responsive Controls**: Auto-hiding controls with mouse interaction detection, plus fullscreen support with proper state management.

**Playlist Architecture**: Sidebar-based playlist with thumbnail support, auto-play next functionality, and smooth transitions between videos.

### Technology Stack
- **React 18** - Component framework (peer dependency)
- **TypeScript** - Type safety and development experience
- **Tailwind CSS** - Utility-first styling with custom player theme colors
- **hls.js** - HLS/m3u8 streaming video support
- **lucide-react** - Icon library (thin stroke icons)
- **Vite** - Build tool with library mode configuration

### Build Configuration
- **Library Output**: Generates both ES modules and UMD bundles
- **Type Definitions**: Automatically generated .d.ts files via vite-plugin-dts
- **External Dependencies**: React and ReactDOM are externalized for the library build

### Styling System
Uses Tailwind with custom theme extension:
- `player-bg: #000000` (pure black)
- `player-text: #ffffff` (white)
- `player-red: #dc143c` (accent color)

Custom scrollbars for playlist and settings menus with webkit-specific styling.

## Component Integration

When working with VideoPlayer, key props include:
- `sources[]` - Array of video sources with optional quality labels
- `playlist[]` - Array of PlaylistItem objects with id, title, sources, thumbnails
- `subtitles[]` - Array of subtitle tracks with src, label, srclang
- Event callbacks for all player interactions
- UI control toggles (showTime, showVolume, showSettings, etc.)

The component is fully controlled - it manages its own state but communicates all changes through event callbacks.

## Development Notes

- The demo uses Google's sample videos for testing
- HLS support requires proper CORS configuration on video servers
- Fullscreen API requires user gesture to work properly
- The component handles both single videos and playlists seamlessly
- Subtitle tracks are loaded as HTML5 track elements
- Quality switching maintains playback position and playing state