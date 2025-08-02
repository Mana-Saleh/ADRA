import React, { useRef, useEffect, useState } from 'react';
import { FiHeart, FiMessageSquare, FiShare2, FiMoreVertical, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { motion } from 'framer-motion';
// Import videos
import video1 from '../assets/videos/video3.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video1.mp4';

// Mock comments data
const mockComments = [
  {
    id: 1,
    user: "@travelfan123",
    text: "This place looks amazing! 😍",
    likes: 42,
    timestamp: "2h ago",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    id: 2,
    user: "@wanderlust",
    text: "I was there last month, the food is incredible!",
    likes: 28,
    timestamp: "5h ago",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 3,
    user: "@globetrotter",
    text: "What camera did you use for these shots?",
    likes: 15,
    timestamp: "1d ago",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  }
];

const Shorts: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [likedVideos, setLikedVideos] = useState<number[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Record<number, typeof mockComments>>({
    1: [...mockComments],
    2: [...mockComments],
    3: [...mockComments]
  });
  // State for language direction (example)
  // In a real app, this might come from a context or prop
  const [languageDirection, setLanguageDirection] = useState<'ltr' | 'rtl'>('ltr'); 

  const videos = [
    {
      id: 1,
      title: "Hidden Gems in Marrakech",
      description: "Discover secret spots only locals know about",
      likes: "12.4K",
      comments: "1.2K",
      username: "@travelwithme",
      userPic: "https://randomuser.me/api/portraits/women/44.jpg",
      src: video1,
      tags: ["#Morocco", "#Travel", "#HiddenGems"]
    },
    {
      id: 2,
      title: "Street Food Tour in Bangkok",
      description: "Best eats in Bangkok's legendary night markets",
      likes: "24.7K",
      comments: "3.1K",
      username: "@foodexplorer",
      userPic: "https://randomuser.me/api/portraits/men/32.jpg",
      src: video2,
      tags: ["#Thailand", "#StreetFood", "#Foodie"]
    },
    {
      id: 3,
      title: "Alpine Sunrise Experience",
      description: "Waking up to this breathtaking view in the Swiss Alps",
      likes: "56.2K",
      comments: "4.8K",
      username: "@adventure_seeker",
      userPic: "https://randomuser.me/api/portraits/women/68.jpg",
      src: video3,
      tags: ["#Switzerland", "#Mountains", "#Sunrise"]
    }
  ];

  // Handle video play/pause with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;
          const videoIndex = videoRefs.current.indexOf(video);
          if (entry.isIntersecting) {
            // Pause all other videos
            videoRefs.current.forEach((v, i) => {
              if (v && i !== videoIndex) {
                v.pause();
                v.currentTime = 0;
              }
            });
            // Play current video
            video.play().catch(e => console.log("Autoplay prevented:", e));
            setActiveVideoIndex(videoIndex);
            setShowComments(false); // Close comments when changing videos
          } else if (videoIndex === activeVideoIndex) {
            video.pause();
            setActiveVideoIndex(null);
          }
        });
      },
      { 
        threshold: 0.8,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    videoRefs.current.forEach(video => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach(video => {
        if (video) observer.unobserve(video);
      });
    };
  }, [activeVideoIndex]);

  // Handle mute state for all videos
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  const stopAllVideos = () => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setActiveVideoIndex(null);
  };

  const toggleLike = (videoId: number) => {
    setLikedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId) 
        : [...prev, videoId]
    );
  };

  const handleAddComment = (videoId: number) => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      user: "@yourusername",
      text: commentInput,
      likes: 0,
      timestamp: "Just now",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    };
    setComments(prev => ({
      ...prev,
      [videoId]: [newComment, ...prev[videoId]]
    }));
    setCommentInput("");
  };

  return (
    // Added `dir` attribute for AR/EN support and adjusted for potential light mode backgrounds
    <div 
      ref={containerRef}
      className="relative w-full h-[calc(100vh-112px)] bg-black dark:bg-gray-900 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      dir={languageDirection} // Set direction based on state
    >
      {videos.map((video, index) => (
        <div 
          key={video.id}
          className="relative h-[calc(98vh-75px)] w-full snap-start flex items-center justify-center bg-black dark:bg-gray-900"
          onClick={(e) => {
            // Only handle tap if not clicking on interactive elements
            if (!(e.target as HTMLElement).closest('.interactive')) {
              const video = videoRefs.current[index];
              if (video) {
                if (video.paused) {
                  stopAllVideos();
                  video.play();
                  setActiveVideoIndex(index);
                } else {
                  video.pause();
                  setActiveVideoIndex(null);
                }
              }
            }
          }}
        >
          {/* Video container */}
          <div className="relative h-full w-full max-w-full flex items-center justify-center overflow-hidden">
            <video
              ref={el => videoRefs.current[index] = el}
              src={video.src}
              className="h-full max-h-[calc(100vh-112px)] w-auto object-contain"
              style={{
                aspectRatio: '9/16'
              }}
              loop
              playsInline
              muted={isMuted}
            />
          </div>

          {/* Video info overlay - Text sizes reduced */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 pointer-events-none">
            <div className="mb-3 sm:mb-4 max-w-2xl">
              {/* Title */}
              <h3 className="text-white font-bold text-lg sm:text-xl mb-1 sm:mb-2">{video.title}</h3> 
              {/* Description */}
              <p className="text-gray-200 text-sm sm:text-base mb-2 sm:mb-3">{video.description}</p> 
              {/* Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {video.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 sm:px-3 sm:py-1 bg-white/10 text-white rounded-full text-xs sm:text-sm backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white">
                    <img 
                      src={video.userPic} 
                      alt={`${video.username}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    {/* Username */}
                    <span className="text-white font-medium text-sm sm:text-base block">{video.username}</span> 
                    {/* Follow Button */}
                    <button className="text-xs sm:text-sm text-white/80 hover:text-white transition interactive">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side actions - Text sizes reduced */}
          <div className="absolute right-4 sm:right-6 bottom-24 sm:bottom-32 flex flex-col items-center space-y-4 sm:space-y-6 z-20">
            {/* Like Button */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center group interactive"
              aria-label="Like video"
              onClick={() => toggleLike(video.id)}
            >
              <div className={`p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-sm transition-colors ${
                likedVideos.includes(video.id) 
                  ? "text-red-500" 
                  : "text-white group-hover:bg-pink-500/30"
              }`}>
                <FiHeart className="text-xl sm:text-2xl" fill={likedVideos.includes(video.id) ? "#ef4444" : "none"} />
              </div>
              {/* Like Count */}
              <span className="text-white text-xs sm:text-sm mt-1 font-medium">{video.likes}</span> 
            </motion.button>
            
            {/* Comment Button */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center group interactive"
              aria-label="Comment on video"
              onClick={() => setShowComments(!showComments)}
            >
              <div className="p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-sm text-white group-hover:bg-blue-500/30 transition-colors">
                <FiMessageSquare className="text-xl sm:text-2xl" />
              </div>
              {/* Comment Count */}
              <span className="text-white text-xs sm:text-sm mt-1 font-medium">{video.comments}</span> 
            </motion.button>
            
            {/* Share Button */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center group interactive"
              aria-label="Share video"
            >
              <div className="p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-sm text-white group-hover:bg-green-500/30 transition-colors">
                <FiShare2 className="text-xl sm:text-2xl" />
              </div>
              {/* Share Label */}
              <span className="text-white text-xs sm:text-sm mt-1 font-medium">Share</span> 
            </motion.button>
          </div>

          {/* Mute toggle */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition interactive z-20"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />} {/* Slightly smaller icon */}
          </button>

          {/* Comments section - Text sizes reduced */}
          {showComments && activeVideoIndex === index && (
            <div className="absolute inset-0 bg-black/80 dark:bg-gray-900/90 z-30 flex flex-col p-3 sm:p-4 pt-12 sm:pt-16 pointer-events-auto">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h3 className="text-white font-bold text-lg sm:text-xl">Comments</h3>
                <button 
                  onClick={() => setShowComments(false)}
                  className="text-white text-xl sm:text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4">
                {comments[video.id]?.map(comment => (
                  <div key={comment.id} className="flex space-x-2 sm:space-x-3">
                    <img 
                      src={comment.avatar} 
                      alt={comment.user}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                    <div className="flex-1">
                      {/* Comment User */}
                      <div className="text-white font-medium text-sm sm:text-base">{comment.user}</div> 
                      {/* Comment Text */}
                      <div className="text-gray-200 text-sm">{comment.text}</div> 
                      <div className="flex items-center space-x-3 sm:space-x-4 text-gray-400 text-xs sm:text-sm mt-1">
                        <span>{comment.timestamp}</span>
                        <button className="flex items-center space-x-1">
                          <FiHeart size={12} /> {/* Smaller icon */}
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 mt-3 sm:mt-4">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-gray-800 dark:bg-gray-700 text-white rounded-full px-3 py-2 sm:px-4 sm:py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button 
                  onClick={() => handleAddComment(video.id)}
                  disabled={!commentInput.trim()}
                  className="bg-blue-500 text-white text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full disabled:opacity-50 hover:bg-blue-600 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Shorts;