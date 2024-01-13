import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants/data';

const usePostStore = create((set, get) => ({
  posts: [],
  post: null,
  getPosts: async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/post/all`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      set((state) => ({
        posts: data.data,
      }));
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },

  getPost: async (postId) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/post/${postId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      set((state) => ({
        post: data.data,
      }));
      return data.data;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },

  voteOnPostByUser: async (postId, voteType) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/post/vote/mutate/user`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          postId,
          voteType,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },
}));

export default usePostStore;
