# 🚀 Quick Start - ABR Feature

## Test It Now!

### 1️⃣ Start Dev Server
```bash
npm run dev
```

### 2️⃣ Open Browser
Navigate to: **http://localhost:5174**

### 3️⃣ Test Quality Switching
1. Click **Settings** icon (⚙️)
2. Click **Quality**
3. See all detected quality levels
4. Try switching between them!

---

## 📝 Copy-Paste Example

```tsx
import { ReactBlackPlayer } from 'react-black-player';

const MyPlayer = () => {
  const hlsSource = [
    {
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL',
      quality: 'auto',
    },
  ];

  return (
    <ReactBlackPlayer
      sources={hlsSource}
      controls={{ quality: true }}
      onQualityChange={(q) => console.log('Quality:', q)}
    />
  );
};
```

---

## 🎬 Test Streams

### Quick Test
```
https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
```

### High Quality
```
https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
```

### Apple Official
```
https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8
```

---

## ✅ What to Expect

When you load an HLS stream:
- ✅ Quality levels auto-detected (240p, 360p, 480p, 720p, 1080p, etc.)
- ✅ Displayed in Settings → Quality menu
- ✅ "auto" enables adaptive bitrate streaming
- ✅ Manual selection locks to specific quality
- ✅ Seamless switching without interruption

---

## 📚 More Info

- **Full Guide**: `ABR_FEATURE_GUIDE.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **Test Example**: `ABR_TEST_EXAMPLE.tsx`
- **Demo**: `demo/ABRDemo.tsx`

---

## 🆘 Troubleshooting

**No quality levels showing?**
- Check stream URL is accessible
- Verify `type: 'application/x-mpegURL'`
- Ensure stream has multiple quality levels

**Quality switching not working?**
- Check browser console for errors
- Try a different test stream
- Verify HLS.js is loaded

---

## 🎉 That's It!

The ABR feature is fully integrated and ready to use. Just provide an HLS stream URL and the player will automatically detect and display all available quality levels!
