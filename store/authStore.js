import { create } from 'zustand';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../constants/data';
import Toast from 'react-native-toast-message';

const useAuthStore = create((set) => ({
  auth: null,

  loginUser: async (d) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/login/user`,
        data: d,
      });

      if (data.success) {
        set((state) => ({ auth: data }));
        await AsyncStorage.setItem('auth', JSON.stringify(data));

        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'You have successfully logged in',
        });
      }
    } catch (error) {
      set((state) => ({ auth: null }));
      await AsyncStorage.removeItem('auth');

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your credentials',
      });
    }
  },
  logout: async () => {
    set((state) => ({ auth: null }));
    await AsyncStorage.removeItem('auth');

    Toast.show({
      type: 'success',
      text1: 'Logout Successful',
      text2: 'You have successfully logged out',
    });
  },
}));

export default useAuthStore;
