import React, { useRef, useEffect } from 'react';
import type { ReactBlackPlayerProps } from '../../types';
import { PlayerControls } from '../PlayerControls';
import { ProgressBar } from '../ProgressBar';
import { Playlist } from '../Playlist';
import { usePlayerState } from '../../hooks/usePlayerState';
import { useHls } from '../../hooks/useHls';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { formatTime } from '../../utils/time';
import { applyThemeToElement } from '../../utils/theme';
import './styles.css';
import BufferIcon from "../common/BufferIcon.tsx";
import PlayButtonInMiddleOfPlayer from "../common/PlayButtonInMiddleOfPlayer.tsx";
import BufferingSpinner from "../common/BufferingSpinner.tsx";

export const ReactBlackPlayer: React.FC<ReactBlackPlayerProps> = (props) => {
  const { 
    className = '',
    controls = {},
    protectSource = false,
    width = '100%',
    height = 'auto',
    aspectRatio = '9/16',
   } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    time: showTime = true,
    volume: showVolume = true,
    settings: showSettings = true,
    quality: showQuality = true,
    subtitles: showSubtitles = true,
    playlist: showPlaylist = true,
    nextPrev: showNextPrev = true,
    pictureInPicture: showPictureInPicture = false,
    all: showControlsProp = true,
  } = controls;

  const playerState = usePlayerState(videoRef, containerRef, props);
  const { 
    currentSources,
    currentSubtitles,
    isAudio,
    currentTheme,
    playlist,
    currentPlaylistIndex,
    selectPlaylistItem,
    showPlaylistSidebar,
    setShowPlaylistSidebar,
    playlistDurations,
    textLabels,
    showControlsState,
    handleMouseMove,
    handleMouseLeave,
    handleContainerClick,
    isBuffering,
    isVideoEnded,
    showCenterPlay,
    currentPoster,
    nextVideoPoster,
    togglePlay,
    isDraggingProgress,
    seekPreviewTime,
    currentTime,
    duration,
    handleProgressClick,
    handleProgressMouseDown,
    progressBarRef,
    isPlaying,
    playPreviousVideo,
    playNextVideo,
    isMuted,
    volume,
    toggleMute,
    handleVolumeChange,
    isPictureInPicture,
    togglePictureInPicture,
    showSettingsMenu,
    setShowSettingsMenu,
    changePlaybackRate,
    playbackRate,
    activeSubtitle,
    handleSubtitleChange,
    uniqueQualities,
    currentQuality,
    handleQualityChange,
    availableThemes,
    handleThemeChange,
    isFullscreen,
    toggleFullscreen,
    closePlaylistOnControlClick,
   } = playerState;

  useHls(videoRef, currentSources[0], props.onError);
  useKeyboardControls(videoRef, containerRef, togglePlay, handleVolumeChange, duration, volume, props.onSeeked);

  useEffect(() => {
    const container = containerRef.current;
    if (container && currentTheme) {
      applyThemeToElement(container, currentTheme);
    }
  }, [currentTheme]);

  const getContainerStyle = () => {
    const baseStyle: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      backgroundColor: currentTheme.backgroundColor || currentTheme.primaryColor,
      color: currentTheme.textColor,
      ...(protectSource && {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }),
    };

    if (isAudio) {
      return {
        ...baseStyle,
        height: 'auto',
        minHeight: '120px',
        aspectRatio: undefined,
      };
    }

    if (playerState.videoAspectRatio !== null) {
      if (playerState.videoAspectRatio < 1) {
        baseStyle.height = 'auto';
        baseStyle.maxHeight = '70vh';
        baseStyle.aspectRatio = playerState.videoAspectRatio.toString();
      } else {
        baseStyle.height = typeof height === 'number' ? `${height}px` : height;
        baseStyle.aspectRatio = height === 'auto' ? aspectRatio : undefined;
      }
    } else {
      baseStyle.height = typeof height === 'number' ? `${height}px` : height;
      baseStyle.aspectRatio = height === 'auto' ? aspectRatio : undefined;
    }

    return baseStyle;
  };

  // @ts-ignore
    return (
    <div
      ref={containerRef}
      className={`react-black-player relative overflow-hidden ${className}`}
      style={getContainerStyle()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
    >
      <video
        ref={videoRef}
        className={`w-full h-full ${isBuffering ? 'buffering' : ''} ${isAudio ? 'absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none' : ''}`}
        style={{
          objectFit: 'contain',
          backgroundColor: '#000000',
          ...(protectSource && {
            pointerEvents: 'auto',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }),
        }}
        controlsList={protectSource ? 'nodownload nofullscreen noremoteplayback' : undefined}
        disablePictureInPicture={protectSource}
        poster={currentPoster}
        autoPlay={props.autoPlay}
        muted={props.muted}
        loop={props.loop}
        preload={props.preload}
        crossOrigin="anonymous"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
      >
        {currentSubtitles && currentSubtitles.map((subtitle, index) => (
          <track
            key={`${currentSources[0]?.src}-${index}`}
            kind="subtitles"
            src={subtitle.src}
            srcLang={subtitle.srclang}
            label={subtitle.label}
            default={subtitle.default}
          />
        ))}
      </video>

      {isAudio ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
          <p>Audio component</p>
        </div>
      ) : (
        <>
          {isVideoEnded && showCenterPlay && currentPoster && (
            <div
              className="absolute inset-0 z-5 pointer-events-none"
              style={{
                backgroundImage: `url(${currentPoster})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#000000',
              }}
            />
          )}

          {isBuffering && nextVideoPoster && (
              <BufferIcon poster={nextVideoPoster} />
          )}

          {showCenterPlay && !isBuffering && (
              <PlayButtonInMiddleOfPlayer togglePlay={togglePlay} isVideoEnded={isVideoEnded} currentTheme={currentTheme} />
          )}
        </>
      )}

      {isBuffering && (
        <BufferingSpinner currentTheme={currentTheme} />
      )}

      {showControlsProp && (
        <div
          className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 z-40 ${
            showControlsState ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `linear-gradient(to top, ${currentTheme.primaryColor}A6, ${currentTheme.primaryColor}33)`
          }}
        >
          <ProgressBar
            progressBarRef={progressBarRef}
            currentTime={currentTime}
            duration={duration}
            seekPreviewTime={seekPreviewTime}
            isDraggingProgress={isDraggingProgress}
            handleProgressClick={handleProgressClick}
            handleProgressMouseDown={handleProgressMouseDown}
            currentTheme={currentTheme}
          />

          <PlayerControls
            isPlaying={isPlaying}
            isVideoEnded={isVideoEnded}
            togglePlay={togglePlay}
            showNextPrev={showNextPrev}
            playlist={playlist || []}
            playPreviousVideo={playPreviousVideo}
            playNextVideo={playNextVideo}
            showVolume={showVolume}
            isMuted={isMuted || false}
            volume={volume}
            toggleMute={toggleMute}
            handleVolumeChange={handleVolumeChange}
            showTime={showTime}
            currentTime={currentTime}
            duration={duration}
            formatTime={formatTime}
            showPictureInPicture={showPictureInPicture}
            isAudio={isAudio}
            togglePictureInPicture={togglePictureInPicture}
            isPictureInPicture={isPictureInPicture}
            showSettings={showSettings}
            setShowSettingsMenu={setShowSettingsMenu}
            showPlaylist={showPlaylist}
            setShowPlaylistSidebar={setShowPlaylistSidebar}
            toggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
            currentTheme={currentTheme}
            closePlaylistOnControlClick={closePlaylistOnControlClick}
            showSettingsMenu={showSettingsMenu}
            changePlaybackRate={changePlaybackRate}
            playbackRate={playbackRate}
            showSubtitles={showSubtitles}
            currentSubtitles={currentSubtitles || []}
            activeSubtitle={activeSubtitle}
            handleSubtitleChange={handleSubtitleChange}
            showQuality={showQuality}
            uniqueQualities={uniqueQualities}
            currentQuality={currentQuality}
            handleQualityChange={handleQualityChange}
            themeConfig={props.themeConfig}
            availableThemes={availableThemes}
            handleThemeChange={handleThemeChange}
            textLabels={textLabels}
          />
        </div>
      )}

      <Playlist
        playlist={playlist || []}
        currentPlaylistIndex={currentPlaylistIndex}
        selectPlaylistItem={selectPlaylistItem}
        showPlaylistSidebar={showPlaylistSidebar}
        setShowPlaylistSidebar={setShowPlaylistSidebar}
        isAudio={isAudio}
        currentTheme={currentTheme}
        textLabels={textLabels}
        playlistDurations={playlistDurations}
        formatTime={formatTime}
      />
    </div>
  );
};

export default ReactBlackPlayer;
