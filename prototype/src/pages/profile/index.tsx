// src/pages/profile/index.tsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiHeart,
  FiBookmark,
  FiEdit2,
  FiCamera,
  FiPlus,
  FiSettings,
  FiLogOut,
  FiGrid,
  FiVideo,
  FiImage,
  FiLoader,
  FiCheckCircle,
  FiMessageSquare,
  FiPlay,
  FiShare2,
  FiHome,
  FiAward,
  FiBarChart2,
  FiArrowLeft
} from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

// Default avatar image
const DEFAULT_AVATAR = '';

// Type definitions
type Post = {
  id: number;
  type: "image" | "video";
  content: string;
  mediaUrl: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
};

type QuickAction = {
  title: string;
  icon: React.ReactNode;
  count: number;
  color: string;
};

type AdditionalAction = {
  title: string;
  icon: React.ReactNode;
  action?: () => void;
};

type OverviewStat = {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  isPositive?: boolean;
};

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [tempAvatar, setTempAvatar] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "posts" | "media">("overview");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      type: "image",
      content: "Exploring the beautiful mountains this weekend!",
      mediaUrl: "",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 2,
      type: "video",
      content: "Quick cooking tutorial for local delicacy",
      mediaUrl: "",
      timestamp: "1 day ago",
      likes: 156,
      comments: 23,
      isLiked: true,
      isBookmarked: true
    }
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // User display data with fallbacks
  const display = {
    name: user?.name || "Anonymous User",
    email: user?.email || "No email provided",
    phone: user?.phone || "Not specified",
    location: user?.location || "Unknown location",
    joinDate: user?.joinDate || "Unknown date",
    picture: user?.picture || DEFAULT_AVATAR,
    bio: user?.bio || "Tell us about yourself...",
  };

  // Quick actions with state
  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    { title: "Wishlist", icon: <FiHeart />, count: 12, color: "bg-rose-100 text-rose-600" },
    { title: "Bookmarks", icon: <FiBookmark />, count: 8, color: "bg-blue-100 text-blue-600" },
  ]);

  // Additional actions with handlers
  const additionalActions: AdditionalAction[] = [
    { 
      title: "Settings", 
      icon: <FiSettings />, 
      action: () => navigate('/settings') 
    },
    { 
      title: "Log Out", 
      icon: <FiLogOut />, 
      action: handleLogout 
    },
  ];

  // Overview statistics
  const overviewStats: OverviewStat[] = [
    { title: "Total Posts", value: "24", icon: <FiHome />, change: "+12%", isPositive: true },
    { title: "Engagement", value: "1.2K", icon: <FiBarChart2 />, change: "+8%", isPositive: true },
    { title: "Achievements", value: "5", icon: <FiAward />, change: "2 new", isPositive: true },
  ];

  function handleLogout() {
    logout();
    navigate('/login');
  }

  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setTempAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file selection for new post
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        alert('Please select an image or video file');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }

      handleUpload(file);
    }
  };

  // Simulate file upload process
  const handleUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      const newPost: Post = {
        id: posts.length + 1,
        type: file.type.includes('video') ? 'video' : 'image',
        content: `New ${file.type.includes('video') ? 'video' : 'image'} post`,
        mediaUrl: URL.createObjectURL(file),
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        isLiked: false,
        isBookmarked: false
      };
      
      setPosts([newPost, ...posts]);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 500);
    }, 3000);
  };

  // Handle like post
  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  // Handle bookmark post
  const handleBookmarkPost = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
    
    setQuickActions(quickActions.map(action => {
      if (action.title === "Bookmarks") {
        return {
          ...action,
          count: action.count + (posts.find(p => p.id === postId)?.isBookmarked ? -1 : 1)
        };
      }
      return action;
    }));
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Trigger avatar input click
  const triggerAvatarInput = () => {
    avatarInputRef.current?.click();
  };

  // Filter posts based on active tab
  const filteredPosts = activeTab === "media" 
    ? posts.filter(post => post.mediaUrl) 
    : posts;

  // Render avatar image or placeholder
  const renderAvatar = () => {
    const avatarSrc = tempAvatar || display.picture;
    if (!avatarSrc) {
      return <FiUser className="text-gray-500 text-4xl" />;
    }
    return (
      <img 
        src={avatarSrc} 
        alt={display.name} 
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '';
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  };

  // Render post media
  const renderPostMedia = (post: Post) => {
    if (!post.mediaUrl) return null;

    if (post.type === "image") {
      return (
        <div className="h-64 bg-gray-100">
          <img 
            src={post.mediaUrl} 
            alt="Post content" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="h-64 bg-gray-900 relative">
          <video 
            src={post.mediaUrl} 
            className="w-full h-full object-cover"
            controls
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <FiPlay className="text-white text-xl ml-1" />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full pb-24 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="px-4 py-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-gray-800"
          >
            My Profile
          </motion.h1>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerFileInput}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="text-lg" />
            <span className="hidden sm:inline">Create Post</span>
          </motion.button>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileSelect}
            multiple={false}
          />
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-white/50 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 relative z-10">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden shadow-md">
                {renderAvatar()}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={triggerAvatarInput}
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all"
              >
                <FiCamera className="text-gray-600" />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange} 
                  ref={avatarInputRef}
                />
              </motion.button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{display.name}</h2>
                  <p className="text-gray-600">{display.email}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className={`p-2 rounded-full ${isEditing ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"} hover:bg-gray-200 transition`}
                >
                  <FiEdit2 />
                </motion.button>
              </div>
              <p className="mt-3 text-gray-700">{display.bio}</p>
            </div>
          </div>

          {/* Editable Section */}
          <AnimatePresence>
            {isEditing && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                exit={{ opacity: 0, height: 0 }} 
                transition={{ duration: 0.3 }}
                className="pt-4 mt-4 border-t border-gray-200"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Tell us about yourself..."
                      defaultValue={display.bio}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mt-6 relative z-10">
            <InfoCard icon={<FiPhone />} label="Phone" value={display.phone} color="blue" />
            <InfoCard icon={<FiMapPin />} label="Location" value={display.location} color="purple" />
            <InfoCard icon={<FiCalendar />} label="Member Since" value={display.joinDate} color="amber" />
            <InfoCard icon={<FiMail />} label="Email" value={display.email} color="green" />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <Section title="My Collections" delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${action.color}`}>{action.icon}</div>
                  <div className="text-2xl font-bold text-gray-800">{action.count}</div>
                </div>
                <p className="mt-3 font-medium text-gray-700">{action.title}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* User Posts/Media Section */}
        <Section title="My Activity" delay={0.3}>
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium ${
                activeTab === "overview"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <FiBarChart2 className="inline mr-2" /> Overview
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium ${
                activeTab === "posts"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <FiGrid className="inline mr-2" /> Posts
            </button>
            <button
              onClick={() => setActiveTab("media")}
              className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium ${
                activeTab === "media"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <FiImage className="inline mr-2" /> Media
            </button>
          </div>

          {/* Upload Progress */}
          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100"
              >
                <div className="flex items-center">
                  {uploadProgress < 100 ? (
                    <FiLoader className="text-blue-500 mr-3 animate-spin" />
                  ) : (
                    <FiCheckCircle className="text-green-500 mr-3" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-blue-700">
                        {uploadProgress < 100 ? "Uploading..." : "Upload complete!"}
                      </span>
                      <span className="text-blue-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          uploadProgress === 100 ? "bg-green-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overview Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {overviewStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        {stat.icon}
                      </div>
                      {stat.change && (
                        <span className={`text-xs px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                    <h3 className="text-gray-500 text-sm mt-3">{stat.title}</h3>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="p-4 hover:bg-gray-50 transition">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          {post.type === 'image' ? (
                            <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden">
                              {post.mediaUrl ? (
                                <img 
                                  src={post.mediaUrl} 
                                  alt="Post thumbnail" 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <FiImage className="text-gray-400 text-xl" />
                              )}
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-md bg-gray-900 flex items-center justify-center">
                              <FiPlay className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                          <p className="text-xs text-gray-500 mt-1">{post.timestamp}</p>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <FiHeart className="mr-1" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Posts/Media Content */}
          {activeTab !== "overview" && (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                      {display.picture ? (
                        <img 
                          src={display.picture} 
                          alt={display.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <FiUser className="text-gray-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{display.name}</h3>
                      <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="text-gray-700">{post.content}</p>
                  </div>

                  {/* Media */}
                  {renderPostMedia(post)}

                  {/* Post Actions */}
                  <div className="p-4 flex justify-between items-center border-t border-gray-100">
                    <button 
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center ${post.isLiked ? 'text-rose-500' : 'text-gray-600'} hover:text-rose-500 transition`}
                    >
                      <FiHeart className="mr-2" fill={post.isLiked ? 'currentColor' : 'none'} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-500 transition">
                      <FiMessageSquare className="mr-2" />
                      <span>{post.comments}</span>
                    </button>
                    <button 
                      onClick={() => handleBookmarkPost(post.id)}
                      className={`flex items-center ${post.isBookmarked ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-500 transition`}
                    >
                      <FiBookmark className="mr-2" fill={post.isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-green-500 transition">
                      <FiShare2 className="mr-2" />
                      <span>Share</span>
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Empty State */}
              {filteredPosts.length === 0 && !isUploading && (
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {activeTab === "media" ? (
                      <FiImage className="text-gray-400 text-2xl" />
                    ) : (
                      <FiGrid className="text-gray-400 text-2xl" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-1">
                    {activeTab === "media" ? "No Media Yet" : "No Posts Yet"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {activeTab === "media" 
                      ? "Upload photos or videos to see them here" 
                      : "Share your experiences by adding posts"}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={triggerFileInput}
                    className="bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-colors flex items-center mx-auto"
                  >
                    <FiPlus className="mr-2" /> Create Post
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </Section>

        {/* Account */}
        <Section title="Account" delay={0.4}>
          <div className="space-y-3">
            {additionalActions.map((action, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="bg-gray-100 p-2 rounded-lg text-gray-600 mr-4">{action.icon}</div>
                <p className="font-medium text-gray-700">{action.title}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

// InfoCard component with TypeScript props
interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "blue" | "purple" | "amber" | "green";
}

const InfoCard = ({ icon, label, value, color }: InfoCardProps) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    amber: "bg-amber-100 text-amber-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
      <div className={`p-2 rounded-lg ${colorClasses[color]} mr-3`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

// Section component with TypeScript props
interface SectionProps {
  title: string;
  children: React.ReactNode;
  delay: number;
}

const Section = ({ title, children, delay }: SectionProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.4, delay }} 
    className="mt-8"
  >
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </motion.div>
);

export default Profile;