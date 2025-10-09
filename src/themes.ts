import type { Theme } from './types';

// Default predefined themes
export const defaultThemes: Theme[] = [
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
    primaryColor: '#1e293b',
    secondaryColor: '#3b82f6',
    backgroundColor: '#0f172a',
    textColor: '#e2e8f0',
    accentColor: '#60a5fa',
  },
  {
    name: 'Green',
    primaryColor: '#14532d',
    secondaryColor: '#16a34a',
    backgroundColor: '#052e16',
    textColor: '#dcfce7',
    accentColor: '#22c55e',
  },
  {
    name: 'Purple',
    primaryColor: '#581c87',
    secondaryColor: '#a855f7',
    backgroundColor: '#2e1065',
    textColor: '#e9d5ff',
    accentColor: '#c084fc',
  },
  {
    name: 'Orange',
    primaryColor: '#9a3412',
    secondaryColor: '#ea580c',
    backgroundColor: '#431407',
    textColor: '#fed7aa',
    accentColor: '#fb923c',
  },
];

// Utility functions for theme management
export const getThemeByName = (themes: Theme[], name: string): Theme | undefined => {
  return themes.find(theme => theme.name.toLowerCase() === name.toLowerCase());
};

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

// Helper function to determine if a color is light or dark
export const isLightColor = (color: string): boolean => {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

// Generate CSS variables for a theme
export const generateThemeVariables = (theme: Theme): { [key: string]: string } => {
  return {
    '--player-primary': theme.primaryColor,
    '--player-secondary': theme.secondaryColor,
    '--player-bg': theme.backgroundColor || theme.primaryColor,
    '--player-text': theme.textColor || (isLightColor(theme.primaryColor) ? '#1f2937' : '#ffffff'),
    '--player-accent': theme.accentColor || theme.secondaryColor,
  };
};

// Apply theme styles to an element
export const applyThemeToElement = (element: HTMLElement, theme: Theme): void => {
  const variables = generateThemeVariables(theme);
  Object.entries(variables).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
};