import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';
import PostCard from '../../components/post/PostCard';
import usePostStore from '../../store/postStore';
import { useNavigation } from '@react-navigation/native';
import { useControlStore } from '../../store/useControlStore';

const PostScreen = ({ navigation }) => {
  const { posts, getPosts } = usePostStore((state) => state);

  const [refreshing, setRefreshing] = React.useState(false);
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 px-2 bg-white"
      onScrollToTop={() => {
        console.log('scrolled to top');
      }}
      refreshControl={
        <RefreshControl
          title="Pull to refresh"
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getPosts();
            setRefreshing(false);
          }}
        />
      }
      onScroll={(e) => {
        console.log(e.nativeEvent.contentOffset.y);
        if (e.nativeEvent.contentOffset.y > 100) {
          setHomePostsScrolled(true);
        } else {
          setHomePostsScrolled(false);
        }
      }}
    >
      {posts.length > 0 &&
        posts.map((post) => <PostCard key={post.id} post={post} />)}
    </ScrollView>
  );
};

export default PostScreen;
