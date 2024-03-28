import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants/data';

const useFollowStore = create((set) => ({
  followers: [],
  followings: [],

  mutateFollow: async (followingId, followingRole) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/follow/mutate`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth'))?.token
          }`,
        },
        data: {
          followingId,
          followingRole,
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
      throw new Error(
        error.response.data.message || error?.message || 'Please try again'
      );
    }
  },

  getFollowers: async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/follow/followers`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth'))?.token
          }`,
        },
      });

      set({ followers: data?.followers });
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
      throw new Error(
        error.response.data.message || error?.message || 'Please try again'
      );
    }
  },

  getFollowings: async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/follow/followings`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth'))?.token
          }`,
        },
      });

      set({ followings: data?.followings });
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
      throw new Error(
        error.response.data.message || error?.message || 'Please try again'
      );
    }
  },
}));

export default useFollowStore;
