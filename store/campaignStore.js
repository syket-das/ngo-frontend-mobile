import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants/data';

function convertToStringDate(isoDate) {
  // Create a new Date object from the ISO date string
  var date = new Date(isoDate);

  // Extract the components of the date
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  var day = String(date.getDate()).padStart(2, '0');

  // Construct the stringDate in the desired format
  var stringDate = year + '-' + month + '-' + day;

  return stringDate;
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
}));
