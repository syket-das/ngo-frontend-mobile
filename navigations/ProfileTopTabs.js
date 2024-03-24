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
import ProfilePostScreen from '../screens/post/ProfilePostScreen';
import ProfileCampaignScreen from '../screens/campaign/ProfileCampaignScreen';
import ProfileIssueScreen from '../screens/issue/ProfileIssueScreen';
import ProfileScreenFundRaisings from '../screens/Fundraising/ProfileScreenFundRaisings';
const ProfileTopTabs = ({ role }) => {
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
        fontSize: 12,
        height: height - 200,
      }}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, display: 'flex' },
        tabBarStyle: {},
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarShowIcon: true,

        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
          display: 'flex',
        },
        tabBarItemStyle: {
          display: 'flex',
          flexDirection: 'row',
        },

        swipeEnabled: true,
        tabBarBounces: true,
        tabBarIconStyle: {
          width: 24,
          height: 24,
        },
      }}
      tabBarPosition="top"
    >
      <Tab.Screen
        name="ProfilePosts"
        component={ProfilePostScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileCampaigns"
        component={ProfileCampaignScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="campaign" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileIssues"
        component={ProfileIssueScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-to-queue" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileFundRaisings"
        component={ProfileScreenFundRaisings}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ProfileTopTabs;
