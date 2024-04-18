import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Post from "../../types/PostType";
import Comment from "../../types/CommentType";
import { postService } from "../../services/post.service";
import { commentService } from "../../services/comment.service";

const PostDetailPage = () => {
  const { id: postId } = useParams();

  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPostsAndComments();
  }, []);

  const getPostsAndComments = async () => {
    try {
      setIsLoading(true);
      const resPosts = await postService.getPost(postId!);
      const resComments = await postService.getPostComments(postId!);

      if (resPosts && resComments) {
        setPost(resPosts);
        setComments(resComments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      const res = await commentService.deleteComment(commentId);

      if (res) {
        const newComments = comments.filter((item) => item.id !== commentId);
        setComments(newComments);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  if (isLoading) return "Loading...";

  return (
    <div>
      <h1 className="font-semibold text-xl">{post?.title}</h1>
      <p className="text-lg font-light">{post?.body}</p>
      <div className="mt-4" />
      <div className="flex flex-row justify-between">
        <p>Comments</p>
        <Link to={`/posts/${postId}/comments/create`} className="bg-blue-500 text-white py-2 px-4 rounded-md">Add</Link>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="border-b-2 py-2">
          <p>{comment.name}</p>
          <p className="text-gray-500 text-sm">{comment.body}</p>
          <div className="flex flex-row gap-2 items-center">
            <Link
              to={`/comments/${comment.id}/edit`}
              className="text-sm text-blue-500"
            >
              Edit
            </Link>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => {
                deleteComment(comment.id!);
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

export default PostDetailPage;
