import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../../types/PostType";
import { userService } from "../../services/user.service";
import { postService } from "../../services/post.service";

const PostPage = () => {
  const { id: userId } = useParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const res = await userService.getUserPosts(userId!);

      if (res) {
        setPosts(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (postId: number) => {
    try {
      const res = await postService.deletePost(postId);

      if (res) {
        const newPosts = posts.filter((item) => item.id !== postId);
        setPosts(newPosts);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  if (isLoading) return "Loading...";

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-xl">Posts</h1>
        <Link to={`/users/${userId}/posts/create`} className="bg-blue-500 text-white py-2 px-4 rounded-md">Add</Link>
      </div>
      <div className="mt-4" />
      {posts.map((post) => (
        <div key={post.id} className="border-b-2 py-2">
          <Link
            to={`/posts/${post.id}`}
            className="hover:text-blue-500 text-lg"
          >
            {post.title}
          </Link>
          <p className="text-gray-500 text-sm">{post.body}</p>
          <div className="flex flex-row gap-2 items-center">
            <Link
              to={`/posts/${post.id}/edit`}
              className="text-sm text-blue-500"
            >
              Edit
            </Link>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => {
                deletePost(post.id!);
              }}
              className="text-sm text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostPage;
