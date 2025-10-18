import React from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Square, // Added Square icon
  PictureInPicture,
  ListMusic,
} from 'lucide-react';
import type { Theme, SubtitleTrack, ThemeConfig, TextLabels } from '../../types';
import { SettingsMenu } from '../SettingsMenu';

interface PlayerControlsProps {
  isPlaying: boolean;
  isVideoEnded: boolean;
  togglePlay: () => void;
  showNextPrev: boolean;
  playlist: any[];
  currentPlaylistIndex: number; // Add this line
  playPreviousVideo: () => void;
  playNextVideo: () => void;
  showVolume: boolean;
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  handleVolumeChange: (volume: number) => void;
  showTime: boolean;
  currentTime: number;
  duration: number;
  formatTime: (time: number) => string;
  showPictureInPicture: boolean;
  isAudio: boolean;
  togglePictureInPicture: () => void;
  isPictureInPicture: boolean;
  showSettings: boolean;
  setShowSettingsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showPlaylist: boolean;
  setShowPlaylistSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
  currentTheme: Theme;
  closePlaylistOnControlClick: () => void;
  showSettingsMenu: boolean;
  changePlaybackRate: (rate: number) => void;
  playbackRate: number;
  showSubtitles: boolean;
  currentSubtitles: SubtitleTrack[];
  activeSubtitle: number;
  handleSubtitleChange: (index: number) => void;
  showQuality: boolean;
  uniqueQualities: string[];
  currentQuality: string;
  handleQualityChange: (quality: string) => void;
  themeConfig?: ThemeConfig;
  availableThemes: Theme[];
  handleThemeChange: (theme: Theme) => void;
  textLabels: TextLabels;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  isVideoEnded,
  togglePlay,
  showNextPrev,
  playlist,
  currentPlaylistIndex, // Add this line
  playPreviousVideo,
  playNextVideo,
  showVolume,
  isMuted,
  volume,
  toggleMute,
  handleVolumeChange,
  showTime,
  currentTime,
  duration,
  formatTime,
  showPictureInPicture,
  isAudio,
  togglePictureInPicture,
  isPictureInPicture,
  showSettings,
  setShowSettingsMenu,
  showPlaylist,
  setShowPlaylistSidebar,
  toggleFullscreen,
  isFullscreen,
  currentTheme,
  closePlaylistOnControlClick,
  showSettingsMenu,
  changePlaybackRate,
  playbackRate,
  showSubtitles,
  currentSubtitles,
  activeSubtitle,
  handleSubtitleChange,
  showQuality,
  uniqueQualities,
  currentQuality,
  handleQualityChange,
  themeConfig,
  availableThemes,
  handleThemeChange,
  textLabels,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3" onClick={closePlaylistOnControlClick}>
      <div className="flex items-center gap-4">
        {/* Play/Pause/Replay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="transition-colors rounded-full w-12 h-12 flex items-center justify-center"
          style={{ 
            backgroundColor: `${currentTheme.primaryColor}B3`, /* Use opacity for background */
            color: currentTheme.textColor || '#FFFFFF', /* Ensure text color is always a string */
          }}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" strokeWidth={1} />
          ) : isVideoEnded ? (
            <Square className="w-8 h-8" strokeWidth={1.5} />
          ) : (
            <Play className="w-8 h-8" strokeWidth={1} />
          )}
        </button>

        {/* Previous/Next */}
        {showNextPrev && playlist.length > 0 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                playPreviousVideo();
              }}
              className="transition-colors disabled:opacity-50"
              style={{ color: currentTheme.textColor }}
              disabled={currentPlaylistIndex === 0}
              onMouseEnter={(e) => {
                if (currentPlaylistIndex !== 0) {
                  e.currentTarget.style.color = currentTheme.accentColor || currentTheme.secondaryColor;
                }
              }}
              onMouseLeave={(e) => {
                  if (currentTheme.textColor != null) {
                      e.currentTarget.style.color = currentTheme.textColor;
                  }
              }}
            >
              <SkipBack className="w-5 h-5" strokeWidth={1} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                playNextVideo();
              }}
              className="transition-colors disabled:opacity-50"
              style={{ color: currentTheme.textColor }}
              disabled={currentPlaylistIndex === playlist.length - 1}
              onMouseEnter={(e) => {
                if (currentPlaylistIndex !== playlist.length - 1) {
                  e.currentTarget.style.color = currentTheme.accentColor || currentTheme.secondaryColor;
                }
              }}
              onMouseLeave={(e) => {
                  if (currentTheme.textColor != null) {
                      e.currentTarget.style.color = currentTheme.textColor;
                  }
              }}
            >
              <SkipForward className="w-5 h-5" strokeWidth={1} />
            </button>
          </>
        )}

        {/* Volume */}
        {showVolume && (
          <div className="flex items-center gap-2 group">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="transition-colors"
              style={{ color: currentTheme.textColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.accentColor || currentTheme.secondaryColor;
              }}
              onMouseLeave={(e) => {
                  if (currentTheme.textColor != null) {
                      e.currentTarget.style.color = currentTheme.textColor;
                  }
              }}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" strokeWidth={1} />
              ) : (
                <Volume2 className="w-5 h-5" strokeWidth={1} />
              )}
            </button>
            {/* Horizontal volume slider */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="w-20"
                style={{
                  height: '4px',
                  background: `linear-gradient(to right, ${currentTheme.accentColor || currentTheme.secondaryColor} ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%)`,
                  color: currentTheme.accentColor || currentTheme.secondaryColor
                }}
              />
              <div className="text-xs min-w-[32px]" style={{ color: currentTheme.textColor }}>
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Time */}
        {showTime && (
          <div className="text-sm" style={{ color: currentTheme.textColor }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        )}

        {/* Picture-in-Picture */}
        {showPictureInPicture && !isAudio && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePictureInPicture();
            }}
            className="transition-colors"
            style={{ color: isPictureInPicture ? (currentTheme.accentColor || currentTheme.secondaryColor) : currentTheme.textColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentTheme.accentColor || currentTheme.secondaryColor;
            }}
            onMouseLeave={(e) => {
                if (currentTheme.textColor != null && !isPictureInPicture) {
                    e.currentTarget.style.color = currentTheme.textColor;
                } else if (isPictureInPicture) {
                    e.currentTarget.style.color = currentTheme.accentColor || currentTheme.secondaryColor;
                }
            }}
            title="Picture-in-Picture"
          >
            <PictureInPicture className="w-5 h-5" strokeWidth={1} />
          </button>
        )}

        {/* Settings */}
        {showSettings && !isAudio && (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSettingsMenu((prev: boolean) => !prev);
              }}
              className="transition-colors"
              style={{ color: currentTheme.textColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.accentColor || currentTheme.secondaryColor;
              }}
              onMouseLeave={(e) => {
                  if (currentTheme.textColor != null) {
                      e.currentTarget.style.color = currentTheme.textColor;
                  }
              }}
            >
              <Settings className="w-5 h-5" strokeWidth={1} />
            </button>

            <SettingsMenu
              showSettingsMenu={showSettingsMenu}
              changePlaybackRate={changePlaybackRate}
              playbackRate={playbackRate}
              showSubtitles={showSubtitles}
              currentSubtitles={currentSubtitles}
              activeSubtitle={activeSubtitle}
              handleSubtitleChange={handleSubtitleChange}
              showQuality={showQuality}
              uniqueQualities={uniqueQualities}
              currentQuality={currentQuality}
              handleQualityChange={handleQualityChange}
              themeConfig={themeConfig}
              availableThemes={availableThemes}
              handleThemeChange={handleThemeChange}
              currentTheme={currentTheme}
              textLabels={textLabels}
            />

          </div>
        )}

        {/* Playlist Toggle */}
        {showPlaylist && playlist.length > 0 && (
          <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPlaylistSidebar((prev: boolean) => !prev);
              }}
            className="transition-colors"
            style={{ color: currentTheme.textColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentTheme.accentColor || currentTheme.secondaryColor;
            }}
            onMouseLeave={(e) => {
                if (currentTheme.textColor != null) {
                    e.currentTarget.style.color = currentTheme.textColor;
                }
            }}
          >
            <ListMusic className="w-5 h-5" strokeWidth={1} />
          </button>
        )}

        {/* Fullscreen */}
        {!isAudio && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            className="transition-colors"
            style={{ color: currentTheme.textColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = currentTheme.accentColor || currentTheme.secondaryColor;
            }}
            onMouseLeave={(e) => {
                if (currentTheme.textColor != null) {
                    e.currentTarget.style.color = currentTheme.textColor;
                }
            }}
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5" strokeWidth={1} />
            ) : (
              <Maximize className="w-5 h-5" strokeWidth={1} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
