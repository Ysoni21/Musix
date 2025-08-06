import { useEffect, useRef, useState } from 'react';
import './Modal.css';

function Modal({ track, onclose }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onclose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onclose]);

  // Track current time of audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="modal-backdrop" onClick={onclose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onclose}>×</button>

        <img
          src={track.album.cover_big}
          alt={track.title}
          className="modal-image"
        />
        <h2 className="modal-title">{track.title}</h2>
        <p className="modal-artist">{track.artist.name}</p>

        {track.preview ? (
          <div className="modal-audio-wrapper">
            <audio controls ref={audioRef} className="modal-audio">
              <source src={track.preview} type="audio/mpeg" />
              Your browser does not support audio playback.
            </audio>
            <div className="audio-timer">
              ⏱ {formatTime(currentTime)} / 0:30
            </div>
          </div>
        ) : (
          <p>No audio preview available.</p>
        )}
      </div>
    </div>
  );
}

export default Modal;
