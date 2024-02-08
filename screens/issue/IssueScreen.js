import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import usePostStore from '../../store/postStore';
import PostCard from '../../components/post/PostCard';

const IssueScreen = () => {
  const { posts, getPosts } = usePostStore((state) => state);

  const [selected, setSelected] = React.useState('Nearby');

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View className="px-4">
      <StatusBar backgroundColor={COLORS.primary} />

      <View className="flex-row justify-between mt-8">
        <View>
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/transparent_logo.png')}
              className="h-8 w-[150px]"
            />
          </View>
        </View>
        <MaterialCommunityIcons name="bell-outline" size={30} />
      </View>
      <ScrollView
        className="mb-8 mt-8"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          className="flex-row items-center  px-4 py-2 rounded-lg  mr-4"
          onPress={() => setSelected('Nearby')}
          style={{
            backgroundColor:
              selected === 'Nearby' ? COLORS.grey : 'transparent',
          }}
        >
          <MaterialCommunityIcons name="near-me" size={24} />
          <Text className="ml-2">Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center  px-4 py-2 rounded-lg  mr-4"
          onPress={() => setSelected('Recent')}
          style={{
            backgroundColor:
              selected === 'Recent' ? COLORS.grey : 'transparent',
          }}
        >
          <MaterialCommunityIcons name="post-outline" size={24} />
          <Text className="ml-2">Recent Posted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center  px-4 py-2 rounded-lg  mr-4"
          onPress={() => setSelected('Alarming')}
          style={{
            backgroundColor:
              selected === 'Alarming' ? COLORS.grey : 'transparent',
          }}
        >
          <MaterialIcons name="campaign" size={24} />
          <Text className="ml-2">Alarming </Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.reverse().map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </View>
  );
};

export default IssueScreen;
