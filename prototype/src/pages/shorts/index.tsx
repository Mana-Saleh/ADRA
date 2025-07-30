// src/pages/shorts/index.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiBookmark,
  FiUser,
  FiMusic,
  FiMoreVertical,
  FiSearch,
  FiHome,
  FiX
} from "react-icons/fi";

import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";

const Shorts = () => {
  const navigate = useNavigate();
  const shortsData = [
    {
      id: 1,
      username: "travel_explorer",
      fullname: "World Wanderer",
      videoUrl: video1,
      likes: 12500,
      comments: 320,
      shares: 45,
      bookmarks: 89,
      caption: "Hidden waterfall in the Amazon jungle 🌿 #Nature #Adventure #Waterfall",
      song: "Original Sound - Nature Sounds",
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      username: "foodie_adventures",
      fullname: "Taste Explorer",
      videoUrl: video2,
      likes: 8900,
      comments: 150,
      shares: 22,
      bookmarks: 45,
      caption: "Street food tour in Bangkok! 🔥 #Foodie #StreetFood #Bangkok",
      song: "Trending Sound - Food Vibes",
      isLiked: true,
      isBookmarked: false
    },
    {
      id: 3,
      username: "urban_photographer",
      fullname: "City Lens",
      videoUrl: video3,
      likes: 15600,
      comments: 420,
      shares: 87,
      bookmarks: 120,
      caption: "Night skyline timelapse 🌃 #Photography #CityLife #Timelapse",
      song: "Chill Beats - Urban Nights",
      isLiked: false,
      isBookmarked: true
    }
  ];

  const [shorts, setShorts] = useState(shortsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLike = (id: number) => {
    setShorts(prev => prev.map(short =>
      short.id === id
        ? {
            ...short,
            isLiked: !short.isLiked,
            likes: short.isLiked ? short.likes - 1 : short.likes + 1
          }
        : short
    ));
  };

  const handleBookmark = (id: number) => {
    setShorts(prev => prev.map(short =>
      short.id === id
        ? { ...short, isBookmarked: !short.isBookmarked }
        : short
    ));
  };

  useEffect(() => {
    videoRefs.current.forEach(video => video?.pause());
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(console.log);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setCurrentIndex(prev => {
        if (e.deltaY > 0 && prev < shorts.length - 1) return prev + 1;
        if (e.deltaY < 0 && prev > 0) return prev - 1;
        return prev;
      });
    };
    const container = containerRef.current;
    container?.addEventListener('wheel', handleWheel, { passive: false });
    return () => container?.removeEventListener('wheel', handleWheel);
  }, [shorts.length]);

  useEffect(() => {
    let startY = 0, endY = 0;
    const handleTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => { endY = e.touches[0].clientY; };
    const handleTouchEnd = () => {
      const deltaY = startY - endY;
      if (Math.abs(deltaY) > 50) {
        setCurrentIndex(prev => deltaY > 0
          ? Math.min(prev + 1, shorts.length - 1)
          : Math.max(prev - 1, 0));
      }
    };
    const container = containerRef.current;
    container?.addEventListener('touchstart', handleTouchStart, { passive: true });
    container?.addEventListener('touchmove', handleTouchMove, { passive: true });
    container?.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      container?.removeEventListener('touchstart', handleTouchStart);
      container?.removeEventListener('touchmove', handleTouchMove);
      container?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [shorts.length]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      {/* Home Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white font-semibold"
        >
          <FiHome size={24} />
          <span>Home</span>
        </button>
        
        <div className="flex gap-6">
          <button className="text-white/80 font-medium pb-1 border-b-2 border-transparent hover:border-white/50 transition-colors">
            Following
          </button>
          <button className="text-white font-bold pb-1 border-b-2 border-white">
            For You
          </button>
        </div>
        
        <button className="text-white">
          <FiSearch size={24} />
        </button>
      </div>

      <div className="relative w-full h-full pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <video
                ref={(el) => (videoRefs.current[currentIndex] = el)}
                src={shorts[currentIndex].videoUrl}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-between p-4 pb-24 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex-1 text-white space-y-3 pr-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <FiUser className="text-white" />
                    </div>
                    <div className="text-sm">
                      <div className="font-bold">@{shorts[currentIndex].username}</div>
                      <div className="text-xs opacity-90">{shorts[currentIndex].fullname}</div>
                    </div>
                    <button className="ml-2 bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full text-xs font-semibold">
                      Follow
                    </button>
                  </div>
                  <p className="text-sm max-w-[70%]">{shorts[currentIndex].caption}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <FiMusic className="text-white" />
                    <span className="opacity-90">{shorts[currentIndex].song}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-5">
                  <button 
                    onClick={() => handleLike(shorts[currentIndex].id)} 
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`p-2 rounded-full ${shorts[currentIndex].isLiked ? 'bg-red-500' : 'bg-black/30'}`}>
                      <FiHeart className={`text-xl ${shorts[currentIndex].isLiked ? 'text-white' : 'text-white'}`} />
                    </div>
                    <div className="text-xs text-center">{shorts[currentIndex].likes}</div>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <div className="p-2 rounded-full bg-black/30">
                      <FiMessageSquare className="text-xl text-white" />
                    </div>
                    <div className="text-xs text-center">{shorts[currentIndex].comments}</div>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <div className="p-2 rounded-full bg-black/30">
                      <FiShare2 className="text-xl text-white" />
                    </div>
                    <div className="text-xs text-center">{shorts[currentIndex].shares}</div>
                  </button>
                  <button 
                    onClick={() => handleBookmark(shorts[currentIndex].id)} 
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`p-2 rounded-full ${shorts[currentIndex].isBookmarked ? 'bg-blue-500' : 'bg-black/30'}`}>
                      <FiBookmark className={`text-xl ${shorts[currentIndex].isBookmarked ? 'text-white' : 'text-white'}`} />
                    </div>
                    <div className="text-xs text-center">{shorts[currentIndex].bookmarks}</div>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <div className="p-2 rounded-full bg-black/30">
                      <FiMoreVertical className="text-xl text-white" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
        {shorts.map((_, index) => (
          <div
            key={index}
            className={`w-1 rounded-full transition-all duration-300 ${index === currentIndex ? 'h-10 bg-white' : 'h-2 bg-white/50'}`}
          />
        ))}
      </div>

      {/* Close Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm"
      >
        <FiX className="text-white text-xl" />
      </button>
    </div>
  );
};

export default Shorts;