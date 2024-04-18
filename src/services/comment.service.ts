import { axiosInstance } from "../helpers/api";
import Comment from "../types/CommentType";

export const commentService = {
  async getComment(id: string) {
    const response = await axiosInstance(`/comments/${id}`);
    return response.data;
  },

  async addComment(comment: Comment) {
    const response = await axiosInstance(`/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      data: {
        postId: comment.postId,
        name: comment.name,
        email: comment.email,
        body: comment.body,
      },
    });
    return response.data;
  },

  async editComment(comment: Comment) {
    const response = await axiosInstance(`/comments/${comment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      data: {
        body: comment.body,
      },
    });
    return response.data;
  },

  async deleteComment(commentId: number) {
    const response = await axiosInstance(`/comments/${commentId}`, {
      method: "DELETE",
    });
    return response.data;
  },
};
