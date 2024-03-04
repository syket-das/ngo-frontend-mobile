import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants/data';

const usePostStore = create((set, get) => ({
  posts: [],
  post: null,

  createPostByUser: async (body) => {
    try {
      const formData = new FormData();

      formData.append('title', body.title);
      formData.append('description', body.description);
      formData.append('address', JSON.stringify(body.address));
      formData.append('tags', JSON.stringify(body.tags));

      body.media.forEach((media) => {
        formData.append('media', {
          uri: media.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      });
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/post/create/user`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  },
  createPostByNgo: async (body) => {
    try {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('description', body.description);
      formData.append('address', JSON.stringify(body.address));
      formData.append('tags', JSON.stringify(body.tags));

      body.media.forEach((media) => {
        formData.append('media', {
          uri: media.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      });

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/post/create/ngo`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  },
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

  voteOnPostByNgo: async (postId, voteType) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/post/vote/mutate/ngo`,
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

  voteOnPostCommentByNgo: async (commentId, voteType) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/post/comment/vote/mutate/ngo`,
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
  commentOnPostByNgo: async (postId, comment) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/post/comment/create/ngo`,
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
