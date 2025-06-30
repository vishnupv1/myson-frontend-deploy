import React from 'react';

const YouTubeShort: React.FC = () => {
  return (
    <div style={{ position: 'relative', paddingBottom: '40%', height: 0, overflow: 'hidden' }}>
      <iframe
        src="https://www.youtube.com/embed/M7I9_31XOwU?autoplay=1&mute=1&playsinline=1"
        title="YouTube Short"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: '0',
        }}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeShort;
