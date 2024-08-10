import React from 'react';

// BlogCard Component
function BlogCard({ post }) {
  if (!post) {
    return null; // Return null if post is undefined
  }

  const {
    href = '#',
    imageUrl = 'https://via.placeholder.com/600x400?text=Image+Not+Found',
    title = 'Untitled',
    description = 'No description available.',
    datetime = 'Unknown',
    date = 'Unknown',
    category = { title: 'Uncategorized', href: '#' },
    author = { name: 'Unknown', role: 'Unknown', href: '#', blogImg: 'https://via.placeholder.com/40?text=No+Image' },
  } = post;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <a href={href}>
        <img
          className="rounded-t-lg w-full h-64 object-cover"
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
          }}
        />
      </a>
      <div className="p-5">
        <div className="flex items-center gap-x-4 text-xs mb-4">
          <time dateTime={datetime} className="text-gray-500">
            {date}
          </time>
          <a
            href={category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {category.title}
          </a>
        </div>
        <a href={href}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-600">
          {description}
        </p>
        <div className="relative mt-6 flex items-center gap-x-4">
          <img
            alt={author.name}
            src={author.blogImg}
            className="h-10 w-10 rounded-full bg-gray-50"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40?text=No+Image';
            }}
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <a href={author.href}>
                {author.name}
              </a>
            </p>
            <p className="text-gray-600">{author.role}</p>
          </div>
        </div>
        <a
          href={href}
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
        </a>
      </div>
    </div>
  );
}

// Example Component
export default function Example() {
  const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        blogImg:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      imageUrl: 'https://flowbite.com/docs/images/blog/image-1.jpg',
    },
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        blogImg:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      imageUrl: 'https://flowbite.com/docs/images/blog/image-1.jpg',
    },
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        blogImg:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      imageUrl: 'https://flowbite.com/docs/images/blog/image-1.jpg',
    },
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        blogImg:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      imageUrl: 'https://flowbite.com/docs/images/blog/image-1.jpg',
    },
    // Add more posts here...
  ];

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
