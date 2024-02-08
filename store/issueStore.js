import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants/data';

const useIssueStore = create((set, get) => ({
  issues: [],
  issue: null,
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

  getPost: async (issueId) => {
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
      console.log(JSON.stringify(error));
    }
  },

  voteOnPostByUser: async (issueId, voteType) => {
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
        url: `${URL}/api/v1/issue/comment/create/user`,
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

export default useIssueStore;
