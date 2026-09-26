import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface RivieraBackgroundProps {
  children?: React.ReactNode;
}

export const RivieraBackground: React.FC<RivieraBackgroundProps> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      video.muted = true;
      setIsMuted(true);
      video.play().catch((e) => console.warn('Video autoplay prevented:', e));
    });
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-50">
      {/* Background Video Element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover z-0 transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-85' : 'opacity-30'
        }`}
      >
        <source src={`${import.meta.env.BASE_URL}videos/riviera.webm`} type="video/webm" />
        <source
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Nice_Port.webmhd.webm"
          type="video/webm"
        />
      </video>

      {/* Luminous Mediterranean White Scrim & Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-white/90 via-white/45 to-white/75 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-sky-100/15 pointer-events-none" />

      {/* Discrete Video Controls in bottom-left */}
      <div className="absolute bottom-3 left-3 z-30 flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={togglePlay}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200/90 shadow-xs transition-colors"
          title={isPlaying ? 'Pause video' : 'Play video'}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>

        <button
          onClick={toggleMute}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200/90 shadow-xs transition-colors"
          title={isMuted ? 'Unmute video' : 'Mute video'}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
        </button>

        <span className="text-[10px] text-slate-600 font-semibold tracking-wide pl-1 select-none hidden sm:inline drop-shadow-xs">
          French Riviera · Côte d’Azur
        </span>
      </div>

      {/* Children content rendered on top of background */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};
