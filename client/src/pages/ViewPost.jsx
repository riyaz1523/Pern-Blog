import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const ViewPost = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      username: 'JaneDoe',
      userImg: 'https://randomuser.me/api/portraits/women/1.jpg',
      comment: 'Great post! Really insightful and helpful.',
      time: '2 hours ago',
      likes: 15,
    },
    {
      id: 2,
      username: 'JohnSmith',
      userImg: 'https://randomuser.me/api/portraits/men/2.jpg',
      comment: 'I learned a lot from this article. Thanks for sharing!',
      time: '1 day ago',
      likes: 23,
    },
    {
      id: 3,
      username: 'AliceWonder',
      userImg: 'https://randomuser.me/api/portraits/women/3.jpg',
      comment: 'The strategies mentioned are very practical and easy to implement.',
      time: '3 days ago',
      likes: 8,
    },
  ]);

  const post = {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description: ' Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      blogImg: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    imageUrl: 'https://flowbite.com/docs/images/blog/image-1.jpg',
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          username: 'NewUser',
          userImg: 'https://randomuser.me/api/portraits/men/4.jpg',
          comment,
          time: 'Just now',
          likes: 0,
        },
      ]);
      setComment('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      {/* Post Image */}
      <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      
      {/* Post Title */}
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">{post.title}</h1>

      {/* Post Meta Info */}
      <div className="flex justify-center items-center mb-6">
        <img src={post.author.blogImg} alt={post.author.name} className="w-12 h-12 rounded-full mr-3" />
        <div className="text-gray-600">
          <p className="text-gray-900 font-semibold">
            <a href={post.author.href}>{post.author.name}</a>
          </p>
          <p className="text-gray-500 text-sm">{post.date}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{post.description}</p>

      {/* Comments Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Comments</h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="Add a comment..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4 mb-4">
            <img src={comment.userImg} alt={comment.username} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-900">{comment.username}</span>
                <span className="text-gray-500 text-sm">{comment.time}</span>
              </div>
              <p className="text-gray-700 mb-1">{comment.comment}</p>
              <div className="flex items-center space-x-2 text-gray-500">
                <FaHeart className="text-red-500" />
                <span>{comment.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPost;
