/**
 * Theme Configuration Test Examples
 * Copy and test these in your demo/main.tsx file
 */

import React from 'react';
import { ReactBlackPlayer } from './src/ReactBlackPlayer';
import type { VideoSource, Theme } from './src/types';
import { defaultThemes } from './src/themes';

// Sample video source for all examples
const sampleSource: VideoSource[] = [
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    type: 'video/mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  },
];

// ============================================================================
// EXAMPLE 1: Simple Custom Colors (Recommended for Most Developers)
// ============================================================================
export const Example1_SimpleCustomColors = () => {
  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4">Example 1: Simple Custom Colors</h2>
      <p className="text-gray-400 mb-4">
        Just provide your brand colors - the player handles the rest!
      </p>
      <ReactBlackPlayer
        sources={sampleSource}
        themeConfig={{
          defaultPrimaryColor: '#256ef4',  // Your brand primary
          defaultSecondaryColor: '#346fb2', // Your brand secondary
        }}
      />
    </div>
  );
};

// ============================================================================
// EXAMPLE 2: Use Built-in Theme by Name
// ============================================================================
export const Example2_BuiltInTheme = () => {
  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4">Example 2: Built-in Theme</h2>
      <p className="text-gray-400 mb-4">
        Choose from 5 built-in themes: Black-White, Dark, Light, Blue, Purple
      </p>
      <ReactBlackPlayer
        sources={sampleSource}
        themeConfig={{
          defaultTheme: 'Blue', // Now uses the updated Blue theme!
        }}
      />
    </div>
  );
};

// ============================================================================
// EXAMPLE 3: Default - No Configuration
// ============================================================================
export const Example3_NoConfiguration = () => {
  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4">Example 3: No Configuration (Default)</h2>
      <p className="text-gray-400 mb-4">
        When no theme config is provided, uses the 'Dark' theme by default
      </p>
      <ReactBlackPlayer sources={sampleSource} />
    </div>
  );
};

// ============================================================================
// EXAMPLE 4: Full Custom Theme with Theme Selector
// ============================================================================
export const Example4_CustomThemeWithSelector = () => {
  const myCustomTheme: Theme = {
    name: 'My Brand',
    primaryColor: '#2E8B57',
    secondaryColor: '#FFD700',
    backgroundColor: '#2E8B57',
    textColor: '#FFFFFF',
    accentColor: '#FFD700',
  };

  const oceanTheme: Theme = {
    name: 'Ocean Breeze',
    primaryColor: '#0d47a1',
    secondaryColor: '#42a5f5',
    backgroundColor: '#01579b',
    textColor: '#e1f5fe',
    accentColor: '#80d8ff',
  };

  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4">Example 4: Custom Themes with Selector</h2>
      <p className="text-gray-400 mb-4">
        Multiple themes with a theme selector in the settings menu
      </p>
      <ReactBlackPlayer
        sources={sampleSource}
        themeConfig={{
          showThemeSelector: true,
          availableThemes: defaultThemes,
          customThemes: [myCustomTheme, oceanTheme],
          defaultTheme: 'My Brand',
        }}
        onThemeChange={(theme) => {
          console.log('Theme changed to:', theme.name);
        }}
      />
    </div>
  );
};

// ============================================================================
// EXAMPLE 5: Priority Test - Custom Colors Override Named Theme
// ============================================================================
export const Example5_PriorityTest = () => {
  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4">Example 5: Priority Test</h2>
      <p className="text-gray-400 mb-4">
        Custom colors have highest priority - even though defaultTheme is 'Purple',
        the player will use the custom colors instead
      </p>
      <ReactBlackPlayer
        sources={sampleSource}
        themeConfig={{
          defaultPrimaryColor: '#ff0066',  // This will be used
          defaultSecondaryColor: '#00ccff', // This will be used
          defaultTheme: 'Purple',           // This will be ignored
        }}
      />
    </div>
  );
};

// ============================================================================
// EXAMPLE 6: All Options Combined (Kitchen Sink)
// ============================================================================
export const Example6_AllOptions = () => {
  const customTheme1: Theme = {
    name: 'Sunset',
    primaryColor: '#FF6B35',
    secondaryColor: '#F7931E',
    backgroundColor: '#C9184A',
    textColor: '#FFF5E1',
    accentColor: '#FFD23F',
  };

  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4">Example 6: All Options Combined</h2>
      <p className="text-gray-400 mb-4">
        Demonstrating all theme configuration options together
      </p>
      <ReactBlackPlayer
        sources={sampleSource}
        themeConfig={{
          // Option 1: Custom colors (comment out to test other options)
          // defaultPrimaryColor: '#256ef4',
          // defaultSecondaryColor: '#346fb2',
          
          // Option 2: Named theme
          defaultTheme: 'Dark',
          
          // Option 3: Theme selector with custom themes
          showThemeSelector: true,
          availableThemes: defaultThemes,
          customThemes: [customTheme1],
        }}
        onThemeChange={(theme) => {
          console.log('Theme changed to:', theme.name);
          console.log('Colors:', {
            primary: theme.primaryColor,
            secondary: theme.secondaryColor,
            accent: theme.accentColor,
          });
        }}
      />
    </div>
  );
};

// ============================================================================
// EXAMPLE 7: Light Background Custom Colors
// ============================================================================
export const Example7_LightCustomColors = () => {
  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4">Example 7: Light Colors with Auto Text</h2>
      <p className="text-gray-400 mb-4">
        Using light primary color - text color automatically changes to dark for readability
      </p>
      <ReactBlackPlayer
        sources={sampleSource}
        themeConfig={{
          defaultPrimaryColor: '#f0f0f0',  // Light background
          defaultSecondaryColor: '#2563eb', // Blue accent
        }}
      />
    </div>
  );
};

// ============================================================================
// Usage in your demo/main.tsx:
// ============================================================================
/*

import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Example1_SimpleCustomColors,
  Example2_BuiltInTheme,
  Example3_NoConfiguration,
  Example4_CustomThemeWithSelector,
  Example5_PriorityTest,
  Example6_AllOptions,
  Example7_LightCustomColors,
} from './THEME_TEST_EXAMPLES';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-white text-4xl font-bold text-center mb-8">
          React Black Player - Theme Tests
        </h1>
        
        {/* Test all examples */}
        <Example1_SimpleCustomColors />
        <hr className="border-gray-700" />
        
        <Example2_BuiltInTheme />
        <hr className="border-gray-700" />
        
        <Example3_NoConfiguration />
        <hr className="border-gray-700" />
        
        <Example4_CustomThemeWithSelector />
        <hr className="border-gray-700" />
        
        <Example5_PriorityTest />
        <hr className="border-gray-700" />
        
        <Example6_AllOptions />
        <hr className="border-gray-700" />
        
        <Example7_LightCustomColors />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

*/
