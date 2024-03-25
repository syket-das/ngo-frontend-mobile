import { View, Text, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostScreen from '../screens/post/PostScreen';
import CampaignScreen from '../screens/campaign/CampaignScreen';
import FundraisingScreen from '../screens/Fundraising/FundraisingScreen';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons';
import COLORS from '../constants/colors';
import { useControlStore } from '../store/useControlStore';
const HomeTopTabs = () => {
  const Tab = createMaterialTopTabNavigator();

  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  const height = Dimensions.get('window').height;

  return (
    <Tab.Navigator
      style={{
        backgroundColor: COLORS.white,
        color: COLORS.primary,
      }}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: 'none',
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,

        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
          // display: 'none',
        },
        tabBarItemStyle: {
          // display: 'flex',
          // flexDirection: 'row',
        },

        swipeEnabled: true,
        tabBarBounces: true,
        tabBarIconStyle: {
          width: 20,
          height: 20,
        },
      }}
      tabBarPosition="top"
    >
      <Tab.Screen
        name="Posts"
        component={PostScreen}
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Campaigns"
        component={CampaignScreen}
        options={{
          tabBarLabel: 'Campaigns',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="campaign" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Fundraisings"
        component={FundraisingScreen}
        options={{
          tabBarLabel: 'Fundraisings',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTopTabs;
