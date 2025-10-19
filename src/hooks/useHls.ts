import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import type { VideoSource } from '../types';

export const useHls = (
  videoRef: React.RefObject<HTMLVideoElement>,
  source: VideoSource | null | undefined,
  onError?: (data: any) => void
) => {
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Always destroy the previous hls instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (!source?.src) {
      video.src = ''; // Explicitly set src to empty if no source
      video.load();
      return;
    }

    const isHLS = source.src.includes('.m3u8') || source.type === 'application/x-mpegURL';
    if (isHLS && Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(source.src);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          onError?.(data);
        }
      });
    } else {
      video.src = source.src;
      video.load();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoRef, source]);

  return hlsRef;
};
