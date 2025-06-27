
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Channel1 = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log('Video can play, attempting fullscreen...');
      
      // Try different fullscreen methods for iPad compatibility
      const videoElement = video as any;
      if (videoElement.webkitEnterFullscreen) {
        videoElement.webkitEnterFullscreen();
      } else if (video.requestFullscreen) {
        video.requestFullscreen().catch(err => {
          console.log('Fullscreen request failed:', err);
        });
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      }
    };

    const exitHandler = () => {
      if (!document.fullscreenElement &&
          !(video as any).webkitDisplayingFullscreen) {
        navigate('/');
      }
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      // Auto-return to homepage on error after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    };

    const handleLoadStart = () => {
      console.log('Loading TaliTV stream...');
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('fullscreenchange', exitHandler);
    video.addEventListener('webkitendfullscreen', exitHandler);
    
    // Set the stream URL
    video.src = 'http://192.168.4.109:8000/stream/channels/4.m3u8';
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('fullscreenchange', exitHandler);
      video.removeEventListener('webkitendfullscreen', exitHandler);
    };
  }, [navigate]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">
      {/* Back Button Overlay */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-50 bg-black bg-opacity-60 hover:bg-opacity-80 
                   text-white px-6 py-4 rounded-2xl flex items-center gap-3 text-xl font-medium
                   transition-all duration-300 touch-manipulation backdrop-blur-sm"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <ArrowLeft size={24} />
        Back
      </button>

      {/* Loading Indicator */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-400 to-rose-500">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-white mx-auto mb-6"></div>
          <h2 className="text-4xl font-bold mb-2">Loading TaliTV</h2>
          <p className="text-xl opacity-80">Please wait...</p>
        </div>
      </div>

      {/* Video Player */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        controls
        muted={false}
        preload="metadata"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover'
        }}
      >
        <source src="http://192.168.4.109:8000/stream/channels/4.m3u8" type="application/x-mpegURL" />
        Your browser does not support HLS video playback.
      </video>

      {/* Channel Info Overlay */}
      <div className="absolute bottom-6 left-6 bg-pink-500 bg-opacity-80 text-white px-6 py-3 rounded-xl backdrop-blur-sm flex items-center">
        <img src="/talitv_logo.png" className="h-10 w-10 mr-3" alt="" />
        <h3 className="text-2xl font-bold">TaliTV</h3>
      </div>
    </div>
  );
};

export default Channel1;
