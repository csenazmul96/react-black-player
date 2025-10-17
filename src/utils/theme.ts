import type { Theme } from '../types';

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
    '--player-accent-hover-bg': `${theme.accentColor || theme.secondaryColor}20`,
    '--player-accent-active-bg': `${theme.accentColor || theme.secondaryColor}33`,
  };
};

// Apply theme styles to an element
export const applyThemeToElement = (element: HTMLElement, theme: Theme): void => {
  const variables = generateThemeVariables(theme);
  Object.entries(variables).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });
};
