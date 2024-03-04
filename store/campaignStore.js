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

export const useCampaignStore = create((set, get) => ({
  campaigns: [],
  campaign: null,

  createCampaignByUser: async (body) => {
    body.startDate = dateToIsoString(body.startDate);
    body.endDate = dateToIsoString(body.endDate);

    try {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('motto', body.motto);
      formData.append('fundsRequired', JSON.stringify(body.fundsRequired));
      formData.append('description', body.description);
      formData.append('virtual', JSON.stringify(body.virtual));
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
        url: `${URL}/api/v1/campaign/create/user`,
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
  createCampaignByNgo: async (body) => {
    body.startDate = dateToIsoString(body.startDate);
    body.endDate = dateToIsoString(body.endDate);

    try {
      const formData = new FormData();
      formData.append('title', body.title);
      formData.append('motto', body.motto);
      formData.append('fundsRequired', JSON.stringify(body.fundsRequired));
      formData.append('description', body.description);
      formData.append('virtual', JSON.stringify(body.virtual));
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
        url: `${URL}/api/v1/campaign/create/ngo`,
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

  getCampaigns: async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/campaign/all`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      set((state) => ({
        campaigns: data.data,
      }));
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },

  getCampaign: async (campaignId) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/campaign/${campaignId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      set((state) => ({
        campaign: data.data,
      }));
      return data.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  joinOrLeaveCampaignByUser: async (campaignId) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/campaign/member/mutate/user/${campaignId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {},
      });

      return data.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  joinOrLeaveCampaignByNgo: async (campaignId) => {
    try {
      const { data } = await axios({
        method: 'PATCH',
        url: `${URL}/api/v1/campaign/member/mutate/ngo/${campaignId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {},
      });

      return data.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  // broadcast campaign

  broadcastCampaign: async (campaignId, message) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/campaign/broadcast`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          message,
          campaignId,
        },
      });

      return data.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  },

  deleteBroadcast: async (broadcastId) => {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: `${URL}/api/v1/campaign/broadcast/${broadcastId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      return data.data;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
    }
  },

  createPaymentIntentForDonation: async (amount, campaignId) => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/payment/create-payment-intent/campaign`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: {
          amount,
          campaignId,
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
