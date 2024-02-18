import { View, Text, StatusBar, ScrollView, Image } from 'react-native';
import React, { useEffect } from 'react';

import { COLORS } from '../constants';
import ScreenWrapper from '../components/common/layout/ScreenWrapper';
import Header from '../components/common/layout/Header';
import HomeTopTabs from '../navigations/HomeTopTabs';
import { useControlStore } from '../store/useControlStore';
const Home = () => {
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  useEffect(() => {
    setHomePostsScrolled(false);
  }, []);

  return (
    <ScreenWrapper>
      <StatusBar backgroundColor={COLORS.primary} />
      <Header />

      <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
        <ScrollView
          className="mb-4 mt-2 gap-4"
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            display: !homePostsScrolled ? 'flex' : 'none',
          }}
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

        <HomeTopTabs />

        {/* <View className="h-[200px] bg-slate-400"></View> */}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;
