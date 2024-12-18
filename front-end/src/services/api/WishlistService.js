import { api } from '../index';


class WishlistService {
  getWishlist = async (userId) => {
    try {
      const response = await api.get(`/wishlist/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };

  addToWishlist = async (userId, productId, color) => {
    try {
      const { data } = await api.post('/wishlist/add-to-wishlist', {
        userId,
        productId,
        color
      });
      return data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  }
  deleteWishlistItem = async (userId, productId, color) => {
    try {
      const response = await api.delete(`/wishlist/remove`, {
        data: {
          userId,
          productId,
          color
        }
      })
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  }
}


export default new WishlistService();