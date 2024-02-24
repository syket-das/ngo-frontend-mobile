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
    body.startDate = convertToStringDate(body.startDate);
    body.endDate = convertToStringDate(body.endDate);

    try {
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/campaign/create/user`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: body,
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
      const { data } = await axios({
        method: 'POST',
        url: `${URL}/api/v1/campaign/create/ngo`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
        data: body,
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
}));
