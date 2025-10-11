# Testing the Package Locally

## Method 1: Install from the tarball

1. The package has been built and packed into `react-black-player-1.0.0.tgz`

2. In a test React project, install the package:

```bash
npm install /Users/lynkto/Projects/cccc/react-black-player-1.0.0.tgz
```

3. Use it in your React component:

```tsx
import React from 'react';
import { ReactBlackPlayer } from 'react-black-player';
import 'react-black-player/dist/style.css';

function App() {
  return (
    <div className="App">
      <ReactBlackPlayer
        sources={[
          {
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4',
            quality: '720p',
          },
        ]}
        poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
        width="100%"
        aspectRatio="16/9"
        showPlaylist={true}
        showSettings={true}
      />
    </div>
  );
}

export default App;
```

## Method 2: npm link (for development)

1. In the package directory:

```bash
cd /Users/lynkto/Projects/cccc
npm link
```

2. In your test project:

```bash
npm link react-black-player
```

3. Use the same code as Method 1

## Method 3: Direct file path in package.json

In your test project's `package.json`:

```json
{
  "dependencies": {
    "react-black-player": "file:/Users/lynkto/Projects/cccc"
  }
}
```

Then run:

```bash
npm install
```

## Testing Checklist

After installation, test these features:

- [ ] Basic video playback
- [ ] Play/Pause controls
- [ ] Volume control
- [ ] Progress bar seeking
- [ ] Fullscreen mode
- [ ] Settings menu
- [ ] Playback speed control
- [ ] Quality selection (if multiple sources)
- [ ] Subtitle selection (if subtitles provided)
- [ ] Theme selection
- [ ] Playlist functionality
- [ ] Previous/Next buttons
- [ ] Auto-play next video
- [ ] Portrait video (9:16) handling
- [ ] Landscape video (16:9) handling
- [ ] HLS streaming (if .m3u8 source)
- [ ] Event callbacks

## Package Contents

The built package includes:

- `dist/index.js` - UMD bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/style.css` - Styles
- `dist/index.d.ts` - TypeScript definitions
- `dist/types.d.ts` - Type definitions
- `dist/themes.d.ts` - Theme type definitions
- `dist/ReactBlackPlayer.d.ts` - Component types
- `README.md` - Documentation
- `LICENSE` - MIT License
- `package.json` - Package metadata

## Publishing to npm

Once you've tested the package locally, you can publish it to npm:

### Prerequisites

1. Create an npm account at https://www.npmjs.com/signup
2. Login to npm CLI:

```bash
npm login
```

### Publish

1. Make sure the package name is available:

```bash
npm view react-black-player
```

If it's taken, update the name in `package.json`

2. Publish the package:

```bash
npm publish
```

For scoped packages (e.g., @yourname/react-black-player):

```bash
npm publish --access public
```

### Version Updates

When making updates:

```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish
```

## Troubleshooting

### CSS not loading

Make sure you import the CSS:

```tsx
import 'react-black-player/dist/style.css';
```

### TypeScript errors

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### Module not found

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Peer dependency warnings

Install the required peer dependencies:

```bash
npm install react@^18.0.0 react-dom@^18.0.0
```
