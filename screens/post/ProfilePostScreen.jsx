import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';
import PostCard from '../../components/post/PostCard';
import usePostStore from '../../store/postStore';
import { useNavigation } from '@react-navigation/native';
import { useControlStore } from '../../store/useControlStore';
import { useSearchStore } from '../../store/searchStore';

const ProfilePostScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  const { searchedUser, setSearchedUser, searchedNgo, setSearchedNgo, role } =
    useSearchStore((state) => state);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 px-2 bg-white"
      onScroll={(e) => {
        if (e.nativeEvent.contentOffset.y > 100) {
          setHomePostsScrolled(true);
        } else {
          setHomePostsScrolled(false);
        }
      }}
    >
      {role === 'USER' &&
        searchedUser?.createdPosts?.length > 0 &&
        searchedUser?.createdPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

      {role === 'NGO' &&
        searchedNgo?.createdPosts?.length > 0 &&
        searchedNgo?.createdPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

      <View
        style={{
          height: 100,
        }}
      ></View>
    </ScrollView>
  );
};

export default ProfilePostScreen;
