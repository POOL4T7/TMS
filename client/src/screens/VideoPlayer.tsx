// src/VideoPlayer.tsx
import { Box, Container } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Pause, PlayArrow } from '@mui/icons-material';

interface VideoPlayerProps {
  src?: string;
}

const src = 'https://live-par-2-abr.livepush.io/vod/bigbuckbunnyclip.mp4';

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState<string>('2:36/9:56');

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      );
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress = parseFloat(e.target.value);
    if (videoRef.current) {
      const newTime = (progress / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
    setProgress(progress);
  };

  return (
    <Container
      maxWidth='lg'
      sx={{
        width: '100%',
      }}
    >
      <Box>
        <video
          ref={videoRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onClick={handlePlayPause}
          width='600'
          style={{
            width: '100%',
          }}
          onLoad={(e) => {
            // not working
            console.log(e);
            if (videoRef.current) {
              const minute = (videoRef?.current?.duration || 0) / 60;
              const sec =
                Number(videoRef?.current?.duration || 0) - minute * 60;
              console.log(minute, sec);
              setDuration(`${Math.floor(minute)}:${Math.floor(sec)}`);
            }
          }}
        ></video>
        <div className='controls'>
          <button onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </button>
          <span> {duration} </span>
          <input
            type='range'
            min='0'
            max='100'
            value={progress}
            onChange={handleProgressChange}
          />
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </Box>
    </Container>
  );
};

export default VideoPlayer;
