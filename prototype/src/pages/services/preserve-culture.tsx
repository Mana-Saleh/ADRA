// src/pages/services/restore-artifacts.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUpload,
  FiCamera,
  FiTool,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiChevronRight,
  FiStar,
  FiUser,
  FiMapPin,
  FiFile,
  FiImage,
  FiFilm,
  FiHelpCircle
} from "react-icons/fi";

const RestoreArtifacts = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [restorationType, setRestorationType] = useState("basic");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  // Mock restoration packages
  const packages = [
    {
      id: "basic",
      name: "Basic Restoration",
      price: 45.00,
      delivery: "5-7 business days",
      features: [
        "Digital cleaning",
        "Color correction",
        "Minor damage repair",
        "Standard resolution output"
      ],
      popular: false
    },
    {
      id: "premium",
      name: "Premium Restoration",
      price: 89.00,
      delivery: "3-5 business days",
      features: [
        "All Basic features",
        "Advanced damage repair",
        "Texture enhancement",
        "High resolution output",
        "Before/After comparison"
      ],
      popular: true
    },
    {
      id: "expert",
      name: "Expert Restoration",
      price: 149.00,
      delivery: "2-3 business days",
      features: [
        "All Premium features",
        "Complex damage reconstruction",
        "3D modeling (if needed)",
        "Ultra-high resolution output",
        "Expert consultation",
        "Certificate of authenticity"
      ],
      popular: false
    }
  ];

  // Mock order history
  const orderHistory = [
    {
      id: "ORD-789456",
      date: "Jun 10, 2023",
      status: "completed",
      item: "Ancient Manuscript",
      package: "Premium",
      price: 89.00
    },
    {
      id: "ORD-123789",
      date: "May 22, 2023",
      status: "processing",
      item: "Traditional Painting",
      package: "Basic",
      price: 45.00
    },
    {
      id: "ORD-456123",
      date: "Apr 15, 2023",
      status: "completed",
      item: "Historical Photograph",
      package: "Expert",
      price: 149.00
    }
  ];

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  // Remove uploaded file
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log({
      files: uploadedFiles,
      type: restorationType,
      description,
      contact: contactInfo
    });
    setSubmitted(true);
  };

  // Reset form
  const resetForm = () => {
    setUploadedFiles([]);
    setRestorationType("basic");
    setDescription("");
    setContactInfo({ name: "", email: "", phone: "" });
    setSubmitted(false);
  };

  return (
    <div className="w-full pb-20 bg-gray-50">
      {/* Header */}
      <div className="px-4 py-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mr-4">
              <FiTool className="text-violet-600 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Restore Artifacts</h1>
              <p className="text-gray-600 text-sm">Digitally restore cultural treasures</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            Preserve your historical items with our expert digital restoration service. 
            Upload images of damaged artifacts and our specialists will bring them back to life.
          </p>
          
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium ${
                activeTab === "upload"
                  ? "bg-white text-violet-600 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              New Restoration
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium ${
                activeTab === "history"
                  ? "bg-white text-violet-600 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              Order History
            </button>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      {activeTab === "upload" && (
        <div className="px-4">
          {!submitted ? (
            <>
              {/* File Upload */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3">Upload Artifact Images</h2>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-white cursor-pointer hover:border-violet-400 transition-colors"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <FiUpload className="text-gray-400 text-3xl mx-auto mb-3" />
                  <p className="text-gray-600 mb-1">
                    <span className="text-violet-600 font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-gray-500 text-sm">
                    JPG, PNG, or PDF (max 10MB each)
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                  />
                </div>
                
                {/* Uploaded Files Preview */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Uploaded Files:</h3>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center mr-3">
                              {file.type.includes('image') ? (
                                <FiImage className="text-violet-600" />
                              ) : (
                                <FiFile className="text-violet-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sm truncate max-w-[150px]">{file.name}</p>
                              <p className="text-gray-500 text-xs">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <FiXCircle />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Restoration Package Selection */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3">Choose Restoration Package</h2>
                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <div 
                      key={pkg.id}
                      onClick={() => setRestorationType(pkg.id)}
                      className={`border rounded-2xl p-4 cursor-pointer transition-all ${
                        restorationType === pkg.id
                          ? "border-violet-500 bg-violet-50 shadow-sm"
                          : "border-gray-200 hover:border-violet-300"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-bold">{pkg.name}</h3>
                            {pkg.popular && (
                              <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-2">
                            <FiDollarSign className="text-gray-500" />
                            <span className="font-bold text-lg">{pkg.price.toFixed(2)}</span>
                            <span className="text-gray-500 text-sm ml-2">• {pkg.delivery}</span>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          restorationType === pkg.id
                            ? "border-violet-500 bg-violet-500"
                            : "border-gray-300"
                        }`}>
                          {restorationType === pkg.id && (
                            <FiCheckCircle className="text-white text-xs" />
                          )}
                        </div>
                      </div>
                      
                      <ul className="mt-3 space-y-1">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3">Additional Information</h2>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Description of Damage/Issue
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the condition of your artifact..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        placeholder="+966 50 123 4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={uploadedFiles.length === 0}
                className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
                  uploadedFiles.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-700"
                }`}
              >
                Submit for Restoration
              </motion.button>
            </>
          ) : (
            /* Submission Success */
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-green-500 text-2xl" />
              </div>
              <h3 className="font-bold text-xl mb-2">Request Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your submission. Our restoration experts will review your 
                request and contact you within 24 hours.
              </p>
              <div className="bg-violet-50 rounded-xl p-4 mb-6 text-left">
                <h4 className="font-bold text-violet-800 mb-2">Order Summary</h4>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">
                    {packages.find(p => p.id === restorationType)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-lg">
                    ${packages.find(p => p.id === restorationType)?.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetForm}
                  className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors"
                >
                  Submit Another
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab("history")}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  View Orders
                </motion.button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Order History Section */}
      {activeTab === "history" && (
        <div className="px-4">
          <h2 className="text-lg font-bold mb-3">Your Restoration Orders</h2>
          
          {orderHistory.length > 0 ? (
            <div className="space-y-4">
              {orderHistory.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold">Order #{order.id}</h3>
                      <p className="text-gray-600 text-sm">{order.date}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {order.status === "completed" ? "Completed" : "Processing"}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="font-medium">{order.item}</p>
                      <p className="text-gray-600 text-sm">{order.package} Package</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${order.price.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button className="text-violet-600 text-sm font-medium flex items-center">
                      View Details <FiChevronRight className="ml-1" />
                    </button>
                    {order.status === "completed" && (
                      <button className="text-sm text-violet-600 font-medium">
                        Reorder
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTool className="text-gray-400 text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-1">No Orders Yet</h3>
              <p className="text-gray-600 mb-4">
                Your restoration orders will appear here
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("upload")}
                className="bg-violet-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-violet-700 transition-colors"
              >
                Start Restoration
              </motion.button>
            </div>
          )}
          
          {/* FAQ Section */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Frequently Asked Questions</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              {[
                {
                  question: "How long does the restoration process take?",
                  answer: "Basic restorations take 5-7 business days, Premium 3-5 days, and Expert 2-3 days."
                },
                {
                  question: "What file formats do you accept?",
                  answer: "We accept JPG, PNG, and PDF files up to 10MB each."
                },
                {
                  question: "Can you restore 3D objects?",
                  answer: "Yes, our Expert package includes 3D modeling and restoration services."
                }
              ].map((faq, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-start">
                    <FiHelpCircle className="text-violet-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">{faq.question}</h3>
                      <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestoreArtifacts;