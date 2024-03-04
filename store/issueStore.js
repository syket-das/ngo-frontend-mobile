import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants/data';

const useIssueStore = create((set, get) => ({
  issues: [],
  issue: null,

  createIssueByUser: async (body) => {
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
        url: `${URL}/api/v1/issue/create/user`,
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

  createIssueByNgo: async (body) => {
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
        url: `${URL}/api/v1/issue/create/ngo`,
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

  getIssues: async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/issue/all`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      set((state) => ({
        issues: data.data,
      }));
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },

  getIssue: async (issueId) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/issue/${issueId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      set((state) => ({
        issue: data.data,
      }));
      return data.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  voteOnIssueByUser: async (issueId, voteType) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/issue/vote/mutate/user`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          issueId,
          voteType,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },
  voteOnIssueByNgo: async (issueId, voteType) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/issue/vote/mutate/ngo`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          issueId,
          voteType,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },

  voteOnIssueCommentByUser: async (commentId, voteType) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/issue/comment/vote/mutate/user`,
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
  voteOnIssueCommentByNgo: async (commentId, voteType) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/issue/comment/vote/mutate/ngo`,
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

  commentOnIssueByUser: async (issueId, comment) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/issue/comment/create/user`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          issueId,
          comment,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },
  commentOnIssueByNgo: async (issueId, comment) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/issue/comment/create/ngo`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          issueId,
          comment,
        },
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },
}));

export default useIssueStore;
