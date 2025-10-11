# Keyboard Controls Documentation

## Overview
The ReactBlackPlayer now supports full keyboard controls for enhanced user experience. Users can interact with the video player using their keyboard without needing to use the mouse.

## Supported Keyboard Shortcuts

### Playback Controls
| Key | Action | Description |
|-----|--------|-------------|
| **Space** | Play/Pause | Toggles between playing and paused states. If the video has ended, it will restart from the beginning. |

### Seeking Controls
| Key | Action | Description |
|-----|--------|-------------|
| **Left Arrow (←)** | Seek Backward | Jumps backward 10 seconds in the video timeline |
| **Right Arrow (→)** | Seek Forward | Jumps forward 10 seconds in the video timeline |

### Volume Controls
| Key | Action | Description |
|-----|--------|-------------|
| **Up Arrow (↑)** | Volume Up | Increases volume by 10% |
| **Down Arrow (↓)** | Volume Down | Decreases volume by 10% |

## Implementation Details

### Activation
The keyboard controls are automatically enabled when the video player container receives focus. The player container is made focusable using `tabIndex={0}`.

### Focus Management
- The player container must be focused for keyboard controls to work
- Clicking anywhere on the player will automatically focus it
- Keyboard events are ignored when typing in input fields or textareas

### Event Handling
All keyboard events use `e.preventDefault()` to prevent default browser behavior and ensure smooth interaction with the player.

## Usage Example

```tsx
import { ReactBlackPlayer } from 'react-black-player';

function VideoPlayer() {
  return (
    <ReactBlackPlayer
      sources={[
        { src: 'video.mp4', type: 'video/mp4' }
      ]}
      // Keyboard controls are enabled by default
    />
  );
}
```

## Accessibility

The keyboard controls improve accessibility by:
- Allowing full player control without a mouse
- Supporting standard media player keyboard shortcuts
- Preventing conflicts with input fields and textareas
- Providing smooth, predictable interactions

## Technical Notes

### Dependencies
The keyboard handler depends on:
- `togglePlay()` - Play/pause functionality
- `handleVolumeChange()` - Volume adjustment
- `duration` - Video duration for seeking
- `volume` - Current volume level
- `onSeeked` - Callback for seek operations

### Event Listener
The keyboard event listener is attached to the player container element and is cleaned up when the component unmounts.

### Browser Compatibility
Keyboard controls work on all modern browsers that support:
- `KeyboardEvent` API
- `e.preventDefault()`
- Element focus management

## Future Enhancements

Potential additions to keyboard controls:
- `M` - Toggle mute
- `F` - Toggle fullscreen
- `C` - Toggle captions/subtitles
- `0-9` - Seek to percentage (0% to 90%)
- `,` / `.` - Frame by frame navigation (when paused)
- `+` / `-` - Adjust playback speed

## Testing

To test keyboard controls:
1. Click on the video player to focus it
2. Press `Space` to play/pause
3. Use arrow keys to navigate and adjust volume
4. Verify that controls work as expected
5. Test that keyboard input in input fields is not affected

## Notes

- The container must have focus for keyboard controls to work
- Focus is automatically set when clicking on the player
- The outline on focus is removed via CSS for better aesthetics
- Keyboard events in input/textarea elements are ignored to prevent conflicts
