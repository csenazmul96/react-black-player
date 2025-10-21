import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import type { VideoSource } from '../types';

export interface HlsQualityLevel {
  height: number;
  width: number;
  bitrate: number;
  name: string;
  level: number;
}

export const useHls = (
  videoRef: React.RefObject<HTMLVideoElement>,
  source: VideoSource | null | undefined,
  onError?: (data: any) => void,
  onQualityLevelsLoaded?: (levels: HlsQualityLevel[]) => void,
  onQualityLevelChanged?: (level: number) => void
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
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
      });
      hlsRef.current = hls;
      hls.loadSource(source.src);
      hls.attachMedia(video);
      
      // Listen for manifest parsed to get quality levels
      hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
        const levels: HlsQualityLevel[] = data.levels.map((level: any, index: number) => {
          // Generate quality name based on height
          let qualityName = 'auto';
          if (level.height) {
            if (level.height >= 2160) qualityName = '4K';
            else if (level.height >= 1440) qualityName = '1440p';
            else if (level.height >= 1080) qualityName = '1080p';
            else if (level.height >= 720) qualityName = '720p';
            else if (level.height >= 480) qualityName = '480p';
            else if (level.height >= 360) qualityName = '360p';
            else if (level.height >= 240) qualityName = '240p';
            else qualityName = `${level.height}p`;
          }
          
          return {
            height: level.height,
            width: level.width,
            bitrate: level.bitrate,
            name: qualityName,
            level: index,
          };
        });
        
        onQualityLevelsLoaded?.(levels);
      });
      
      // Listen for level switching
      hls.on(Hls.Events.LEVEL_SWITCHED, (_event, data) => {
        onQualityLevelChanged?.(data.level);
      });
      
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          onError?.(data);
        }
      });
    } else if (isHLS && video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = source.src;
      video.load();
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
