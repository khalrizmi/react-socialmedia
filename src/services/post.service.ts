import { axiosInstance } from "../helpers/api";
import Post from "../types/PostType";

export const postService = {
  async getPost(id: string) {
    const response = await axiosInstance(`/posts/${id}`);
    return response.data;
  },

  async getPostComments(id: string) {
    const response = await axiosInstance(`/posts/${id}/comments`);
    return response.data;
  },

  async addPost(post: Post) {
    const response = await axiosInstance(`/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      data: {
        title: post.title,
        body: post.body,
        userId: post.userId,
      },
    });
    return response.data;
  },

  async editPost(post: Post) {
    const response = await axiosInstance(`/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      data: {
        title: post.title,
        body: post.body,
      },
    });
    return response.data;
  },

  async deletePost(postId: number) {
    const response = await axiosInstance(`/posts/${postId}`, {
      method: "DELETE",
    });
    return response.data;
  },
};
