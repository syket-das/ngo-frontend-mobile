import { create } from 'zustand';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../constants/data';
import Toast from 'react-native-toast-message';

const useAuthStore = create((set) => ({
  auth: null,
  authType: null,
  setAuthType: async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/auth/check-token`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      if (data.success) {
        set((state) => ({ authType: data }));
      }
    } catch (error) {
      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },
  authLoading: false,
  setAuthLoading: (d) => set((state) => ({ authLoading: d })),

  registration: {
    setp1: false,
    setp2: false,
    setp3: false,
  },

  loginUser: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/login/user`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

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
      set((state) => ({ authLoading: false }));
      set((state) => ({ auth: null }));
      await AsyncStorage.removeItem('auth');

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your credentials',
      });
    }
  },
  loginNgo: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/login/ngo`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

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
      set((state) => ({ authLoading: false }));
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

  registerUser: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/register/user`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

      if (data.success) {
        set((state) => ({
          registration: {
            ...state.registration,
            setp1: true,
          },
        }));
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },
  verifyUserEmail: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/verify/user`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

      if (data.success) {
        set((state) => ({
          registration: {
            ...state.registration,
            setp2: true,
          },
        }));
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },
  resendUserOTP: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/resend-otp/user`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

      if (data.success) {
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },
  setUserPassword: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/set-password/user`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

      if (data.success) {
        set((state) => ({
          registration: {
            setp1: false,
            setp2: false,
            setp3: true,
          },
        }));

        Toast.show({
          type: 'success',
          text1: 'Password Set Successful',
          text2: 'You have successfully set your password',
        });
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },

  // NGO

  registerNgo: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/register/ngo`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

      if (data.success) {
        set((state) => ({
          registration: {
            ...state.registration,
            setp1: true,
          },
        }));
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },

  verifyNgoEmail: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/verify/ngo`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

      if (data.success) {
        set((state) => ({
          registration: {
            ...state.registration,
            setp2: true,
          },
        }));
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },

  resendNgoOTP: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/resend-otp/ngo`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

      if (data.success) {
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },

  setNgoPassword: async (d) => {
    try {
      set((state) => ({ authLoading: true }));

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/auth/set-password/ngo`,
        data: d,
      });

      set((state) => ({ authLoading: false }));

      if (data.success) {
        set((state) => ({
          registration: {
            setp1: false,
            setp2: false,
            setp3: true,
          },
        }));

        Toast.show({
          type: 'success',
          text1: 'Password Set Successful',
          text2: 'You have successfully set your password',
        });
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      throw new Error(
        error.response.data.message || error.message || 'Please try again'
      );
    }
  },
}));

export default useAuthStore;
