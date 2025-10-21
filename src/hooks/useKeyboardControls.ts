import { useEffect, useCallback } from 'react';

export const useKeyboardControls = (
  videoRef: React.RefObject<HTMLVideoElement>,
  containerRef: React.RefObject<HTMLDivElement>,
  togglePlay: () => void,
  handleVolumeChange: (volume: number) => void,
  duration: number,
  volume: number,
  toggleMute?: () => void,
  toggleFullscreen?: () => void
) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const video = videoRef.current;
    if (!video) return;

    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      return;
    }

    switch (e.code) {
      case 'Space':
        e.preventDefault();
        togglePlay();
        break;

      case 'ArrowLeft':
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 10);
        break;

      case 'ArrowRight':
        e.preventDefault();
        video.currentTime = Math.min(duration, video.currentTime + 10);
        break;

      case 'ArrowUp':
        e.preventDefault();
        handleVolumeChange(Math.min(1, volume + 0.1));
        break;

      case 'ArrowDown':
        e.preventDefault();
        handleVolumeChange(Math.max(0, volume - 0.1));
        break;

      case 'KeyM':
        e.preventDefault();
        if (toggleMute) {
          toggleMute();
        }
        break;

      case 'KeyF':
        e.preventDefault();
        if (toggleFullscreen) {
          toggleFullscreen();
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (!document.fullscreenElement) {
          containerRef.current?.requestFullscreen().catch(() => {});
        }
        break;

      case 'Escape':
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        break;

      default:
        break;
    }
  }, [videoRef, containerRef, togglePlay, handleVolumeChange, duration, volume, toggleMute, toggleFullscreen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.tabIndex = 0;

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, handleKeyDown]);
};
