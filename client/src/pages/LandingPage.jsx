import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section */}
      <header className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 opacity-50"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to BlogApp
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Your ultimate destination for engaging and insightful content. Discover, read, and share the best blogs on the web.
          </motion.p>
          <motion.a 
            href="/BlogCard"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors inline-flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Explore Now
            <FaArrowRight className="ml-2" />
          </motion.a>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Why Choose BlogApp?
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-12">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg max-w-sm transition-transform transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Engaging Content</h3>
              <p className="text-gray-700 mb-4">Stay updated with the latest trends and insights through our curated articles and posts.</p>
              <img src="https://via.placeholder.com/150" alt="Engaging Content" className="w-full h-40 object-cover rounded-lg" />
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg max-w-sm transition-transform transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Easy Navigation</h3>
              <p className="text-gray-700 mb-4">Navigate through our clean and intuitive interface with ease, finding your favorite posts in no time.</p>
              <img src="https://via.placeholder.com/150" alt="Easy Navigation" className="w-full h-40 object-cover rounded-lg" />
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg max-w-sm transition-transform transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Community Engagement</h3>
              <p className="text-gray-700 mb-4">Join a vibrant community of readers and writers, sharing thoughts and feedback on various topics.</p>
              <img src="https://via.placeholder.com/150" alt="Community Engagement" className="w-full h-40 object-cover rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            What Our Users Say
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-12">
            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm transition-transform transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg mb-4">"BlogApp is my go-to place for the latest and greatest blogs. The content is always fresh and engaging!"</p>
              <span className="font-semibold">Alex Johnson</span>
            </motion.div>
            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm transition-transform transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg mb-4">"I love how easy it is to find articles on BlogApp. The user interface is smooth and intuitive."</p>
              <span className="font-semibold">Emma Smith</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
        <a href="/contact" className="text-blue-500 hover:underline">Contact Us</a>
      </footer>
    </div>
  );
};

export default LandingPage;
