/**
 * SIMPLE ABR TEST EXAMPLE
 * Copy this code to test the Adaptive Bitrate Streaming feature
 */

import React from 'react';
import { ReactBlackPlayer } from 'react-black-player';
import type { VideoSource } from 'react-black-player';

const ABRTestExample = () => {
  // Test HLS stream with multiple quality levels
  const testSource: VideoSource[] = [
    {
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      type: 'application/x-mpegURL',
      quality: 'auto',
      poster: 'https://image.mux.com/x36xhzz/thumbnail.jpg',
      aspectRatio: '16/9',
    },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto' }}>
      <h1>ABR Test</h1>
      <p>
        Click the Settings icon (gear) → Quality to see all available quality levels
        detected from the HLS stream.
      </p>
      
      <ReactBlackPlayer
        sources={testSource}
        controls={{
          quality: true, // Enable quality selector
          settings: true, // Enable settings menu
        }}
        onQualityChange={(quality) => {
          console.log('✅ Quality changed to:', quality);
        }}
      />
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Expected Behavior:</h3>
        <ul>
          <li>✅ Settings menu should show "Quality" option</li>
          <li>✅ Quality menu should list: auto, 1080p, 720p, 480p, 360p, 240p</li>
          <li>✅ Selecting a quality should switch seamlessly</li>
          <li>✅ "auto" should enable adaptive bitrate streaming</li>
          <li>✅ Console should log quality changes</li>
        </ul>
      </div>
    </div>
  );
};

export default ABRTestExample;

/**
 * ALTERNATIVE TEST STREAMS:
 * 
 * 1. Bitmovin Sintel:
 *    https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
 * 
 * 2. Art of Motion:
 *    https://cdn.bitmovin.com/content/assets/art-of-motion-dash-hls-progressive/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8
 * 
 * 3. Apple Test Stream:
 *    https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8
 */
