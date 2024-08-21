import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import RichTextEditor from '../components/RichTextEditor';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch the existing post data
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/story/getStoryById/${id}`);
        const data = await response.json();
        setTitle(data.title);
        setContent(data.description);
        setImage(data.image);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', fileInputRef.current.files[0]);

    try {
      const response = await fetch(`http://localhost:3000/api/story/updateStory/${id}`, {
        method: 'PUT',
        credentials: 'include',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData,
      });

      if (response.ok) {
        // Redirect or update UI after successful update
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <div className="relative mb-6">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="h-64 w-full bg-gray-200 flex items-center justify-center rounded-lg border border-gray-300">
          {image ? (
            <img src={image} alt="Cover" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-gray-500">Upload cover photo</span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-2">Content</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;
