import { View, Text, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants';
import Home from '../screens/Home';
import Messages from '../screens/Messages';
import Create from '../screens/Create';
import Settings from '../screens/Settings';
import { Profile } from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from '../screens/profile/user/UserProfile';
import NgoProfile from '../screens/profile/ngo/NgoProfile';
import IssueScreen from '../screens/issue/IssueScreen';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: COLORS.white,
  },
};
const BottomTabNav = () => {
  const [authType, setAuthType] = useState('');

  const getAuthType = async () => {
    const auth = JSON.parse(await AsyncStorage.getItem('auth'));

    if (!auth) {
      throw new Error('Please login');
    }

    if (auth?.userId) {
      setAuthType('user');
    } else if (auth?.ngoId) {
      setAuthType('ngo');
    }
  };

  useEffect(() => {
    getAuthType();
  }, []);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SimpleLineIcons
                name="home"
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Messages"
        component={IssueScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="sync-problem"
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.primary,
                  height: Platform.OS == 'ios' ? 50 : 60,
                  width: Platform.OS == 'ios' ? 50 : 60,
                  top: Platform.OS == 'ios' ? -10 : -20,
                  borderRadius: Platform.OS == 'ios' ? 25 : 30,
                  borderWidth: 2,
                  borderColor: COLORS.white,
                }}
              >
                <Fontisto name="plus-a" size={24} color={COLORS.white} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="settings"
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={
          authType === 'user'
            ? UserProfile
            : authType === 'ngo'
            ? NgoProfile
            : Profile
        }
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="person-outline"
                size={24}
                color={focused ? COLORS.primary : COLORS.black}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
