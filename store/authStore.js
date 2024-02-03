import { create } from 'zustand';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../constants/data';
import Toast from 'react-native-toast-message';

const useAuthStore = create((set) => ({
  auth: null,
  authLoading: false,
  setAuthLoading: (d) => set((state) => ({ authLoading: d })),

  registration: {},

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
        set((state) => ({ auth: data }));
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'You have successfully registered',
        });
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2:
          error.response.data.message || error.message || 'Please try again',
      });
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
        Toast.show({
          type: 'success',
          text1: 'Email Verification Successful',
          text2: 'You have successfully verified your email',
        });
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      Toast.show({
        type: 'error',
        text1: 'Email Verification Failed',
        text2:
          error.response.data.message || error.message || 'Please try again',
      });
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
        Toast.show({
          type: 'success',
          text1: 'OTP Resend Successful',
          text2: 'You have successfully resent the OTP',
        });
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      Toast.show({
        type: 'error',
        text1: 'OTP Resend Failed',
        text2:
          error.response.data.message || error.message || 'Please try again',
      });
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
        Toast.show({
          type: 'success',
          text1: 'Password Set Successful',
          text2: 'You have successfully set your password',
        });
      }
    } catch (error) {
      set((state) => ({ authLoading: false }));

      Toast.show({
        type: 'error',
        text1: 'Password Set Failed',
        text2:
          error.response.data.message || error.message || 'Please try again',
      });
    }
  },
}));

export default useAuthStore;
