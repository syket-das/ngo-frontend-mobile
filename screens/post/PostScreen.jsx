import { View, Text, ScrollView, RefreshControl, FlatList } from 'react-native';
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
    <FlatList
      showsVerticalScrollIndicator={false}
      data={posts}
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id}
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
        if (e.nativeEvent.contentOffset.y > 100) {
          setHomePostsScrolled(true);
        } else {
          setHomePostsScrolled(false);
        }
      }}
      ListFooterComponent={() => (
        <View
          style={{
            height: 100,
          }}
        >
          <Text style={{ textAlign: 'center' }}>No more posts</Text>
        </View>
      )}
    />
  );
};

export default PostScreen;
