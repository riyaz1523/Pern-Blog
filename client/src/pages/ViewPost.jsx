import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { currentUser, access_token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/story/getStoryById/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // Prevent submission of empty comments

    try {
      const response = await fetch(
        "http://localhost:3000/api/comment/createComment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            story_id: id,
            content: comment,
            author_id: currentUser.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newComment = await response.json();
      setComments([...comments, newComment]);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError(error.message);
    }
  };

  const handlePostLike = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/like/likeStory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          story_id: post.id,
          user_id: currentUser.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      // Update post like count based on response
      setPost((prevPost) => ({
        ...prevPost,
        like_count:
          result.message === "Like removed"
            ? prevPost.like_count - 1
            : prevPost.like_count + 1,
      }));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/like/likeComment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            comment_id: commentId,
            user_id: currentUser.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      // Update comment like count based on response
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                like_count:
                  result.message === "Like removed"
                    ? comment.like_count - 1
                    : comment.like_count + 1,
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      {/* Post Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Post Title */}
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
        {post.title}
      </h1>

      {/* Post Meta Info */}
      <div className="flex justify-center items-center mb-6">
        <img
          src={post.author_blogimg}
          alt={post.author_name}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div className="text-gray-600">
          <p className="text-gray-900 font-semibold">
            <a href={`mailto:${post.author_email}`}>{post.author_name}</a>
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        <div className="ml-5 cursor-pointer" onClick={handlePostLike}>
          <FaHeart
            className={`text-red-500 ${post.likedByUser ? "text-red-700" : ""}`}
          />
        </div>
        <div>
          <span className="ml-3">{post.like_count || 0}</span>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        {post.description}
      </p>

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
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-4 mb-4">
              <img
                src={comment.author.profileImg}
                alt={comment.author.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-900">
                    {comment.author.username}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">{comment.content}</p>
                <div className="flex items-center space-x-2 text-gray-500">
                  <FaHeart
                    className={`text-red-500 ${
                      comment.likedByUser ? "text-red-700" : ""
                    }`}
                    onClick={() => handleCommentLike(comment.id)}
                  />
                  <span>{comment.like_count || 0}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
