# Installation Steps for Test Project

## Issue: Cached Module Not Updating

When you install the package in your test project, Vite/Node may cache the old version. Follow these steps to ensure a clean installation:

## Steps to Install/Update Package

### 1. In Your Test Project Directory

```bash
# Navigate to your test project
cd /Users/lynkto/Projects/video-player-test

# Remove the old package
npm uninstall react-black-player

# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear Vite cache if it exists
rm -rf node_modules/.vite

# Install the new package
npm install /Users/lynkto/Projects/cccc/react-black-player-1.0.1.tgz

# Reinstall all dependencies
npm install
```

### 2. Clear Vite Dev Server Cache

If you're running a dev server, stop it and clear the cache:

```bash
# Stop the dev server (Ctrl+C)

# Remove Vite cache
rm -rf node_modules/.vite

# Restart the dev server
npm run dev
```

### 3. Alternative: Use Browser Hard Refresh

After restarting the dev server:
- Chrome/Edge: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Firefox: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)

## Verify Installation

Check that the package is correctly installed:

```bash
# Check installed version
npm list react-black-player

# Verify the package location
ls -la node_modules/react-black-player/dist/
```

## Usage

```tsx
import { ReactBlackPlayer } from 'react-black-player';
import 'react-black-player/dist/style.css';

function App() {
  return (
    <ReactBlackPlayer
      sources={[
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          type: 'video/mp4',
          quality: '720p',
        },
      ]}
      showPlaylist={true}
      playlist={[]}
    />
  );
}
```

## Common Issues

### Issue: Old styles still showing
**Solution**: Clear browser cache and Vite cache as shown above

### Issue: TypeScript errors
**Solution**: Restart your TypeScript server in your IDE
- VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

### Issue: Module not found
**Solution**: 
1. Check that `react-black-player` is in your `node_modules`
2. Ensure the import path is correct: `'react-black-player/dist/style.css'`
3. Reinstall the package

## Package Contents

The installed package should contain:
- `dist/index.js` - UMD build
- `dist/index.esm.js` - ES Module build
- `dist/style.css` - Compiled styles
- `dist/*.d.ts` - TypeScript definitions

## Notes

- The package uses React 16.8+ as a peer dependency
- Make sure your project has React and ReactDOM installed
- The package size is ~378 KB compressed
