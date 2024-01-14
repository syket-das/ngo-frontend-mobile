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

  voteOnPostCommentByUser: async (commentId, voteType) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/post/comment/vote/mutate/user`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          commentId,
          voteType,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },

  commentOnPostByUser: async (postId, comment) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/post/comment/create/user`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          postId,
          comment,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },
}));

export default usePostStore;
