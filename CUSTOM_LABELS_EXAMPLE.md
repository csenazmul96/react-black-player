# Custom Labels / Internationalization (i18n)

## Overview

React Black Player supports custom text labels for all UI elements, making it easy to internationalize your video player or use custom terminology.

## Available Labels

```typescript
interface TextLabels {
  playlist?: string;    // Default: "Playlist"
  speed?: string;       // Default: "Speed"
  subtitles?: string;   // Default: "Subtitles"
  quality?: string;     // Default: "Quality"
  theme?: string;       // Default: "Theme"
}
```

## Usage Examples

### English (Default)

If you don't provide labels, English defaults are used:

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  // Uses default English labels
/>
```

### Spanish

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={{
    playlist: 'Lista de reproducción',
    speed: 'Velocidad',
    subtitles: 'Subtítulos',
    quality: 'Calidad',
    theme: 'Tema',
  }}
/>
```

### French

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={{
    playlist: 'Liste de lecture',
    speed: 'Vitesse',
    subtitles: 'Sous-titres',
    quality: 'Qualité',
    theme: 'Thème',
  }}
/>
```

### German

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={{
    playlist: 'Wiedergabeliste',
    speed: 'Geschwindigkeit',
    subtitles: 'Untertitel',
    quality: 'Qualität',
    theme: 'Design',
  }}
```

### Portuguese

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={{
    playlist: 'Lista de reprodução',
    speed: 'Velocidade',
    subtitles: 'Legendas',
    quality: 'Qualidade',
    theme: 'Tema',
  }}
/>
```

### Japanese

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={{
    playlist: 'プレイリスト',
    speed: '速度',
    subtitles: '字幕',
    quality: '画質',
    theme: 'テーマ',
  }}
/>
```

### Chinese (Simplified)

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={{
    playlist: '播放列表',
    speed: '速度',
    subtitles: '字幕',
    quality: '画质',
    theme: '主题',
  }}
/>
```

### Arabic

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={{
    playlist: 'قائمة التشغيل',
    speed: 'السرعة',
    subtitles: 'الترجمة',
    quality: 'الجودة',
    theme: 'السمة',
  }}
/>
```

### Custom Terminology

You can also use completely custom terminology for your brand:

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={{
    playlist: 'Videos',
    speed: 'Playback',
    subtitles: 'Captions',
    quality: 'Resolution',
    theme: 'Style',
  }}
/>
```

## Dynamic Labels with i18n Libraries

### With react-i18next

```tsx
import { useTranslation } from 'react-i18next';

function VideoPlayer() {
  const { t } = useTranslation();

  return (
    <ReactBlackPlayer
      sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
      labels={{
        playlist: t('player.playlist'),
        speed: t('player.speed'),
        subtitles: t('player.subtitles'),
        quality: t('player.quality'),
        theme: t('player.theme'),
      }}
    />
  );
}
```

### With react-intl

```tsx
import { useIntl } from 'react-intl';

function VideoPlayer() {
  const intl = useIntl();

  return (
    <ReactBlackPlayer
      sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
      labels={{
        playlist: intl.formatMessage({ id: 'player.playlist' }),
        speed: intl.formatMessage({ id: 'player.speed' }),
        subtitles: intl.formatMessage({ id: 'player.subtitles' }),
        quality: intl.formatMessage({ id: 'player.quality' }),
        theme: intl.formatMessage({ id: 'player.theme' }),
      }}
    />
  );
}
```

## Partial Labels

You only need to provide labels you want to customize:

```tsx
<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={{
    playlist: 'My Videos',  // Custom
    // Others will use defaults: "Speed", "Subtitles", etc.
  }}
/>
```

## TypeScript Support

Full TypeScript support with type checking:

```typescript
import type { TextLabels } from 'react-black-player';

const myLabels: TextLabels = {
  playlist: 'Lista de reproducción',
  speed: 'Velocidad',
  subtitles: 'Subtítulos',
  quality: 'Calidad',
  theme: 'Tema',
};

<ReactBlackPlayer
  sources={[{ src: '/video.mp4', type: 'video/mp4' }]}
  labels={myLabels}
/>
```

## Where Labels Appear

- **Playlist**: Sidebar heading at the top of the playlist panel
- **Speed**: Settings menu section for playback speed control
- **Subtitles**: Settings menu section for subtitle track selection
- **Quality**: Settings menu section for video quality selection
- **Theme**: Settings menu section for theme selection

## Best Practices

1. **Use i18n libraries** for apps with multiple languages
2. **Keep labels short** to fit the UI properly
3. **Test with long labels** to ensure they don't break the layout
4. **Maintain consistency** across your app's terminology
5. **Use proper character encoding** for non-Latin scripts

---

This feature makes React Black Player truly international! 🌍
