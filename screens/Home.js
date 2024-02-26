import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';

import { COLORS } from '../constants';
import ScreenWrapper from '../components/common/layout/ScreenWrapper';
import Header from '../components/common/layout/Header';
import HomeTopTabs from '../navigations/HomeTopTabs';
import { useControlStore } from '../store/useControlStore';
import { Ionicons } from '@expo/vector-icons';
const Home = ({ navigation }) => {
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  useEffect(() => {
    setHomePostsScrolled(false);
  }, []);

  return (
    <ScreenWrapper>
      <StatusBar backgroundColor={COLORS.primary} />
      <View className="flex-row justify-between mt-4">
        <View>
          <View className="flex-row items-center">
            <Image
              source={require('../assets/transparent_logo.png')}
              className="h-8 w-[150px]"
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={26} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: !homePostsScrolled ? 'flex' : 'none',
          transition: 'all 1s ease-in',
        }}
      >
        <ScrollView
          className="mb-4 mt-2 gap-4"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View className="items-center ">
            <Image
              source={require('../assets/images/cover.jpg')}
              className="w-10 h-10 rounded-full"
            />
            <Text className="ml-2">John Doe</Text>
          </View>
          <View className="items-center ">
            <Image
              source={require('../assets/images/cover.jpg')}
              className="w-10 h-10 rounded-full"
            />
            <Text className="ml-2">John Doe</Text>
          </View>
          <View className="items-center ">
            <Image
              source={require('../assets/images/cover.jpg')}
              className="w-10 h-10 rounded-full"
            />
            <Text className="ml-2">John Doe</Text>
          </View>
        </ScrollView>
      </View>

      <HomeTopTabs />
    </ScreenWrapper>
  );
};

export default Home;
