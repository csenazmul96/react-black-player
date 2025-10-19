import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Hls from 'hls.js';
import type { ReactBlackPlayerProps, Theme, SubtitleTrack } from '../types';
import { defaultThemes } from '../themes';
import { getThemeByName } from '../utils/theme';

export const usePlayerState = (videoRef: React.RefObject<HTMLVideoElement>, containerRef: React.RefObject<HTMLDivElement>, props: ReactBlackPlayerProps) => {
  const { sources, subtitles, playlist, autoPlay, muted, onPlay, onPause, onEnded, onSeeked, onTimeUpdate, onVolumeChange, onQualityChange, onPlaybackRateChange, onFullscreenChange, onPlaylistItemChange, onNextVideoPlay, onThemeChange, onSubtitleChange, onLoadedMetadata, onCanPlay, onSeeking, onLoadStart, onProgress, onSuspend, onAbort, onEmptied, onStalled, onLoadedData, onCanPlayThrough, onPlaying, onWaiting, onDurationChange, onResize, onError, onRateChange, onEnterPictureInPicture, onLeavePictureInPicture } = props;
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState(muted);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentQuality, setCurrentQuality] = useState<string>('auto');
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showPlaylistSidebar, setShowPlaylistSidebar] = useState(false);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);

  const baseSources = useMemo(() => {
    if (sources && sources.length > 0) {
      return sources;
    } else if (playlist && playlist.length > 0) {
      return playlist[currentPlaylistIndex].sources || [];
    }
    return [];
  }, [sources, playlist, currentPlaylistIndex]);

  const baseSubtitles = useMemo(() => {
    if (sources && sources.length > 0) {
      return subtitles || [];
    } else if (playlist && playlist.length > 0) {
      return playlist[currentPlaylistIndex].subtitles || [];
    }
    return [];
  }, [sources, subtitles, playlist, currentPlaylistIndex]);

  const [currentSources, setCurrentSources] = useState(baseSources);
  const [currentSubtitles, setCurrentSubtitles] = useState(baseSubtitles);

  useEffect(() => {
    setCurrentSources(baseSources);
  }, [baseSources]);

  useEffect(() => {
    setCurrentSubtitles(baseSubtitles);
  }, [baseSubtitles]);

  const [activeSubtitle, setActiveSubtitle] = useState<number>(-1);
  const [preferredSubtitleLanguage, setPreferredSubtitleLanguage] = useState<string | null>(null);
  const [showCenterPlay, setShowCenterPlay] = useState(!autoPlay);
  const [isBuffering, setIsBuffering] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [nextVideoPoster, setNextVideoPoster] = useState<string | undefined>(undefined);
  const [playlistDurations, setPlaylistDurations] = useState<{ [key: string]: number }>({});
  const [isAudio, setIsAudio] = useState(false);
  const [showControlsState, setShowControlsState] = useState(true);
  const [seekPreviewTime, setSeekPreviewTime] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const parseAspectRatio = useCallback((aspectRatioString: string | undefined): number | null => {
    if (aspectRatioString) {
      const parts = aspectRatioString.split('/').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] !== 0) {
        return parts[0] / parts[1];
      }
    }
    return null;
  }, []);

  const isQualitySwitching = useRef<boolean>(false);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDraggingProgress = useRef<boolean>(false);
  const isSeeking = useRef<boolean>(false);
  const autoPlayNextRef = useRef<boolean>(props.autoPlayNext ?? false);
  const loopCurrentVideoRef = useRef<boolean>(props.loopCurrentVideo ?? false);

  useEffect(() => {
    autoPlayNextRef.current = props.autoPlayNext ?? false;
    loopCurrentVideoRef.current = props.loopCurrentVideo ?? false;
  }, [props.autoPlayNext, props.loopCurrentVideo]);

  const availableThemes = props.themeConfig?.themes || defaultThemes;
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const defaultThemeName = props.themeConfig?.defaultTheme || 'Dark';
    return getThemeByName(availableThemes, defaultThemeName) || availableThemes[0];
  });

  const textLabels = {
    playlist: props.labels?.playlist || 'Playlist',
    speed: props.labels?.speed || 'Speed',
    subtitles: props.labels?.subtitles || 'Subtitles',
    quality: props.labels?.quality || 'Quality',
    theme: props.labels?.theme || 'Theme',
  };

  const uniqueQualities = ['auto', ...Array.from(new Set((baseSources || []).filter(s => s.quality).map(s => s.quality!)))];

  const resetHideControlsTimer = useCallback(() => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    setShowControlsState(true);
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControlsState(false);
      }
    }, 3000);
  }, [isPlaying]);

  const handleMouseMove = useCallback(() => {
    resetHideControlsTimer();
  }, [resetHideControlsTimer]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      setShowControlsState(false);
    }
    if (showPlaylistSidebar) {
      setShowPlaylistSidebar(false);
    }
    if (showSettingsMenu) {
      setShowSettingsMenu(false);
    }
  }, [isPlaying, showPlaylistSidebar, showSettingsMenu]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (showPlaylistSidebar) {
      setShowPlaylistSidebar(false);
    }

    if (isVideoEnded) {
      video.currentTime = 0;
      setIsVideoEnded(false);
      video.play().catch(() => {
        setIsPlaying(false);
        setShowCenterPlay(true);
      });
      return;
    }

    if (video.paused) {
      video.play().catch(() => {
        setIsPlaying(false);
        setShowCenterPlay(true);
      });
    } else {
      video.pause();
    }
  }, [showPlaylistSidebar, isVideoEnded, videoRef]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    onVolumeChange?.(newVolume, newVolume === 0);
  }, [onVolumeChange, videoRef]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);
    onVolumeChange?.(volume, newMuted);
  }, [isMuted, volume, onVolumeChange, videoRef]);

  const updateProgress = useCallback((clientX: number, isPreview: boolean = false) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!video || !progressBar || !duration) return;

    const rect = progressBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = pos * duration;

    if (isPreview) {
      setSeekPreviewTime(newTime);
    } else {
      isSeeking.current = true;
      setCurrentTime(newTime);
      video.currentTime = newTime;
      setSeekPreviewTime(null);
      
      setTimeout(() => {
        isSeeking.current = false;
      }, 100);
    }
  }, [duration, videoRef, progressBarRef]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    updateProgress(e.clientX, false);
  }, [updateProgress]);

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
    }
  }, [updateProgress]);

  const changePlaybackRate = useCallback((rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettingsMenu(false);
    onPlaybackRateChange?.(rate);
  }, [onPlaybackRateChange, videoRef]);

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
  }, [onFullscreenChange, containerRef]);

  const togglePictureInPicture = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPictureInPicture(false);
      } else if (document.pictureInPictureEnabled) {
        await video.requestPictureInPicture();
        setIsPictureInPicture(true);
      }
    } catch (error) {
      // Picture-in-Picture not supported or failed
    }
  }, [videoRef]);

  const findBestSubtitleMatch = useCallback((subtitles: SubtitleTrack[]) => {
    if (!subtitles.length) return -1;

    if (preferredSubtitleLanguage) {
      const preferredIndex = subtitles.findIndex(sub => sub.srclang === preferredSubtitleLanguage);
      if (preferredIndex >= 0) return preferredIndex;
    }

    const defaultIndex = subtitles.findIndex(sub => sub.default);
    if (defaultIndex >= 0) return defaultIndex;

    return -1;
  }, [preferredSubtitleLanguage]);

  const playNextVideo = useCallback(() => {
    if (!playlist || !playlist.length) return false;
    
    const isLastVideo = currentPlaylistIndex === playlist.length - 1;
    
    if (isLastVideo) {
      return false;
    }
    
    const nextIndex = currentPlaylistIndex + 1;
    const nextItem = playlist[nextIndex];
    
    if (!nextItem) return false;
    
    const nextSubtitles = nextItem.subtitles || [];
    const bestSubtitleIndex = findBestSubtitleMatch(nextSubtitles);
    
    setIsVideoEnded(false);
    setShowCenterPlay(false);
    setCurrentPlaylistIndex(nextIndex);
    setCurrentSources(nextItem.sources);
    setCurrentSubtitles(nextSubtitles);
    setActiveSubtitle(bestSubtitleIndex);
    setVideoAspectRatio(parseAspectRatio(nextItem.sources[0]?.aspectRatio)); // Set aspect ratio from source
    
    onPlaylistItemChange?.(nextItem, nextIndex);
    onNextVideoPlay?.(nextItem, nextIndex);
    
    setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.play().catch(() => {
          setIsPlaying(false);
          setShowCenterPlay(true);
        });
      }
    }, 50);
    
    return true;
  }, [playlist, currentPlaylistIndex, onPlaylistItemChange, onNextVideoPlay, findBestSubtitleMatch, videoRef]);

  const playPreviousVideo = useCallback(() => {
    if (!playlist || !playlist.length) return;
    const prevIndex = currentPlaylistIndex === 0 ? playlist.length - 1 : currentPlaylistIndex - 1;
    const prevItem = playlist[prevIndex];
    const prevSubtitles = prevItem.subtitles || [];
    const bestSubtitleIndex = findBestSubtitleMatch(prevSubtitles);
    
    setCurrentPlaylistIndex(prevIndex);
    setCurrentSources(prevItem.sources);
    setCurrentSubtitles(prevSubtitles);
    setActiveSubtitle(bestSubtitleIndex);
    setVideoAspectRatio(parseAspectRatio(prevItem.sources[0]?.aspectRatio)); // Set aspect ratio from source
    setShowCenterPlay(false);
    onPlaylistItemChange?.(prevItem, prevIndex);
    
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, [playlist, currentPlaylistIndex, onPlaylistItemChange, findBestSubtitleMatch, videoRef]);

  const selectPlaylistItem = useCallback((index: number) => {
    if (!playlist || !playlist.length || index < 0 || index >= playlist.length) return;
    const item = playlist[index];
    const itemSubtitles = item.subtitles || [];
    const bestSubtitleIndex = findBestSubtitleMatch(itemSubtitles);
    
    setCurrentPlaylistIndex(index);
    setCurrentSources(item.sources);
    setCurrentSubtitles(itemSubtitles);
    setActiveSubtitle(bestSubtitleIndex);
    setVideoAspectRatio(parseAspectRatio(item.sources[0]?.aspectRatio)); // Set aspect ratio from source
    setShowCenterPlay(false);
    setShowPlaylistSidebar(false);
    onPlaylistItemChange?.(item, index);
    
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, [playlist, onPlaylistItemChange, findBestSubtitleMatch, videoRef]);

  const handleSubtitleChange = useCallback((index: number) => {
    const video = videoRef.current;
    if (!video) return;

    for (let i = 0; i < video.textTracks.length; i++) {
      video.textTracks[i].mode = 'hidden';
    }

    let selectedTrack: SubtitleTrack | null = null;

    if (index >= 0 && index < video.textTracks.length) {
      video.textTracks[index].mode = 'showing';
      if(currentSubtitles) {
        selectedTrack = currentSubtitles[index];
        setPreferredSubtitleLanguage(currentSubtitles[index]?.srclang || null);
      }
    } else {
      setPreferredSubtitleLanguage(null);
    }

    setActiveSubtitle(index);
    setShowSettingsMenu(false);
    onSubtitleChange?.(selectedTrack, index);
  }, [currentSubtitles, videoRef, onSubtitleChange]);

  const handleQualityChange = useCallback((quality: string) => {
    setCurrentQuality(quality);
    setShowSettingsMenu(false);
    onQualityChange?.(quality);
    
    if (quality === 'auto') {
      setCurrentSources(baseSources);
      setVideoAspectRatio(null); // Reset aspect ratio if going back to auto
    } else {
      const qualitySource = baseSources.find(s => s.quality === quality);
      if (qualitySource && videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const wasPlaying = !videoRef.current.paused;

        isQualitySwitching.current = true;
        
        setCurrentSources([qualitySource]);
        setVideoAspectRatio(parseAspectRatio(qualitySource.aspectRatio)); // Set aspect ratio from source
        
        const restoreState = () => {
          if (videoRef.current) {
            videoRef.current.currentTime = currentTime;
            if (wasPlaying) {
              videoRef.current.play();
            }
            
            videoRef.current.removeEventListener('loadedmetadata', restoreState);

            setTimeout(() => {
              isQualitySwitching.current = false;
            }, 100);
          }
        };
        
        videoRef.current.addEventListener('loadedmetadata', restoreState);
      }
    }
  }, [baseSources, onQualityChange, videoRef]);

  const handleThemeChange = useCallback((theme: Theme) => {
    setCurrentTheme(theme);
    setShowSettingsMenu(false);
    onThemeChange?.(theme);
  }, [onThemeChange]);

  const closePlaylistOnControlClick = useCallback(() => {
    if (showPlaylistSidebar) {
      setShowPlaylistSidebar(false);
    }
  }, [showPlaylistSidebar]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (showPlaylistSidebar && e.target === e.currentTarget) {
      setShowPlaylistSidebar(false);
    }
  }, [showPlaylistSidebar]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isSeeking.current) {
        setCurrentTime(video.currentTime);
      }
      onTimeUpdate?.(video.currentTime);
    };

    const handleLoadedMetadata = (event: any) => {
      setDuration(video.duration);
      
      if (video.videoWidth && video.videoHeight) {
        const aspectRatio = video.videoWidth / video.videoHeight;
        setVideoAspectRatio(aspectRatio);
      }
      
      onLoadedMetadata?.(event);
    };

    const handleEnded = (event: any) => {
      setIsPlaying(false);
      
      if (loopCurrentVideoRef.current) {
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {
            setIsPlaying(false);
            setShowCenterPlay(true);
          });
          return;
        }
      }
      
      if (autoPlayNextRef.current && playlist && playlist.length > 0) {
        const isLastVideo = currentPlaylistIndex === playlist.length - 1;
        
        if (!isLastVideo) {
          const nextItem = playlist[currentPlaylistIndex + 1];
          const nextPoster = nextItem?.sources[0]?.poster;
          setNextVideoPoster(nextPoster);
        }
        
        setIsBuffering(true);
        setShowCenterPlay(false);
        
        const hasNextVideo = playNextVideo();
        if (hasNextVideo === false) {
          setIsVideoEnded(true);
          setShowCenterPlay(true);
          setIsBuffering(false);
          setNextVideoPoster(undefined);
        } else {
          setIsVideoEnded(false);
        }
      } else {
        setIsVideoEnded(true);
        setShowCenterPlay(true);
      }
      
      onEnded?.(event);
    };

    const handleCanPlay = (event: any) => {
      onCanPlay?.(event);
    };

    const handleSeeking = (event: any) => {
      isSeeking.current = true;
      onSeeking?.(event);
    };

    const handlePlay = (event: any) => {
      setIsPlaying(true);
      setShowCenterPlay(false);
      setIsVideoEnded(false);
      onPlay?.(event);
    };

    const handlePause = (event: any) => {
      setIsPlaying(false);
      setShowCenterPlay(true);
      onPause?.(event);
    };

    const handleWaiting = (event: any) => {
      setIsBuffering(true);
      onWaiting?.(event);
    };

    const handlePlaying = (event: any) => {
      setIsPlaying(true);
      setShowCenterPlay(false);
      setIsBuffering(false);
      setIsVideoEnded(false);
      setNextVideoPoster(undefined);
      onPlaying?.(event);
    };

    const handleCanPlayThrough = (event: any) => {
      setIsBuffering(false);
      onCanPlayThrough?.(event);
    };

    const handleStalled = (event: any) => {
      setIsBuffering(true);
      onStalled?.(event);
    };

    const handleSeeked = (event: any) => {
      isSeeking.current = false;
      setCurrentTime(video.currentTime);
      onSeeked?.(event);
    };

    const handleEnterPiP = (event: any) => {
      setIsPictureInPicture(true);
      onEnterPictureInPicture?.(event);
    };

    const handleLeavePiP = (event: any) => {
      setIsPictureInPicture(false);
      onLeavePictureInPicture?.(event);
    };

    const handleLoadStart = (event: any) => onLoadStart?.(event);
    const handleProgress = (event: any) => onProgress?.(event);
    const handleSuspend = (event: any) => {
      if (isQualitySwitching.current) return;
      onSuspend?.(event);
    };
    const handleAbort = (event: any) => onAbort?.(event);
    const handleEmptied = (event: any) => onEmptied?.(event);
    const handleLoadedData = (event: any) => onLoadedData?.(event);
    const handleDurationChange = (event: any) => onDurationChange?.(event);
    const handleResize = (event: any) => onResize?.(event);
    const handleError = (event: any) => onError?.(event);
    const handleRateChange = (event: any) => onRateChange?.(event);

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
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('enterpictureinpicture', handleEnterPiP);
    video.addEventListener('leavepictureinpicture', handleLeavePiP);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('suspend', handleSuspend);
    video.addEventListener('abort', handleAbort);
    video.addEventListener('emptied', handleEmptied);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('resize', handleResize);
    video.addEventListener('error', handleError);
    video.addEventListener('ratechange', handleRateChange);


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
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('enterpictureinpicture', handleEnterPiP);
      video.removeEventListener('leavepictureinpicture', handleLeavePiP);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('suspend', handleSuspend);
      video.removeEventListener('abort', handleAbort);
      video.removeEventListener('emptied', handleEmptied);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('resize', handleResize);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ratechange', handleRateChange);
    };
  }, [onTimeUpdate, onLoadedMetadata, onEnded, onCanPlay, onSeeking, playlist, playNextVideo, videoRef, onSeeked, onLoadStart, onProgress, onSuspend, onAbort, onEmptied, onStalled, onLoadedData, onCanPlayThrough, onPlaying, onWaiting, onDurationChange, onResize, onError, onPlay, onPause, onRateChange, onEnterPictureInPicture, onLeavePictureInPicture]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    currentQuality,
    showSettingsMenu,
    setShowSettingsMenu,
    showPlaylistSidebar,
    setShowPlaylistSidebar,
    currentPlaylistIndex,
    currentSources,
    currentSubtitles,
    activeSubtitle,
    preferredSubtitleLanguage,
    showCenterPlay,
    isBuffering,
    videoAspectRatio,
    isVideoEnded,
    isPictureInPicture,
    nextVideoPoster,
    playlistDurations,
    isAudio,
    hlsRef,
    isQualitySwitching,
    togglePlay,
    handleVolumeChange,
    toggleMute,
    updateProgress,
    handleProgressClick,
    handleProgressMouseDown,
    handleProgressMouseMove,
    handleProgressMouseUp,
    changePlaybackRate,
    toggleFullscreen,
    togglePictureInPicture,
    findBestSubtitleMatch,
    playNextVideo,
    playPreviousVideo,
    selectPlaylistItem,
    handleSubtitleChange,
    handleQualityChange,
    handleThemeChange,
    closePlaylistOnControlClick,
    handleContainerClick,
    handleMouseMove,
    handleMouseLeave,
    showControlsState,
    progressBarRef,
    textLabels,
    uniqueQualities,
    availableThemes,
    currentTheme,
    playlist,
    seekPreviewTime,
    isDraggingProgress,
    currentPoster: currentSources[0]?.poster || props.poster,
    currentVideoAspectRatio: parseAspectRatio(currentSources[0]?.aspectRatio) || videoAspectRatio,
    isFullscreen,
    setPlaylistDurations,
    setIsAudio,
  };
};
