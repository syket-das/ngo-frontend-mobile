import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants/data';

function dateToIsoString(dateStr) {
  // Parse the date string into a Date object
  const dateObj = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  // Convert the Date object to ISO datetime format
  const isoDatetimeStr = dateObj.toISOString();

  return isoDatetimeStr;
}

export const useFundRaisingStore = create((set, get) => ({
  fundRaisings: [],
  fundRaising: null,

  createFundRaisingByUser: async (body) => {
    body.startDate = dateToIsoString(body.startDate);
    body.endDate = dateToIsoString(body.endDate);

    try {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('amount', JSON.stringify(body.amount));
      formData.append('description', body.description);
      formData.append('address', JSON.stringify(body.address));
      formData.append('tags', JSON.stringify(body.tags));
      formData.append('startDate', JSON.stringify(body.startDate));
      formData.append('endDate', JSON.stringify(body.endDate));

      body.media.forEach((media) => {
        formData.append('media', {
          uri: media.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      });

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/fundRaising/create/user`,
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
  createFundRaisingByNgo: async (body) => {
    body.startDate = dateToIsoString(body.startDate);
    body.endDate = dateToIsoString(body.endDate);

    try {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('amount', JSON.stringify(body.amount));
      formData.append('description', body.description);
      formData.append('address', JSON.stringify(body.address));
      formData.append('tags', JSON.stringify(body.tags));
      formData.append('startDate', JSON.stringify(body.startDate));
      formData.append('endDate', JSON.stringify(body.endDate));

      body.media.forEach((media) => {
        formData.append('media', {
          uri: media.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      });

      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/fundRaising/create/ngo`,
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

  getFundRaisings: async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/fundRaising/all`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      set((state) => ({
        fundRaisings: data.data,
      }));
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },

  getFundRaising: async (fundRaisingId) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/fundRaising/${fundRaisingId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      set((state) => ({
        fundRaising: data.data,
      }));
      return data.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  createPaymentIntentForDonation: async (amount, fundRaisingId) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/payment/create-payment-intent/fundRaising`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          amount,
          fundRaisingId,
        },
      });

      return data.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  },
}));
