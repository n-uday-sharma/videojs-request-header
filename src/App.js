import React from 'react';
import './App.css';
import VideoJS from './VideoJS';
import videojs from 'video.js';
const App = () => {
  
  const playerRef = React.useRef(null);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [ {
      src: `https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8`, //add video url here
      type: "application/x-mpegurl",
      label: "original",
      // selected:
      //   navigator && navigator.connection.effectiveType === "4g" && true,
    }]
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // You can handle player events here, for example:
    player.on('waiting', () => {
     // videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      // videojs.log('player will dispose');
    });
    console.log(videojs.Vhs.xhr.onRequest);
    const globalRequestHook = (options) => {
      console.log(options);
      options.beforeSend = (xhr) => {
        xhr.setRequestHeader('foo', 'bar');
      };
      return options;
    };
    videojs.Vhs.xhr.onRequest(globalRequestHook);
    console.log(videojs.Vhs.xhr.onRequest);
    player.on('xhr-hooks-ready', () => {
      console.log('test');
      const playerXhrRequestHook = (options) => {
        options.beforeSend = (xhr) => {
          xhr.setRequestHeader('foo', 'bar');
        };
        return options;
      };
      player.tech().vhs.xhr.onRequest(playerXhrRequestHook);
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
}

export default App;
