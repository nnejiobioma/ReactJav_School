'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  CheckCircle2, 
  Settings,
  Sparkles
} from 'lucide-react';
import { formatTimeMMSS } from '@/lib/utils';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  initialTime?: number;
  isCompleted?: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
}

export default function VideoPlayer({
  videoUrl,
  title,
  initialTime = 0,
  isCompleted = false,
  onTimeUpdate,
  onComplete,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(isCompleted);

  // Resume from saved position
  useEffect(() => {
    if (videoRef.current && initialTime > 0) {
      videoRef.current.currentTime = initialTime;
      setCurrentTime(initialTime);
    }
  }, [initialTime, videoUrl]);

  useEffect(() => {
    setHasCompleted(isCompleted);
  }, [isCompleted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(curr);

    onTimeUpdate?.(curr, dur);

    // Auto-mark completed when 90% watched
    if (!hasCompleted && curr / dur >= 0.9) {
      setHasCompleted(true);
      onComplete?.();
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    if (initialTime > 0) {
      videoRef.current.currentTime = initialTime;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const skipSeconds = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const changePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        backgroundColor: '#000000',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setHasCompleted(true);
          onComplete?.();
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          cursor: 'pointer',
        }}
      />

      {/* Completion Banner */}
      {hasCompleted && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(16, 185, 129, 0.9)',
          backdropFilter: 'blur(8px)',
          color: '#ffffff',
          padding: '0.35rem 0.75rem',
          borderRadius: '9999px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
          zIndex: 10,
        }}>
          <CheckCircle2 size={14} />
          <span>Lesson Completed</span>
        </div>
      )}

      {/* Center Play Button Overlay if Paused */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: '4.5rem',
            height: '4.5rem',
            borderRadius: '50%',
            background: 'var(--grad-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 35px rgba(99, 102, 241, 0.6)',
            transition: 'transform 0.2s ease',
          }}>
            <Play size={28} color="#ffffff" style={{ marginLeft: '4px' }} />
          </div>
        </div>
      )}

      {/* Control Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1.25rem',
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,13,20,0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 20,
        }}
      >
        {/* Progress Bar / Scrubber */}
        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          style={{
            width: '100%',
            accentColor: '#8b5cf6',
            cursor: 'pointer',
            height: '5px',
          }}
        />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff',
          fontSize: '0.85rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <button
              onClick={togglePlay}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={() => skipSeconds(-10)}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              title="Rewind 10s"
            >
              <RotateCcw size={18} />
            </button>

            <button
              onClick={() => skipSeconds(10)}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              title="Forward 10s"
            >
              <RotateCw size={18} />
            </button>

            {/* Time display */}
            <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              {formatTimeMMSS(currentTime)} / {formatTimeMMSS(duration)}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Volume */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                onClick={toggleMute}
                style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                style={{ width: '60px', accentColor: '#8b5cf6', height: '4px' }}
              />
            </div>

            {/* Playback speed */}
            <button
              onClick={changePlaybackRate}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '0.35rem' }}
            >
              {playbackRate}x
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
              title="Fullscreen"
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
