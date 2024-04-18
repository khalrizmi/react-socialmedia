import { axiosInstance } from "../helpers/api";

export const albumService = {
  async getAlbumPhotos(albumID: string) {
    const response = await axiosInstance(`albums/${albumID}/photos`);
    return response.data;
  },
};
