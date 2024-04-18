import { axiosInstance } from "../helpers/api";

export const photoService = {
  async getPhoto(photoID: string) {
    const response = await axiosInstance(`/photos/${photoID}`);
    return response.data;
  },
};
