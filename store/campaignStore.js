import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../constants/data';

const useCampaignStore = create((set, get) => ({
  campaigns: [],
  campaign: null,
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
