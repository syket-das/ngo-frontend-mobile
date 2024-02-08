import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES, images } from '../constants';
import { StatusBar } from 'expo-status-bar';

const Profile = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.gray} />

      <Text style={{ ...FONTS.h1, textAlign: 'center', marginVertical: 20 }}>
        Profile
      </Text>
    </SafeAreaView>
  );
};

export default Profile;
