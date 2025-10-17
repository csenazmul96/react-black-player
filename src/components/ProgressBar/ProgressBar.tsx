import React from 'react';
import type { Theme } from '../../types';

interface ProgressBarProps {
  progressBarRef: React.RefObject<HTMLDivElement>;
  currentTime: number;
  duration: number;
  seekPreviewTime: number | null;
  isDraggingProgress: React.MutableRefObject<boolean>;
  handleProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleProgressMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  currentTheme: Theme;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressBarRef,
  currentTime,
  duration,
  seekPreviewTime,
  isDraggingProgress,
  handleProgressClick,
  handleProgressMouseDown,
  currentTheme,
}) => {
  return (
    <div className="px-4">
      <div
        ref={progressBarRef}
        className="w-full h-1 cursor-pointer group"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
        onClick={handleProgressClick}
        onMouseDown={handleProgressMouseDown}
      >
        <div
          className="h-full relative group-hover:h-2 pointer-events-none"
          style={{
            width: `${((seekPreviewTime ?? currentTime) / duration) * 100 || 0}%`,
            backgroundColor: currentTheme.accentColor || currentTheme.secondaryColor,
            transition: isDraggingProgress.current ? 'none' : 'width 0.1s linear',
          }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              backgroundColor: currentTheme.accentColor || currentTheme.secondaryColor,
              opacity: isDraggingProgress.current ? 1 : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};
