import React, { useRef, useState, useEffect, useCallback } from 'react';
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
  ChevronLeft,
  ChevronDown,
  Palette,
} from 'lucide-react';
import Hls from 'hls.js';
import type { ReactBlackPlayerProps, Theme } from './types';
import { defaultThemes, getThemeByName, applyThemeToElement } from './themes';
import './styles.css';

export const ReactBlackPlayer: React.FC<ReactBlackPlayerProps> = ({
  sources,
  poster,
  className = '',
  subtitles = [],
  showTime = true,
  showVolume = true,
  showSettings = true,
  showQuality = true,
  showSubtitles = true,
  showPlaylist = true,
  showNextPrev = true,
  playlist = [],
  autoPlayNext = true,
  autoPlay = false,
  muted = false,
  loop = false,
  preload = 'metadata',
  width = '100%',
  height = 'auto',
  aspectRatio = '16/9',
  themeConfig,
  onPlay,
  onPause,
  onEnded,
  onSeeked,
  onSeeking,
  onTimeUpdate,
  onVolumeChange,
  onQualityChange,
  onPlaybackRateChange,
  onFullscreenChange,
  onPlaylistItemChange,
  onThemeChange,
  onError,
  onLoadedMetadata,
  onCanPlay,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const isChangingQuality = useRef<boolean>(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDraggingProgress = useRef<boolean>(false);
  const isSeeking = useRef<boolean>(false);

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekPreviewTime, setSeekPreviewTime] = useState<number | null>(null);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentQuality, setCurrentQuality] = useState<string>('auto');
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showPlaylistSidebar, setShowPlaylistSidebar] = useState(false);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [currentSources, setCurrentSources] = useState(sources);
  const [currentSubtitles, setCurrentSubtitles] = useState(subtitles);
  const [activeSubtitle, setActiveSubtitle] = useState<number>(-1);
  const [preferredSubtitleLanguage, setPreferredSubtitleLanguage] = useState<string | null>(null);
  const [showCenterPlay, setShowCenterPlay] = useState(!autoPlay);
  const [videoObjectFit, setVideoObjectFit] = useState<'contain' | 'cover'>('contain');
  
  // Settings dropdown states
  const [speedDropdownOpen, setSpeedDropdownOpen] = useState(true);
  const [subtitleDropdownOpen, setSubtitleDropdownOpen] = useState(false);
  const [qualityDropdownOpen, setQualityDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  // Theme state
  const availableThemes = [...(themeConfig?.availableThemes || defaultThemes), ...(themeConfig?.customThemes || [])];
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if (themeConfig?.defaultTheme) {
      return getThemeByName(availableThemes, themeConfig.defaultTheme) || availableThemes[0];
    }
    return availableThemes[0]; // Default to first theme (Dark)
  });

  // Initialize HLS if needed
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mainSource = currentSources[0];
    if (!mainSource) return;

    // Reset state when source changes
    setIsPlaying(false);
    setShowCenterPlay(!autoPlay);
    setCurrentTime(0);
    setDuration(0);
    setVideoObjectFit('contain'); // Always use contain to show full video

    // Check if source is m3u8
    const isHLS = mainSource.src.includes('.m3u8') || mainSource.type === 'application/x-mpegURL';

    if (isHLS) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(mainSource.src);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            onError?.(data);
          }
        });

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = mainSource.src;
      }
    } else {
      video.src = mainSource.src;
    }
  }, [currentSources, onError, autoPlay]);

  // Apply theme to container
  useEffect(() => {
    const container = containerRef.current;
    if (container && currentTheme) {
      applyThemeToElement(container, currentTheme);
    }
  }, [currentTheme]);

  // Theme handlers
  const handleThemeChange = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    setShowSettingsMenu(false);
    onThemeChange?.(theme);
  }, [onThemeChange]);

  // Auto-hide controls
  const resetHideControlsTimer = useCallback(() => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    setShowControls(true);
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }, [isPlaying]);

  const handleMouseMove = useCallback(() => {
    resetHideControlsTimer();
  }, [resetHideControlsTimer]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      setShowControls(false);
    }
    // Close playlist when mouse leaves player
    if (showPlaylistSidebar) {
      setShowPlaylistSidebar(false);
    }
    // Close settings menu when mouse leaves player
    if (showSettingsMenu) {
      setShowSettingsMenu(false);
    }
  }, [isPlaying, showPlaylistSidebar, showSettingsMenu]);

  // Play/Pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Close playlist if open
    if (showPlaylistSidebar) {
      setShowPlaylistSidebar(false);
    }

    if (video.paused) {
      video.play().then(() => {
        onPlay?.();
      }).catch((error) => {
        console.error('Error playing video:', error);
        setIsPlaying(false);
        setShowCenterPlay(true);
      });
    } else {
      video.pause();
      onPause?.();
    }
  }, [onPlay, onPause, showPlaylistSidebar]);

  // Volume control
  const handleVolumeChange = useCallback((newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    onVolumeChange?.(newVolume, newVolume === 0);
  }, [onVolumeChange]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
    onVolumeChange?.(volume, newMuted);
  }, [isMuted, volume, onVolumeChange]);

  // Progress bar handling with drag support and instant visual feedback
  const updateProgress = useCallback((clientX: number, isPreview: boolean = false) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!video || !progressBar || !duration) return;

    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = pos * duration;

    if (isPreview) {
      // Just update the preview time for instant visual feedback
      setSeekPreviewTime(newTime);
    } else {
      // Actually seek the video and update currentTime immediately
      isSeeking.current = true;
      setCurrentTime(newTime); // Update UI immediately
      video.currentTime = newTime;
      setSeekPreviewTime(null);
      
      // Clear seeking flag after a short delay to allow video to catch up
      setTimeout(() => {
        isSeeking.current = false;
      }, 100);
    }
  }, [duration]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    updateProgress(e.clientX, false);
    onSeeked?.();
  }, [updateProgress, onSeeked]);

  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingProgress.current = true;
    updateProgress(e.clientX, true);
    e.preventDefault();
  }, [updateProgress]);

  const handleProgressMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingProgress.current) return;
    updateProgress(e.clientX, true);
  }, [updateProgress]);

  const handleProgressMouseUp = useCallback((e: MouseEvent) => {
    if (isDraggingProgress.current) {
      isDraggingProgress.current = false;
      updateProgress(e.clientX, false);
      setSeekPreviewTime(null);
      onSeeked?.();
    }
  }, [updateProgress, onSeeked]);

  // Add global mouse event listeners for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleProgressMouseMove(e);
    const handleMouseUp = (e: MouseEvent) => handleProgressMouseUp(e);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleProgressMouseMove, handleProgressMouseUp]);

  // Playback rate
  const changePlaybackRate = useCallback((rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettingsMenu(false);
    onPlaybackRateChange?.(rate);
  }, [onPlaybackRateChange]);

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
      onFullscreenChange?.(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
      onFullscreenChange?.(false);
    }
  }, [onFullscreenChange]);

  // Helper function to find the best subtitle match
  const findBestSubtitleMatch = useCallback((subtitles: SubtitleTrack[]) => {
    if (!subtitles.length) return -1;

    // If we have a preferred language, try to find it
    if (preferredSubtitleLanguage) {
      const preferredIndex = subtitles.findIndex(sub => sub.srclang === preferredSubtitleLanguage);
      if (preferredIndex >= 0) return preferredIndex;
    }

    // Look for default subtitle
    const defaultIndex = subtitles.findIndex(sub => sub.default);
    if (defaultIndex >= 0) return defaultIndex;

    // Return -1 to indicate no subtitle should be selected
    return -1;
  }, [preferredSubtitleLanguage]);

  // Playlist navigation
  const playNextVideo = useCallback(() => {
    if (!playlist.length) return;
    const nextIndex = (currentPlaylistIndex + 1) % playlist.length;
    const nextItem = playlist[nextIndex];
    const nextSubtitles = nextItem.subtitles || [];
    const bestSubtitleIndex = findBestSubtitleMatch(nextSubtitles);
    
    setCurrentPlaylistIndex(nextIndex);
    setCurrentSources(nextItem.sources);
    setCurrentSubtitles(nextSubtitles);
    setActiveSubtitle(bestSubtitleIndex);
    setShowCenterPlay(false);
    onPlaylistItemChange?.(nextItem, nextIndex);
    
    // Auto play next video
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, [playlist, currentPlaylistIndex, onPlaylistItemChange, findBestSubtitleMatch]);

  const playPreviousVideo = useCallback(() => {
    if (!playlist.length) return;
    const prevIndex = currentPlaylistIndex === 0 ? playlist.length - 1 : currentPlaylistIndex - 1;
    const prevItem = playlist[prevIndex];
    const prevSubtitles = prevItem.subtitles || [];
    const bestSubtitleIndex = findBestSubtitleMatch(prevSubtitles);
    
    setCurrentPlaylistIndex(prevIndex);
    setCurrentSources(prevItem.sources);
    setCurrentSubtitles(prevSubtitles);
    setActiveSubtitle(bestSubtitleIndex);
    setShowCenterPlay(false);
    onPlaylistItemChange?.(prevItem, prevIndex);
    
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, [playlist, currentPlaylistIndex, onPlaylistItemChange, findBestSubtitleMatch]);

  const selectPlaylistItem = useCallback((index: number) => {
    if (!playlist.length || index < 0 || index >= playlist.length) return;
    const item = playlist[index];
    const itemSubtitles = item.subtitles || [];
    const bestSubtitleIndex = findBestSubtitleMatch(itemSubtitles);
    
    setCurrentPlaylistIndex(index);
    setCurrentSources(item.sources);
    setCurrentSubtitles(itemSubtitles);
    setActiveSubtitle(bestSubtitleIndex);
    setShowCenterPlay(false);
    setShowPlaylistSidebar(false);
    onPlaylistItemChange?.(item, index);
    
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, [playlist, onPlaylistItemChange, findBestSubtitleMatch]);

  // Handle subtitle change
  const handleSubtitleChange = useCallback((index: number) => {
    const video = videoRef.current;
    if (!video) return;

    // Disable all tracks first
    for (let i = 0; i < video.textTracks.length; i++) {
      video.textTracks[i].mode = 'hidden';
    }

    // Enable selected track or disable all if -1
    if (index >= 0 && index < video.textTracks.length) {
      video.textTracks[index].mode = 'showing';
      // Remember the preferred language
      setPreferredSubtitleLanguage(currentSubtitles[index]?.srclang || null);
    } else {
      // User chose to turn off subtitles
      setPreferredSubtitleLanguage(null);
    }

    setActiveSubtitle(index);
    setShowSettingsMenu(false);
  }, [currentSubtitles]);

  // Enable subtitle based on smart matching when subtitles change
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isChangingQuality.current) return; // Skip if changing quality

    const enableSubtitle = () => {
      if (isChangingQuality.current) return; // Skip if changing quality
      
      // Only auto-select if no subtitle is currently active (initial load or reset scenarios)
      if (activeSubtitle === -1) {
        const bestIndex = findBestSubtitleMatch(currentSubtitles);
        if (bestIndex >= 0 && bestIndex < video.textTracks.length) {
          video.textTracks[bestIndex].mode = 'showing';
          setActiveSubtitle(bestIndex);
        }
      } else {
        // If we have an active subtitle index, make sure it's applied to the video tracks
        if (activeSubtitle >= 0 && activeSubtitle < video.textTracks.length) {
          // Disable all tracks first
          for (let i = 0; i < video.textTracks.length; i++) {
            video.textTracks[i].mode = 'hidden';
          }
          // Enable the active one
          video.textTracks[activeSubtitle].mode = 'showing';
        }
      }
    };

    if (video.readyState >= 1) {
      // Metadata already loaded
      enableSubtitle();
    } else {
      // Wait for metadata to load
      video.addEventListener('loadedmetadata', enableSubtitle, { once: true });
    }

    return () => {
      video.removeEventListener('loadedmetadata', enableSubtitle);
    };
  }, [currentSubtitles, activeSubtitle, findBestSubtitleMatch]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Don't update currentTime if we're actively seeking to prevent jumping back
      if (!isSeeking.current) {
        setCurrentTime(video.currentTime);
      }
      onTimeUpdate?.(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      
      // Always use contain to show full video with black bars if needed
      setVideoObjectFit('contain');
      
      onLoadedMetadata?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowCenterPlay(true);
      onEnded?.();
      
      if (autoPlayNext && playlist.length > 0) {
        playNextVideo();
      }
    };

    const handleCanPlay = () => {
      onCanPlay?.();
    };

    const handleSeeking = () => {
      isSeeking.current = true;
      onSeeking?.();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowCenterPlay(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowCenterPlay(true);
    };

    const handleWaiting = () => {
      setShowCenterPlay(true);
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setShowCenterPlay(false);
    };

    const handleSeeked = () => {
      isSeeking.current = false;
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [onTimeUpdate, onLoadedMetadata, onEnded, onCanPlay, onSeeking, autoPlayNext, playlist.length, playNextVideo]);

  // Format time
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Quality selector - use original sources prop to keep all qualities available
  const qualities = sources.filter(s => s.quality).map(s => s.quality!);
  const uniqueQualities = ['auto', ...Array.from(new Set(qualities))];

  const handleQualityChange = useCallback((quality: string) => {
    setCurrentQuality(quality);
    setShowSettingsMenu(false);
    onQualityChange?.(quality);
    
    if (quality === 'auto') {
      // Reset to all sources for auto mode
      setCurrentSources(sources);
      isChangingQuality.current = false;
    } else {
      // Find and set the selected quality source
      const qualitySource = sources.find(s => s.quality === quality);
      if (qualitySource && videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const wasPlaying = !videoRef.current.paused;
        const currentActiveSubtitle = activeSubtitle; // Save current subtitle state
        
        // Mark that we're changing quality to prevent default subtitle effect
        isChangingQuality.current = true;
        
        // Update source but keep original sources list for quality selector
        setCurrentSources([qualitySource]);
        
        // Wait for video to load new source, then restore state
        const restoreState = () => {
          if (videoRef.current) {
            videoRef.current.currentTime = currentTime;
            if (wasPlaying) {
              videoRef.current.play();
            }
            
            // Re-enable subtitles after tracks are loaded
            const restoreSubtitles = () => {
              if (!videoRef.current) {
                isChangingQuality.current = false;
                return;
              }
              
              // Check if tracks are ready and we had an active subtitle
              if (currentActiveSubtitle >= 0 && videoRef.current.textTracks.length > 0) {
                // Wait for text tracks to be properly loaded
                let attempts = 0;
                const maxAttempts = 20; // Wait up to 2 seconds
                
                const tryRestoreSubtitles = () => {
                  if (!videoRef.current || attempts >= maxAttempts) {
                    isChangingQuality.current = false;
                    return;
                  }
                  
                  if (videoRef.current.textTracks.length > 0 && currentActiveSubtitle < videoRef.current.textTracks.length) {
                    try {
                      // Disable all tracks first
                      for (let i = 0; i < videoRef.current.textTracks.length; i++) {
                        videoRef.current.textTracks[i].mode = 'hidden';
                      }
                      // Re-enable the previously active subtitle
                      videoRef.current.textTracks[currentActiveSubtitle].mode = 'showing';
                      isChangingQuality.current = false;
                    } catch (error) {
                      console.warn('Failed to restore subtitle track:', error);
                      attempts++;
                      setTimeout(tryRestoreSubtitles, 100);
                    }
                  } else {
                    attempts++;
                    setTimeout(tryRestoreSubtitles, 100);
                  }
                };
                
                tryRestoreSubtitles();
              } else {
                // No subtitle was active, just reset the flag
                isChangingQuality.current = false;
              }
            };
            
            // Start subtitle restoration after metadata is loaded
            setTimeout(restoreSubtitles, 50);
            
            videoRef.current.removeEventListener('loadedmetadata', restoreState);
          }
        };
        
        videoRef.current.addEventListener('loadedmetadata', restoreState);
      }
    }
  }, [activeSubtitle, sources, onQualityChange]);

  // Close playlist when clicking outside
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (showPlaylistSidebar && e.target === e.currentTarget) {
      setShowPlaylistSidebar(false);
    }
  }, [showPlaylistSidebar]);

  // Close playlist when clicking on controls
  const closePlaylistOnControlClick = useCallback(() => {
    if (showPlaylistSidebar) {
      setShowPlaylistSidebar(false);
    }
  }, [showPlaylistSidebar]);

  return (
    <div
      ref={containerRef}
      className={`react-black-player relative overflow-hidden ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        aspectRatio: height === 'auto' ? aspectRatio : undefined,
        backgroundColor: currentTheme.backgroundColor || currentTheme.primaryColor,
        border: `1px solid ${currentTheme.primaryColor}`,
        color: currentTheme.textColor,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        style={{
          objectFit: videoObjectFit,
          backgroundColor: '#000000'
        }}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        preload={preload}
        crossOrigin="anonymous"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
      >
        {currentSubtitles.map((subtitle, index) => (
          <track
            key={index}
            kind="subtitles"
            src={subtitle.src}
            srcLang={subtitle.srclang}
            label={subtitle.label}
            default={subtitle.default}
          />
        ))}
      </video>

      {/* Center Play Button */}
      {showCenterPlay && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 hover:scale-110 relative"
            style={{ backgroundColor: `${currentTheme.primaryColor}B3` }}
          >
            <div 
              className="absolute inset-0 rounded-full border-2 opacity-20"
              style={{ borderColor: currentTheme.textColor }}
            ></div>
            <Play 
              className="w-10 h-10 ml-1" 
              strokeWidth={1} 
              fill={currentTheme.primaryColor}
              style={{ color: currentTheme.textColor }}
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 z-40 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(to top, ${currentTheme.primaryColor}, ${currentTheme.primaryColor}CC, transparent)`
        }}
      >
        {/* Progress Bar */}
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
              transition: 'none'
            }}
          >
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" 
              style={{ 
                backgroundColor: currentTheme.accentColor || currentTheme.secondaryColor,
                opacity: isDraggingProgress.current ? 1 : undefined
              }}
            />
          </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between px-4 py-3" onClick={closePlaylistOnControlClick}>
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="transition-colors"
              style={{ 
                color: currentTheme.textColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.accentColor || currentTheme.secondaryColor;
              }}
              onMouseLeave={(e) => {
                  if (currentTheme.textColor != null) {
                      e.currentTarget.style.color = currentTheme.textColor;
                  }
              }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" strokeWidth={1} />
              ) : (
                <Play className="w-6 h-6" strokeWidth={1} />
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
                  <SkipBack className="w-5 h-5" strokeWidth={1} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playNextVideo();
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

            {/* Settings */}
            {showSettings && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSettingsMenu(!showSettingsMenu);
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

                {showSettingsMenu && (
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
                        <span>Speed</span>
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
                          <span>Subtitles</span>
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
                          <span>Quality</span>
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
                          <span>Theme</span>
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
                )}
              </div>
            )}

            {/* Fullscreen */}
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
          </div>
        </div>
      </div>

      {/* Playlist Sidebar Trigger */}
      {showPlaylist && playlist.length > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylistSidebar(!showPlaylistSidebar);
          }}
          className={`absolute top-1/2 -translate-y-1/2 rounded-full p-2 transition-all duration-300 z-20 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            right: showPlaylistSidebar ? '320px' : '16px',
            transition: 'right 0.3s ease, opacity 0.3s ease',
            backgroundColor: `${currentTheme.primaryColor}80`,
            color: currentTheme.textColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${currentTheme.primaryColor}CC`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `${currentTheme.primaryColor}80`;
          }}
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform duration-300 ${
              showPlaylistSidebar ? 'rotate-180' : ''
            }`}
            strokeWidth={1}
          />
        </button>
      )}

      {/* Playlist Sidebar */}
      {showPlaylist && playlist.length > 0 && (
        <div
          className={`absolute top-0 right-0 bottom-0 w-80 transform transition-all duration-300 z-30 ${
            showPlaylistSidebar ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            backgroundColor: `${currentTheme.primaryColor}E6`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="px-4 py-3 border-b" style={{ borderColor: currentTheme.primaryColor }}>
              <h3 className="font-semibold" style={{ color: currentTheme.textColor }}>Playlist</h3>
            </div>
            <div className="flex-1 overflow-y-auto playlist-scrollbar">
              {playlist.map((item, index) => (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectPlaylistItem(index);
                  }}
                  className="px-4 py-3 cursor-pointer transition-colors border-b"
                  style={{
                    borderColor: currentTheme.primaryColor,
                    backgroundColor: index === currentPlaylistIndex ? `${currentTheme.accentColor || currentTheme.secondaryColor}4D` : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (index !== currentPlaylistIndex) {
                      e.currentTarget.style.backgroundColor = `${currentTheme.accentColor || currentTheme.secondaryColor}33`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index === currentPlaylistIndex ? `${currentTheme.accentColor || currentTheme.secondaryColor}4D` : 'transparent';
                  }}
                >
                  <div className="flex gap-3">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm truncate"
                        style={{
                          color: index === currentPlaylistIndex ? (currentTheme.accentColor || currentTheme.secondaryColor) : currentTheme.textColor
                        }}
                      >
                        {item.title}
                      </div>
                      <div className="text-xs mt-1" style={{ color: `${currentTheme.textColor}80` }}>
                        {index + 1} / {playlist.length}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactBlackPlayer;
