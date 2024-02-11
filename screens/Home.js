import {
  View,
  Text,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useEffect } from 'react';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons';
import PostCard from '../components/post/PostCard';
import usePostStore from '../store/postStore';
import { COLORS } from '../constants';
import ScreenWrapper from '../components/common/layout/ScreenWrapper';
import Header from '../components/common/layout/Header';
const Home = () => {
  const { posts, getPosts } = usePostStore((state) => state);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ScreenWrapper>
      <StatusBar backgroundColor={COLORS.primary} />
      <Header />

      <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
        <RefreshControl
          title="Pull to refresh"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
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

        {posts.length > 0 &&
          posts.map((post) => <PostCard key={post.id} post={post} />)}
        <View className="h-[200px]"></View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;
