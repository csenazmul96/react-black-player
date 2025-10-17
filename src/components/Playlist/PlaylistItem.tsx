import React from 'react';
import type { PlaylistItem as PlaylistItemType, Theme } from '../../types';
import { Image as ImageIcon } from 'lucide-react';

interface PlaylistItemProps {
  item: PlaylistItemType;
  isActive: boolean;
  onClick: () => void;
  currentTheme: Theme;
  duration: number;
  formatTime: (time: number) => string;
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({
  item,
  isActive,
  onClick,
  currentTheme,
  duration,
  formatTime,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer border-b playlist-item ${isActive ? 'active' : ''}`}
      style={{
        borderColor: `${currentTheme.textColor}20`,
      }}
    >
      <div className="flex gap-4 items-center">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-12 object-cover rounded-md flex-shrink-0"
          />
        ) : (
          <div 
            className="w-20 h-12 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${currentTheme.textColor}20` }}
          >
            <ImageIcon 
              className="w-6 h-6"
              style={{ color: `${currentTheme.textColor}80` }}
              strokeWidth={1}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div
            className="font-semibold truncate"
            style={{
              color: isActive ? (currentTheme.accentColor || currentTheme.secondaryColor) : currentTheme.textColor
            }}
          >
            {item.title}
          </div>
          <div className="text-xs mt-1 flex items-center gap-2" style={{ color: `${currentTheme.textColor}80` }}>
            <span>
              {duration ? formatTime(duration) : '...'}
            </span>
            {isActive && (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: currentTheme.accentColor || currentTheme.secondaryColor }}></div>
                <span>Now Playing</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
