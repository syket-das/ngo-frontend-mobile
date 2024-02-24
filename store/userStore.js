import { create } from 'zustand';
import axios from 'axios';
import { URL } from '../constants/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserStore = create((set, get) => ({
  profile: null,
  getProfile: async () => {
    const auth = JSON.parse(await AsyncStorage.getItem('auth'));
    let authType;

    if (!auth) {
      throw new Error('Please login');
    }

    if (auth?.userId) {
      authType = 'user';
    } else if (auth?.ngoId) {
      authType = 'ngo';
    }

    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/${authType}/profile`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      set((state) => ({ profile: data }));
    } catch (error) {
      console.log(error.response.data);
      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },

  updateProfile: async (data) => {
    const auth = JSON.parse(await AsyncStorage.getItem('auth'));
    let authType;

    if (!auth) {
      throw new Error('Please login');
    }

    if (auth?.userId) {
      authType = 'user';
    } else if (auth?.ngoId) {
      authType = 'ngo';
    }

    try {
      const response = await axios({
        method: 'PUT',
        url: `${URL}/api/v1/${authType}/profile/update`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data,
      });

      set((state) => ({ profile: response.data }));
    } catch (error) {
      console.log(error.response.data);
      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },
}));

export default useUserStore;
