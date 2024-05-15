import React, { useState, useEffect, useRef } from 'react';

const CameraComponent = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [photos, setPhotos] = useState([]);
  

  // Function to take a photo
  const takePhoto = () => {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoURL = canvas.toDataURL('image/png');
    setPhotos(prevPhotos => [...prevPhotos, photoURL]);
  };

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    enableCamera();

    // Clean up function to stop the media stream when component unmounts
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  useEffect(() => {
    // Take a photo every 8 seconds
    const interval = setInterval(() => {
      takePhoto();
    }, 8000);

    // Clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video id="video" autoPlay></video>
      <div>
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default CameraComponent;
