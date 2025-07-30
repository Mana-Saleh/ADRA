// src/pages/services/shop-local.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiStar,
  FiFilter,
  FiSearch,
  FiHeart,
  FiPlus,
  FiMinus,
  FiShoppingCart, // <-- Corrected: Removed the space
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiChevronRight,
  FiTag,
  FiPackage,
  FiTruck,
  FiAward
} from "react-icons/fi";

const ShopLocal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([2, 5]); // Mock favorite IDs
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [sortBy, setSortBy] = useState("popular");

  // Mock categories
  const categories = [
    "All",
    "Handicrafts",
    "Food & Spices",
    "Clothing",
    "Jewelry",
    "Art & Decor",
    "Books & Media"
  ];

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Traditional Pottery Set",
      description: "Handcrafted ceramic bowls and plates with traditional patterns.",
      price: 45.00,
      originalPrice: 55.00,
      discount: 18,
      rating: 4.8,
      reviews: 124,
      image: "", // Add image path if available
      category: "Handicrafts",
      inStock: true,
      featured: false,
      artisan: "Ahmed Pottery Workshop",
      location: "Old Town District",
      tags: ["ceramic", "handmade", "traditional"]
    },
    {
      id: 2,
      name: "Premium Saffron Bundle",
      description: "High-quality saffron threads sourced from local farms.",
      price: 22.50,
      originalPrice: null,
      discount: null,
      rating: 4.9,
      reviews: 89,
      image: "", // Add image path if available
      category: "Food & Spices",
      inStock: true,
      featured: true,
      artisan: "Al-Madinah Spices",
      location: "Central Market",
      tags: ["spice", "premium", "organic"]
    },
    {
      id: 3,
      name: "Embroidered Headscarf",
      description: "Beautifully embroidered cotton scarf with traditional motifs.",
      price: 32.00,
      originalPrice: 40.00,
      discount: 20,
      rating: 4.6,
      reviews: 56,
      image: "", // Add image path if available
      category: "Clothing",
      inStock: false,
      featured: false,
      artisan: "Fatima Textiles",
      location: "Crafts Street",
      tags: ["cotton", "embroidery", "modest"]
    },
    {
      id: 4,
      name: "Silver Camel Pendant",
      description: "Handcrafted silver pendant featuring a camel design.",
      price: 65.00,
      originalPrice: null,
      discount: null,
      rating: 4.7,
      reviews: 34,
      image: "", // Add image path if available
      category: "Jewelry",
      inStock: true,
      featured: false,
      artisan: "Omar Goldsmith",
      location: "Gold Souq",
      tags: ["silver", "camel", "traditional"]
    },
    {
      id: 5,
      name: "Desert Landscape Painting",
      description: "Original acrylic painting of the desert landscape by local artist.",
      price: 89.00,
      originalPrice: 99.00,
      discount: 10,
      rating: 4.9,
      reviews: 28,
      image: "", // Add image path if available
      category: "Art & Decor",
      inStock: true,
      featured: true,
      artisan: "Layla Fine Arts",
      location: "Art District",
      tags: ["painting", "acrylic", "desert"]
    },
    {
      id: 6,
      name: "Historical Guidebook",
      description: "Comprehensive guide to local history and heritage sites.",
      price: 15.00,
      originalPrice: null,
      discount: null,
      rating: 4.5,
      reviews: 67,
      image: "", // Add image path if available
      category: "Books & Media",
      inStock: true,
      featured: false,
      artisan: "Heritage Publishing",
      location: "Knowledge Quarter",
      tags: ["history", "guide", "local"]
    }
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.artisan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "popular") return b.reviews - a.reviews;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  // Add to cart
  const addToCart = (id: number) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  // Calculate cart total
  const cartTotal = Object.entries(cart).reduce((total, [id, quantity]) => {
    const product = products.find(p => p.id === parseInt(id));
    return total + (product ? product.price * quantity : 0);
  }, 0);

  // Calculate cart item count
  const cartItemCount = Object.values(cart).reduce((total, count) => total + count, 0);

  return (
    <div className="w-full pb-20 bg-gray-50">
      {/* Header */}
      <div className="px-4 py-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
              <FiShoppingBag className="text-amber-600 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Shop Local</h1>
              <p className="text-gray-600 text-sm">Support local artisans and businesses</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="px-4 mb-4">
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100">
          {[
            { id: "popular", label: "Popular" },
            { id: "price-low", label: "Price: Low" },
            { id: "price-high", label: "Price: High" },
            { id: "rating", label: "Top Rated" }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium ${
                sortBy === option.id
                  ? "bg-amber-500 text-white shadow"
                  : "text-gray-600"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products List */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">
            {selectedCategory === "All" ? "Local Products" : selectedCategory}
            <span className="text-gray-500 font-normal text-sm ml-2">
              ({sortedProducts.length})
            </span>
          </h2>
          <button className="text-sm text-amber-600 font-medium flex items-center">
            Filter <FiFilter className="ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Product Image Placeholder */}
              <div className="h-40 bg-gradient-to-r from-amber-400 to-orange-500 relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-white/20 border-2 border-dashed border-white/30 rounded-xl w-16 h-16" />
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                >
                  <FiHeart
                    className={favorites.includes(product.id) ? "text-red-500 fill-current" : "text-gray-700"}
                  />
                </button>

                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {product.discount}% OFF
                  </div>
                )}

                {/* Featured Badge */}
                {product.featured && (
                  <div className="absolute bottom-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <FiAward className="mr-1" /> Featured
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1 line-clamp-2">{product.name}</h3>

                <div className="flex items-center mb-2">
                  <div className="flex items-center bg-amber-50 px-1.5 py-0.5 rounded-full">
                    <FiStar className="text-amber-500 mr-1 text-xs" />
                    <span className="text-amber-700 font-bold text-xs">{product.rating}</span>
                  </div>
                  <span className="text-gray-500 text-xs ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center text-gray-600 text-xs mb-2">
                  <FiMapPin className="mr-1 text-amber-500" />
                  <span className="truncate">{product.location}</span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="flex items-baseline">
                      <span className="font-bold text-amber-600">
                        <FiDollarSign className="inline text-xs" />
                        {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-500 text-xs line-through ml-2">
                          <FiDollarSign className="inline text-[10px]" />
                          {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cart Controls */}
                  {cart[product.id] ? (
                    <div className="flex items-center bg-amber-100 rounded-full">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1.5 text-amber-700"
                      >
                        <FiMinus className="text-sm" />
                      </button>
                      <span className="px-2 text-amber-800 font-medium text-sm">
                        {cart[product.id]}
                      </span>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="p-1.5 text-amber-700"
                      >
                        <FiPlus className="text-sm" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full ${
                        product.inStock
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <FiShoppingCart className="text-sm" /> {/* Corrected icon usage */}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="text-gray-400 text-2xl" />
            </div>
            <h3 className="font-bold text-lg mb-1">No Products Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-amber-600 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Shopping Cart Summary */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-200 z-10">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold">
                {cartItemCount} {cartItemCount === 1 ? "item" : "items"} in cart
              </div>
              <div className="text-amber-600 font-bold flex items-center">
                <FiDollarSign className="text-sm" />
                {cartTotal.toFixed(2)}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-amber-500 text-white px-5 py-3 rounded-full font-bold flex items-center hover:bg-amber-600 transition-colors shadow-md"
            >
              View Cart <FiChevronRight className="ml-1" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Promotional Banner */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
              <FiPackage className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold">Free Shipping on Orders Over $50</h3>
              <p className="text-gray-600 text-sm">Support local businesses with fast delivery</p>
            </div>
          </div>
          <div className="flex items-center text-amber-700 text-sm">
            <FiTruck className="mr-2" />
            <span>Delivery within 2-3 business days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLocal;