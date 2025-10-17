import React from 'react';
import type { PlaylistItem as PlaylistItemType, Theme } from '../../types';
import { PlaylistItem } from './PlaylistItem';

interface PlaylistProps {
  playlist: PlaylistItemType[];
  currentPlaylistIndex: number;
  selectPlaylistItem: (index: number) => void;
  showPlaylistSidebar: boolean;
  setShowPlaylistSidebar: (show: boolean) => void;
  isAudio: boolean;
  currentTheme: Theme;
  textLabels: any;
  playlistDurations: { [key: string]: number };
  formatTime: (time: number) => string;
}

export const Playlist: React.FC<PlaylistProps> = ({
  playlist,
  currentPlaylistIndex,
  selectPlaylistItem,
  showPlaylistSidebar,
  setShowPlaylistSidebar,
  isAudio,
  currentTheme,
  textLabels,
  playlistDurations,
  formatTime,
}) => {
  return (
    isAudio ? (
      // Modal for Audio
      <div
        className={`absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md transition-opacity duration-300 ease-in-out ${showPlaylistSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowPlaylistSidebar(false)}
      >
        <div 
          className="w-[90%] max-w-md rounded-lg shadow-xl flex flex-col overflow-hidden"
          style={{
            backgroundColor: currentTheme.backgroundColor || currentTheme.primaryColor,
            maxHeight: '80vh',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 py-3 border-b flex justify-between items-center" style={{ borderColor: `${currentTheme.textColor}20` }}>
            <h3 className="font-semibold" style={{ color: currentTheme.textColor }}>{textLabels.playlist}</h3>
            <button 
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto playlist-scrollbar">
            {playlist.map((item, index) => (
              <PlaylistItem
                key={item.id}
                item={item}
                isActive={index === currentPlaylistIndex}
                onClick={() => selectPlaylistItem(index)}
                currentTheme={currentTheme}
                duration={playlistDurations[item.id]}
                formatTime={formatTime}
              />
            ))}
          </div>
        </div>
      </div>
    ) : (
      // Sidebar for Video (Enhanced)
      <div
        className={`absolute top-0 right-0 bottom-0 w-80 transform transition-transform duration-300 ease-in-out z-30 backdrop-blur-md ${showPlaylistSidebar ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
        style={{
          backgroundColor: `${currentTheme.backgroundColor || currentTheme.primaryColor}E6`,
          borderColor: `${currentTheme.textColor}20`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-3 border-b flex justify-between items-center" style={{ borderColor: `${currentTheme.textColor}20` }}>
            <h3 className="font-semibold" style={{ color: currentTheme.textColor }}>{textLabels.playlist}</h3>
            <button 
              onClick={() => setShowPlaylistSidebar(false)} 
              className="p-1 rounded-full transition-colors" 
              style={{ color: currentTheme.textColor }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${currentTheme.accentColor || currentTheme.secondaryColor}33`; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto playlist-scrollbar">
            {playlist.map((item, index) => (
              <PlaylistItem
                key={item.id}
                item={item}
                isActive={index === currentPlaylistIndex}
                onClick={() => selectPlaylistItem(index)}
                currentTheme={currentTheme}
                duration={playlistDurations[item.id]}
                formatTime={formatTime}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};
