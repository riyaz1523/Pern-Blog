import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard'; // Ensure correct import path

export default function Example() {
  const [posts, setPosts] = useState([]);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/story/getAllStories`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-white py-4 sm:py-3">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 border-t border-gray-200 pt-10 sm:mt-1 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
