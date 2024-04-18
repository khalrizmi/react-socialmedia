import { axiosInstance } from "../helpers/api";

export const userService = {
  async getUsers() {
    const response = await axiosInstance(`/users`);
    return response.data;
  },

  async getUserPosts(id: string) {
    const response = await axiosInstance(`/users/${id}/posts`);
    return response.data;
  },

  async getUserAlbums(id: string) {
    const response = await axiosInstance(`/users/${id}/albums`);
    return response.data;
  },
};
