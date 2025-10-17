import React from 'react';
import type { Theme } from '../../types';

interface SpinnerProps {
  currentTheme?: Theme;
}

export const Spinner: React.FC<SpinnerProps> = ({ currentTheme }) => {
  return (
    <div className="w-16 h-16 rounded-full animate-spin" style={{
      borderTop: `4px solid ${currentTheme?.accentColor || currentTheme?.secondaryColor}`,
      borderRight: `4px solid ${currentTheme?.accentColor || currentTheme?.secondaryColor}`,
      borderBottom: `4px solid ${currentTheme?.accentColor || currentTheme?.secondaryColor}`,
      borderLeft: `4px solid transparent`,
    }}></div>
  );
};
