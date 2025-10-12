# Theme Configuration Examples

This document provides detailed examples of how to configure themes in React Black Player.

## Three Ways to Configure Themes

### 1. Default Custom Colors (Simplest - Recommended for Most Cases)

This is the easiest way to brand the player with your colors. Just provide `defaultPrimaryColor` and `defaultSecondaryColor`:

```tsx
import { ReactBlackPlayer } from 'react-black-player';
import 'react-black-player/dist/style.css';

function App() {
  return (
    <ReactBlackPlayer
      sources={[
        {
          src: '/videos/my-video.mp4',
          type: 'video/mp4',
        },
      ]}
      themeConfig={{
        defaultPrimaryColor: '#256ef4',  // Your brand primary color
        defaultSecondaryColor: '#346fb2', // Your brand secondary color
      }}
    />
  );
}
```

**When to use:** When you just want to quickly apply your brand colors without worrying about theme switching or advanced customization.

**Priority:** This has the HIGHEST priority and will override any `defaultTheme` setting.

---

### 2. Use Built-in Themes

If you don't provide custom colors, you can choose from our built-in themes. The player defaults to 'Dark' theme.

```tsx
import { ReactBlackPlayer } from 'react-black-player';
import 'react-black-player/dist/style.css';

function App() {
  return (
    <ReactBlackPlayer
      sources={[
        {
          src: '/videos/my-video.mp4',
          type: 'video/mp4',
        },
      ]}
      themeConfig={{
        defaultTheme: 'Blue', // Choose from: 'Black-White', 'Dark', 'Light', 'Blue', 'Purple'
      }}
    />
  );
}
```

**Available Built-in Themes:**
- `'Black-White'` - Pure black background with white controls and text
- `'Dark'` - Modern dark with crimson accents (DEFAULT)
- `'Light'` - Clean light with blue accents
- `'Blue'` - Dark blue theme (#256ef4 / #346fb2)
- `'Purple'` - Deep purple royal theme

**When to use:** When you want a pre-designed look without creating custom colors, or when you want to let the player use its default 'Dark' theme.

---

### 3. Full Custom Theme with Theme Selector

For advanced use cases where you want to:
- Define multiple custom themes
- Allow users to switch themes via the settings menu
- Create themes with full control over all colors

```tsx
import { ReactBlackPlayer } from 'react-black-player';
import { defaultThemes } from 'react-black-player';
import type { Theme } from 'react-black-player';
import 'react-black-player/dist/style.css';

function App() {
  // Define your custom themes
  const brandTheme: Theme = {
    name: 'Brand Theme',
    primaryColor: '#1a1a2e',
    secondaryColor: '#16213e',
    backgroundColor: '#0f0f23',
    textColor: '#eaeaea',
    accentColor: '#e94560',
  };

  const oceanTheme: Theme = {
    name: 'Ocean',
    primaryColor: '#0d47a1',
    secondaryColor: '#42a5f5',
    backgroundColor: '#01579b',
    textColor: '#e1f5fe',
    accentColor: '#80d8ff',
  };

  return (
    <ReactBlackPlayer
      sources={[
        {
          src: '/videos/my-video.mp4',
          type: 'video/mp4',
        },
      ]}
      themeConfig={{
        showThemeSelector: true,              // Show theme picker in settings
        availableThemes: defaultThemes,       // Include all built-in themes
        customThemes: [brandTheme, oceanTheme], // Add your custom themes
        defaultTheme: 'Brand Theme',          // Set default theme by name
      }}
    />
  );
}
```

**When to use:** When you need:
- Multiple themes for users to choose from
- Full control over every color aspect
- Professional-grade theming with theme switching UI

---

## Theme Priority Order

The player uses this priority when determining which theme to apply:

1. **`defaultPrimaryColor` + `defaultSecondaryColor`** (Highest Priority)
   - If both are provided, creates a custom theme and uses it
   - Overrides any `defaultTheme` setting

2. **`defaultTheme` by name** (Medium Priority)
   - Uses the specified theme name from available or custom themes
   - Falls back to 'Dark' if theme name not found

3. **'Dark' theme** (Default Fallback)
   - Used when no configuration is provided

---

## Complete Example: All Options Combined

```tsx
import { ReactBlackPlayer } from 'react-black-player';
import { defaultThemes } from 'react-black-player';
import type { Theme } from 'react-black-player';
import 'react-black-player/dist/style.css';

function App() {
  const myCustomTheme: Theme = {
    name: 'My Custom',
    primaryColor: '#2E8B57',
    secondaryColor: '#FFD700',
    backgroundColor: '#2E8B57',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  };

  return (
    <ReactBlackPlayer
      sources={[
        {
          src: '/videos/my-video.mp4',
          type: 'video/mp4',
          poster: '/posters/my-poster.jpg',
        },
      ]}
      themeConfig={{
        // Option 1: Uncomment to use custom default colors (overrides everything else)
        // defaultPrimaryColor: '#256ef4',
        // defaultSecondaryColor: '#346fb2',
        
        // Option 2: Use a built-in theme by name
        defaultTheme: 'Dark',
        
        // Option 3: Advanced - custom themes with selector
        showThemeSelector: true,
        availableThemes: defaultThemes,
        customThemes: [myCustomTheme],
      }}
      onThemeChange={(theme) => {
        console.log('Theme changed to:', theme.name);
      }}
    />
  );
}
```

---

## Quick Reference

| Scenario | Configuration | Code Example |
|----------|---------------|--------------|
| **Brand your player** | Custom colors | `defaultPrimaryColor: '#256ef4', defaultSecondaryColor: '#346fb2'` |
| **Use default styling** | No config | *(omit themeConfig, uses 'Dark' theme)* |
| **Choose a built-in theme** | Built-in theme name | `defaultTheme: 'Blue'` |
| **Allow theme switching** | Full custom setup | `showThemeSelector: true, customThemes: [...]` |
| **Mix built-in + custom** | Combined config | `availableThemes: defaultThemes, customThemes: [myTheme]` |

---

## TypeScript Types

```typescript
interface ThemeConfig {
  // Simple custom colors (highest priority)
  defaultPrimaryColor?: string;
  defaultSecondaryColor?: string;
  
  // Built-in or custom theme selection
  defaultTheme?: string;
  
  // Advanced theming
  showThemeSelector?: boolean;
  availableThemes?: Theme[];
  customThemes?: Theme[];
}

interface Theme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}
```

---

## Tips

1. **For most developers:** Use Option 1 (`defaultPrimaryColor` + `defaultSecondaryColor`) - it's simple and effective.

2. **For quick prototyping:** Don't provide any theme config - the 'Dark' theme looks great out of the box.

3. **For apps with theme switching:** Use Option 3 with `showThemeSelector: true` to give users control.

4. **Text color is automatic:** When using custom colors, the player automatically chooses black or white text based on your primary color brightness.

5. **Accent color defaults to secondary:** If you don't specify an accent color, it will default to your secondary color.
