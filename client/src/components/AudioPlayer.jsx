import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ trackId, trackName, artistName, previewUrl, albumImage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [previewUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!previewUrl) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#666'
      }}>
        <span>🎵</span>
        <span>No preview available</span>
        <a 
          href={`https://open.spotify.com/track/${trackId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#1db954',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Open in Spotify
        </a>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      margin: '8px 0'
    }}>
      {albumImage && (
        <img 
          src={albumImage} 
          alt={`${trackName} album cover`}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '6px',
            objectFit: 'cover'
          }}
        />
      )}
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 'bold',
          fontSize: '14px',
          color: '#333',
          marginBottom: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {trackName}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '8px'
        }}>
          {artistName}
        </div>
        
        <audio ref={audioRef} src={previewUrl} preload="metadata" />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={togglePlayPause}
            style={{
              backgroundColor: '#1db954',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: '#666', minWidth: '35px' }}>
              {formatTime(currentTime)}
            </span>
            
            <div 
              style={{
                flex: 1,
                height: '4px',
                backgroundColor: '#ddd',
                borderRadius: '2px',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={handleSeek}
            >
              <div 
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  height: '100%',
                  backgroundColor: '#1db954',
                  borderRadius: '2px'
                }}
              />
            </div>
            
            <span style={{ fontSize: '11px', color: '#666', minWidth: '35px' }}>
              {formatTime(duration)}
            </span>
          </div>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{
              width: '60px',
              height: '4px',
              background: '#ddd',
              outline: 'none',
              borderRadius: '2px'
            }}
          />
          <span style={{ fontSize: '11px', color: '#666' }}>🔊</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
