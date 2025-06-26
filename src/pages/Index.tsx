
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set proper viewport for iPad
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no');
    }
  }, []);

  const handleChannelSelect = (channel: number) => {
    navigate(`/channel${channel}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg">
          TaliTV
        </h1>
        <p className="text-2xl md:text-3xl text-blue-100 font-medium">
          Choose Your Channel
        </p>
      </div>

      {/* Channel Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Channel 1 - TaliTV */}
        <button
          onClick={() => handleChannelSelect(1)}
          className="group bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 
                     text-white p-12 rounded-3xl shadow-2xl transform transition-all duration-300 
                     hover:scale-105 active:scale-95 min-h-[200px] flex flex-col items-center justify-center
                     touch-manipulation select-none"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">
            📺
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">TaliTV</h2>
          <p className="text-xl md:text-2xl opacity-90">Channel 1</p>
        </button>

        {/* Channel 2 - Spicks & Specks */}
        <button
          onClick={() => handleChannelSelect(2)}
          className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 
                     text-white p-12 rounded-3xl shadow-2xl transform transition-all duration-300 
                     hover:scale-105 active:scale-95 min-h-[200px] flex flex-col items-center justify-center
                     touch-manipulation select-none"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">
            🎵
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center leading-tight">
            Spicks & Specks
          </h2>
          <p className="text-xl md:text-2xl opacity-90">Channel 2</p>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-blue-200 text-lg md:text-xl">
          Tap a channel to start watching
        </p>
      </div>
    </div>
  );
};

export default Index;
