import {
  View,
  Text,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons';
import PostCard from '../components/post/PostCard';
const Home = () => {
  return (
    <View className="px-4">
      <StatusBar barStyle="light-content" />
      <View className="flex-row justify-between mt-8">
        <View>
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold">Hello,</Text>
            <Text className="text-2xl font-bold ml-1">John</Text>
          </View>
        </View>
        <MaterialCommunityIcons name="bell-outline" size={30} />
      </View>
      <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
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
        <ScrollView
          className="mb-8 mt-2"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row items-center  bg-slate-200 px-4 py-2 rounded-lg  mr-4">
            <MaterialCommunityIcons name="post-outline" size={24} />
            <Text className="ml-2">Posts</Text>
          </View>
          <View className="flex-row items-center  px-4 py-2 rounded-lg  mr-4">
            <MaterialIcons name="campaign" size={24} />
            <Text className="ml-2">Campaigns</Text>
          </View>
          <View className="flex-row items-center  px-4 py-2 rounded-lg  mr-4">
            <MaterialIcons name="attach-money" size={24} />
            <Text className="ml-2">Funding</Text>
          </View>
          <View className="flex-row items-center  px-4 py-2 rounded-lg  mr-4">
            <Entypo name="awareness-ribbon" size={24} />
            <Text className="ml-2">Awareness</Text>
          </View>
        </ScrollView>

        <PostCard />
        <PostCard />
        <View className="h-[200px]"></View>
      </ScrollView>
    </View>
  );
};

export default Home;
