import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ post }) {
  if (!post) {
    return null; 
  }

  const {
    id,
    title = 'Untitled',
    content = 'No description available.',
    image = 'https://via.placeholder.com/600x400?text=Image+Not+Found',
    created_at = 'Unknown',
    read_time = 0,
    like_count = 0,
    comment_count = 0,
    author_name = 'Unknown Author',
    author_picture = 'https://via.placeholder.com/40?text=No+Image',
  } = post;

  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <Link to={`/story/${id}`}>
        <img
          className="rounded-t-lg w-full h-64 object-cover"
          src={image}
          alt={title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
          }}
        />
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-x-4 text-xs mb-4">
          <time dateTime={created_at} className="text-gray-500">
            {formattedDate}
          </time>
          <span
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {read_time} min read
          </span>
        </div>
        <Link to={`/story/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-600">
          {content.substring(0, 100)}...
        </p>
        <div className="relative mt-6 flex items-center gap-x-4">
          <img
            alt="Author"
            src={author_picture}
            className="h-10 w-10 rounded-full bg-gray-50"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40?text=No+Image'; // Fallback image
            }}
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a href="#">{author_name}</a>
            </p>
            <p className="text-gray-600">{like_count} Likes • {comment_count} Comments</p>
          </div>
        </div>
        <Link
          to={`/story/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-4"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
