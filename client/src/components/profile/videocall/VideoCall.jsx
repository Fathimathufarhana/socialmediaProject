import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Videocam, Mic, MicOff, ScreenShare, StopScreenShare, VideocamOff } from '@mui/icons-material';
import './videocall.css'; 
import { Link } from 'react-router-dom';

const CameraComponent = () => {
  const videoRef = useRef();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenShareStream, setScreenShareStream] = useState(null);

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
    setIsCameraOn(!isCameraOn);
  };

  const toggleMicrophone = () => {
    if (isMicrophoneOn) {
      stopMicrophone();
    } else {
      startMicrophone();
    }
    setIsMicrophoneOn(!isMicrophoneOn);
  };

  const toggleScreenSharing = () => {
    if (isScreenSharing) {
      stopScreenSharing();
    } else {
      startScreenSharing();
    }
    setIsScreenSharing(!isScreenSharing);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: isMicrophoneOn });

      // Assign the stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        // Set the srcObject to null to stop displaying the video
        videoRef.current.srcObject = null;
      }
    }
  };

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Update the camera stream with audio
      if (videoRef.current) {
        const currentStream = videoRef.current.srcObject;
        if (currentStream) {
          const audioTracks = stream.getAudioTracks();
          currentStream.addTrack(audioTracks[0]);
        }
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopMicrophone = () => {
    // You can implement stopping the microphone if needed
  };

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      // Assign the screen sharing stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScreenShareStream(stream);
      }
    } catch (error) {
      console.error('Error accessing screen sharing:', error);
    }
  };

  const stopScreenSharing = () => {
    if (screenShareStream) {
      const tracks = screenShareStream.getTracks();
      tracks.forEach((track) => track.stop());
      // Set the srcObject to null to stop displaying the screen share
      videoRef.current.srcObject = null;
      setScreenShareStream(null);
    }
  };

  const handleEndCall = () => {
    stopCamera();
    stopMicrophone();
    stopScreenSharing();
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
      stopScreenSharing();
    };
  }, []); // Only run once on mount

  return (
    <div className="camera-container">
      <video ref={videoRef} width="640" height="480" autoPlay playsInline></video>
      <div className="button-container">
        <IconButton onClick={toggleCamera} color="primary">
          {isCameraOn ? <Videocam /> : <VideocamOff />}
        </IconButton>
        <IconButton onClick={toggleMicrophone} color="primary">
          {isMicrophoneOn ? <Mic /> : <MicOff />}
        </IconButton>
        <IconButton onClick={toggleScreenSharing} color="primary">
          {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
        </IconButton>
        <Button onClick={handleEndCall} color="error" variant="contained"  component={Link} to="/home">
          End Call
        </Button>
      </div>
    </div>
  );
};
// component={Link} to="/logout"

export default CameraComponent;
