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
  Subtitles,
} from 'lucide-react';
import Hls from 'hls.js';
import type { VideoPlayerProps, PlaylistItem, VideoSource, SubtitleTrack } from './types';
import './styles.css';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
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
  onError,
  onLoadedMetadata,
  onCanPlay,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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
  const [showCenterPlay, setShowCenterPlay] = useState(!autoPlay);

  // Initialize HLS if needed
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mainSource = currentSources[0];
    if (!mainSource) return;

    // Check if source is m3u8
    const isHLS = mainSource.src.includes('.m3u8') || mainSource.type === 'application/x-mpegURL';

    if (isHLS) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(mainSource.src);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.ERROR, (event, data) => {
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
  }, [currentSources, onError]);

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
  }, [isPlaying, showPlaylistSidebar]);

  // Play/Pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Close playlist if open
    if (showPlaylistSidebar) {
      setShowPlaylistSidebar(false);
    }

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setShowCenterPlay(false);
      onPlay?.();
    } else {
      video.pause();
      setIsPlaying(false);
      setShowCenterPlay(true);
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

  // Progress bar
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
    onSeeked?.();
  }, [duration, onSeeked]);

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


  // Playlist navigation
  const playNextVideo = useCallback(() => {
    if (!playlist.length) return;
    const nextIndex = (currentPlaylistIndex + 1) % playlist.length;
    const nextItem = playlist[nextIndex];
    setCurrentPlaylistIndex(nextIndex);
    setCurrentSources(nextItem.sources);
    setCurrentSubtitles(nextItem.subtitles || []);
    setActiveSubtitle(-1);
    setShowCenterPlay(false);
    onPlaylistItemChange?.(nextItem, nextIndex);
    
    // Auto play next video
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, [playlist, currentPlaylistIndex, onPlaylistItemChange]);

  const playPreviousVideo = useCallback(() => {
    if (!playlist.length) return;
    const prevIndex = currentPlaylistIndex === 0 ? playlist.length - 1 : currentPlaylistIndex - 1;
    const prevItem = playlist[prevIndex];
    setCurrentPlaylistIndex(prevIndex);
    setCurrentSources(prevItem.sources);
    setCurrentSubtitles(prevItem.subtitles || []);
    setActiveSubtitle(-1);
    setShowCenterPlay(false);
    onPlaylistItemChange?.(prevItem, prevIndex);
    
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, [playlist, currentPlaylistIndex, onPlaylistItemChange]);

  const selectPlaylistItem = useCallback((index: number) => {
    if (!playlist.length || index < 0 || index >= playlist.length) return;
    const item = playlist[index];
    setCurrentPlaylistIndex(index);
    setCurrentSources(item.sources);
    setCurrentSubtitles(item.subtitles || []);
    setActiveSubtitle(-1);
    setShowCenterPlay(false);
    setShowPlaylistSidebar(false);
    onPlaylistItemChange?.(item, index);
    
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, [playlist, onPlaylistItemChange]);

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
    }

    setActiveSubtitle(index);
    setShowSettingsMenu(false);
  }, []);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
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
      onSeeking?.();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('seeking', handleSeeking);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('seeking', handleSeeking);
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

  // Quality selector
  const qualities = currentSources.filter(s => s.quality).map(s => s.quality!);
  const uniqueQualities = ['auto', ...Array.from(new Set(qualities))];

  const handleQualityChange = (quality: string) => {
    setCurrentQuality(quality);
    setShowSettingsMenu(false);
    onQualityChange?.(quality);
    
    if (quality !== 'auto') {
      const qualitySource = currentSources.find(s => s.quality === quality);
      if (qualitySource && videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const wasPlaying = !videoRef.current.paused;
        
        setCurrentSources([qualitySource]);
        
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = currentTime;
            if (wasPlaying) {
              videoRef.current.play();
            }
          }
        }, 100);
      }
    };
  };

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
      className={`relative bg-player-bg overflow-hidden ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        aspectRatio: height === 'auto' ? aspectRatio : undefined,
        border: '1px solid #000',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
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
          <div className="w-20 h-20 rounded-full bg-black bg-opacity-70 flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 hover:scale-110 relative">
            <div className="absolute inset-0 rounded-full border-2 border-white opacity-20"></div>
            <Play className="w-10 h-10 text-white ml-1" strokeWidth={1} fill="black" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 z-40 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div
          className="w-full h-1 bg-gray-700 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-player-red relative group-hover:h-2 transition-all"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-player-red rounded-full opacity-0 group-hover:opacity-100" />
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
              className="text-white hover:text-player-red transition-colors"
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
                  className="text-white hover:text-player-red transition-colors"
                >
                  <SkipBack className="w-5 h-5" strokeWidth={1} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playNextVideo();
                  }}
                  className="text-white hover:text-player-red transition-colors"
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
                  className="text-white hover:text-player-red transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" strokeWidth={1} />
                  ) : (
                    <Volume2 className="w-5 h-5" strokeWidth={1} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                  className="w-0 group-hover:w-20 transition-all duration-300 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-player-red [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Time */}
            {showTime && (
              <div className="text-white text-sm">
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
                  className="text-white hover:text-player-red transition-colors"
                >
                  <Settings className="w-5 h-5" strokeWidth={1} />
                </button>

                {showSettingsMenu && (
                  <div 
                    className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-95 rounded-lg overflow-hidden min-w-[200px] max-h-[400px] overflow-y-auto settings-scrollbar"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Playback Speed */}
                    <div className="border-b border-gray-800">
                      <div className="px-4 py-2 text-gray-400 text-xs">Speed</div>
                      {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={(e) => {
                            e.stopPropagation();
                            changePlaybackRate(rate);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-player-red hover:bg-opacity-20 transition-colors ${
                            playbackRate === rate ? 'text-player-red' : 'text-white'
                          }`}
                        >
                          {rate}x {rate === 1 && '(Normal)'}
                        </button>
                      ))}
                    </div>

                    {/* Subtitles */}
                    {showSubtitles && currentSubtitles.length > 0 && (
                      <div className="border-b border-gray-800">
                        <div className="px-4 py-2 text-gray-400 text-xs">Subtitles</div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubtitleChange(-1);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-player-red hover:bg-opacity-20 transition-colors ${
                            activeSubtitle === -1 ? 'text-player-red' : 'text-white'
                          }`}
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
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-player-red hover:bg-opacity-20 transition-colors ${
                              activeSubtitle === index ? 'text-player-red' : 'text-white'
                            }`}
                          >
                            {subtitle.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Quality */}
                    {showQuality && uniqueQualities.length > 1 && (
                      <div>
                        <div className="px-4 py-2 text-gray-400 text-xs">Quality</div>
                        {uniqueQualities.map((quality) => (
                          <button
                            key={quality}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQualityChange(quality);
                            }}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-player-red hover:bg-opacity-20 transition-colors capitalize ${
                              currentQuality === quality ? 'text-player-red' : 'text-white'
                            }`}
                          >
                            {quality}
                          </button>
                        ))}
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
              className="text-white hover:text-player-red transition-colors"
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
          className={`absolute top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full p-2 text-white transition-all duration-300 z-20 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            right: showPlaylistSidebar ? '320px' : '16px',
            transition: 'right 0.3s ease, opacity 0.3s ease',
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
          className={`absolute top-0 right-0 bottom-0 w-80 bg-black bg-opacity-90 transform transition-all duration-300 z-30 ${
            showPlaylistSidebar ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="px-4 py-3 border-b border-gray-800">
              <h3 className="text-white font-semibold">Playlist</h3>
            </div>
            <div className="flex-1 overflow-y-auto playlist-scrollbar">
              {playlist.map((item, index) => (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectPlaylistItem(index);
                  }}
                  className={`px-4 py-3 cursor-pointer hover:bg-player-red hover:bg-opacity-20 transition-colors border-b border-gray-900 ${
                    index === currentPlaylistIndex ? 'bg-player-red bg-opacity-30' : ''
                  }`}
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
                        className={`text-sm truncate ${
                          index === currentPlaylistIndex ? 'text-player-red' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
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

export default VideoPlayer;
