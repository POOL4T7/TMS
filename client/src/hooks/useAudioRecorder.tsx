import { useState, useEffect, useRef } from 'react';

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string[]>([]);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);

  // types for media recorder and streams
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const combinedStreamRef = useRef<MediaStream | null>(null);
  const displayMediaStreamRef = useRef<MediaStream | null>(null);
  const userMediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop();
      }
      stopScreenShare();
    };
  }, []);

  const startScreenShare = async () => {
    try {
      const displayMediaStream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
      });
      displayMediaStreamRef.current = displayMediaStream;

      // Stop the video tracks
      displayMediaStream.getVideoTracks().forEach((track) => track.stop());

      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      userMediaStreamRef.current = userMediaStream;

      setIsScreenSharing(true);
    } catch (error) {
      console.error('Error starting screen share:', error);
      revokeScreenShare();
    }
  };

  const startRecording = () => {
    if (!displayMediaStreamRef.current || !userMediaStreamRef.current) {
      reRequestScreenShare();
      console.error('Screen share or microphone access not available.');
      return;
    }

    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();

    const displaySource = audioContext.createMediaStreamSource(
      displayMediaStreamRef.current
    );
    displaySource.connect(destination);

    const userSource = audioContext.createMediaStreamSource(
      userMediaStreamRef.current
    );
    userSource.connect(destination);

    combinedStreamRef.current = destination.stream;

    if (combinedStreamRef.current) {
      mediaRecorderRef.current = new MediaRecorder(combinedStreamRef.current);
    }

    audioChunksRef.current = [];

    mediaRecorderRef.current!.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current!.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl((prevUrls) => [...prevUrls, audioUrl]);
    };

    mediaRecorderRef.current?.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const stopScreenShare = () => {
    if (displayMediaStreamRef.current) {
      displayMediaStreamRef.current
        .getTracks()
        .forEach((track) => track.stop());
      displayMediaStreamRef.current = null;
    }
    if (userMediaStreamRef.current) {
      userMediaStreamRef.current.getTracks().forEach((track) => track.stop());
      userMediaStreamRef.current = null;
    }
    setIsScreenSharing(false);
  };

  const revokeScreenShare = () => {
    console.log('Screen share was not allowed or was revoked.');
    stopScreenShare();
  };

  const reRequestScreenShare = async () => {
    stopScreenShare();
    await startScreenShare();
  };

  return {
    isRecording,
    isScreenSharing,
    audioUrl,
    startScreenShare,
    startRecording,
    stopRecording,
    stopScreenShare,
    reRequestScreenShare,
  };
};

export default useAudioRecorder;
