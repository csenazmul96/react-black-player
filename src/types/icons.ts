import React from 'react';

export interface Icons {
  play?: React.ElementType;
  pause?: React.ElementType;
  replay?: React.ElementType; // For Square/RotateCcw
  skipBack?: React.ElementType;
  skipForward?: React.ElementType;
  volume?: React.ElementType; // Muted
  mutedVolume?: React.ElementType; // Unmuted
  pictureInPicture?: React.ElementType;
  settings?: React.ElementType;
  listMusic?: React.ElementType; // Playlist
  minimize?: React.ElementType; // Exit Fullscreen
  maximize?: React.ElementType; // Enter Fullscreen
  spinner?: React.ElementType; // Buffering spinner
}
