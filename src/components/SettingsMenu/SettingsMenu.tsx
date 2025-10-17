import React, { useState } from 'react';
import {
  ChevronDown,
  Palette,
} from 'lucide-react';
import type { Theme, SubtitleTrack, ThemeConfig, TextLabels } from '../../types';

interface SettingsMenuProps {
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
  currentTheme: Theme;
  textLabels: TextLabels;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
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
  currentTheme,
  textLabels,
}) => {
  const [speedDropdownOpen, setSpeedDropdownOpen] = useState(true);
  const [subtitleDropdownOpen, setSubtitleDropdownOpen] = useState(false);
  const [qualityDropdownOpen, setQualityDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  if (!showSettingsMenu) {
    return null;
  }

  return (
    <div 
      className="absolute bottom-full right-0 mb-2 rounded-lg overflow-hidden min-w-[200px] max-h-[400px] overflow-y-auto settings-scrollbar"
      style={{
        backgroundColor: `${currentTheme.primaryColor}F2`
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Playback Speed */}
      <div className="border-b" style={{ borderColor: `${currentTheme.textColor}40` }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            const newState = !speedDropdownOpen;
            setSpeedDropdownOpen(newState);
            if (newState) {
              setSubtitleDropdownOpen(false);
              setQualityDropdownOpen(false);
              setThemeDropdownOpen(false);
            }
          }}
          className="w-full px-4 py-2 flex items-center justify-between text-xs transition-colors"
          style={{ color: `${currentTheme.textColor}80` }}
        >
          <span>{textLabels.speed}</span>
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-200 ${speedDropdownOpen ? 'rotate-180' : ''}`}
            strokeWidth={1}
          />
        </button>
        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: speedDropdownOpen ? '400px' : '0' }}>
        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
          <button
            key={rate}
            onClick={(e) => {
              e.stopPropagation();
              changePlaybackRate(rate);
            }}
            className="w-full px-4 py-2 text-left text-sm transition-colors"
            style={{
              color: playbackRate === rate ? (currentTheme.accentColor || currentTheme.secondaryColor) : currentTheme.textColor,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${currentTheme.accentColor || currentTheme.secondaryColor}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {rate}x {rate === 1 && '(Normal)'}
          </button>
        ))}
        </div>
      </div>

      {/* Subtitles */}
      {showSubtitles && currentSubtitles.length > 0 && (
        <div className="border-b" style={{ borderColor: `${currentTheme.textColor}40` }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newState = !subtitleDropdownOpen;
              setSubtitleDropdownOpen(newState);
              if (newState) {
                setSpeedDropdownOpen(false);
                setQualityDropdownOpen(false);
                setThemeDropdownOpen(false);
              }
            }}
            className="w-full px-4 py-2 flex items-center justify-between text-xs transition-colors"
            style={{ color: `${currentTheme.textColor}80` }}
          >
            <span>{textLabels.subtitles}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${subtitleDropdownOpen ? 'rotate-180' : ''}`}
              strokeWidth={1}
            />
          </button>
          <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: subtitleDropdownOpen ? '400px' : '0' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubtitleChange(-1);
                }}
                className="w-full px-4 py-2 text-left text-sm transition-colors"
                style={{
                  color: activeSubtitle === -1 ? (currentTheme.accentColor || currentTheme.secondaryColor) : currentTheme.textColor,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${currentTheme.accentColor || currentTheme.secondaryColor}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Off
              </button>
              {currentSubtitles.map((subtitle, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubtitleChange(index);
                  }}
                  className="w-full px-4 py-2 text-left text-sm transition-colors"
                  style={{
                    color: activeSubtitle === index ? (currentTheme.accentColor || currentTheme.secondaryColor) : currentTheme.textColor,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${currentTheme.accentColor || currentTheme.secondaryColor}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {subtitle.label}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Quality */}
      {showQuality && uniqueQualities.length > 1 && (
        <div className="border-b" style={{ borderColor: `${currentTheme.textColor}40` }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newState = !qualityDropdownOpen;
              setQualityDropdownOpen(newState);
              if (newState) {
                setSpeedDropdownOpen(false);
                setSubtitleDropdownOpen(false);
                setThemeDropdownOpen(false);
              }
            }}
            className="w-full px-4 py-2 flex items-center justify-between text-xs transition-colors"
            style={{ color: `${currentTheme.textColor}80` }}
          >
            <span>{textLabels.quality}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${qualityDropdownOpen ? 'rotate-180' : ''}`}
              strokeWidth={1}
            />
          </button>
          <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: qualityDropdownOpen ? '400px' : '0' }}>
          {uniqueQualities.map((quality) => (
            <button
              key={quality}
              onClick={(e) => {
                e.stopPropagation();
                handleQualityChange(quality);
              }}
              className="w-full px-4 py-2 text-left text-sm transition-colors capitalize"
              style={{
                color: currentQuality === quality ? (currentTheme.accentColor || currentTheme.secondaryColor) : currentTheme.textColor,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${currentTheme.accentColor || currentTheme.secondaryColor}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {quality}
            </button>
          ))}
          </div>
        </div>
      )}

      {/* Theme Selector */}
      {themeConfig?.showThemeSelector !== false && (
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newState = !themeDropdownOpen;
              setThemeDropdownOpen(newState);
              if (newState) {
                setSpeedDropdownOpen(false);
                setSubtitleDropdownOpen(false);
                setQualityDropdownOpen(false);
              }
            }}
            className="w-full px-4 py-2 flex items-center justify-between text-xs transition-colors"
            style={{ color: `${currentTheme.textColor}80` }}
          >
            <span>{textLabels.theme}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${themeDropdownOpen ? 'rotate-180' : ''}`}
              strokeWidth={1}
            />
          </button>
          <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: themeDropdownOpen ? '400px' : '0' }}>
          {availableThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme)}
              className="w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2"
              style={{
                color: currentTheme.name === theme.name ? (currentTheme.accentColor || currentTheme.secondaryColor) : currentTheme.textColor,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${currentTheme.accentColor || currentTheme.secondaryColor}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Palette className="w-4 h-4" strokeWidth={1} />
              {theme.name}
            </button>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};
