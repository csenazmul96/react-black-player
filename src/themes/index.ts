import type { Theme } from '../types';
import { isLightColor } from '../utils/theme';

// Default predefined themes
export const defaultThemes: Theme[] = [
  {
    name: 'Black-White',
    primaryColor: '#000000',      // Black background
    secondaryColor: '#ffffff',    // White accents
    backgroundColor: '#000000',   // Black background
    textColor: '#ffffff',         // White text
    accentColor: '#ffffff',       // White accents
  },
  {
    name: 'Dark',
    primaryColor: '#000000',
    secondaryColor: '#dc143c',
    backgroundColor: '#000000',
    textColor: '#ffffff',
    accentColor: '#dc143c',
  },
  {
    name: 'Light',
    primaryColor: '#ffffff',
    secondaryColor: '#2563eb',
    backgroundColor: '#f9fafb',
    textColor: '#1f2937',
    accentColor: '#2563eb',
  },
  {
    name: 'Blue',
    primaryColor: '#256ef4',
    secondaryColor: '#346fb2',
    backgroundColor: '#1a1a2e',
    textColor: '#e2e8f0',
    accentColor: '#4d8fff',
  },
  {
    name: 'Purple',
    primaryColor: '#581c87',
    secondaryColor: '#a855f7',
    backgroundColor: '#2e1065',
    textColor: '#e9d5ff',
    accentColor: '#c084fc',
  },
];

export const createCustomTheme = (name: string, primaryColor: string, secondaryColor: string): Theme => {
  return {
    name,
    primaryColor,
    secondaryColor,
    backgroundColor: primaryColor,
    textColor: isLightColor(primaryColor) ? '#1f2937' : '#ffffff',
    accentColor: secondaryColor,
  };
};