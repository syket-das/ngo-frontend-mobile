import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import useBottomSheetStore from '../../store/bottomSheetStore';

import PostVote from './PostVote';
import PostCommentContainer from './PostCommentContainer';

const PostCard = ({ post }) => {
  const postBy = post.ownUserId ? 'USER' : post.ownNgoId ? 'NGO' : '';
  const { setBottomSheet, setBottomSheetContent } = useBottomSheetStore(
    (state) => state
  );
  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <Image
            className="w-8 h-8 rounded-full"
            source={{
              uri: 'https://picsum.photos/200/300',
            }}
          />
          <Text className="font-bold">
            {postBy === 'USER' ? post.ownUser.fullName : post.ownNgo.fullName}
          </Text>
          <Text className="text-xs text-gray-500">
            {new Date(post.createdAt).toDateString()}
          </Text>
        </View>
        <Ionicons name="chevron-down-outline" size={18} />
      </View>
      <View className="flex-row items-center mt-1">
        {/* <Ionicons name="location-outline" size={18} /> */}
        <Text className="text-xs text-gray-500 ml-1">
          {post.address?.city} {post.address?.state} {post.address?.country}
        </Text>
      </View>
      <Image
        className="w-full h-64 rounded-xl mt-2"
        source={{
          uri: post?.media[0]?.url || 'https://picsum.photos/200/300?blur=8',
        }}
      />

      <View className="flex-row items-center justify-between mt-2">
        <PostVote post={post} />
        <TouchableOpacity
          className="flex-row items-center gap-2"
          onPress={() => {
            setBottomSheet(true);
            setBottomSheetContent(<PostCommentContainer post={post} />);
          }}
        >
          <Text className="text-xs">{post.commentsCount}</Text>
          <Ionicons name="chatbubble-outline" size={18} />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-start gap-2 items-center mt-2">
        <Text className="font-semibold text-xs text-gray-500 ">#FreeLife</Text>
        <Text className="font-semibold text-xs text-gray-500 ">
          #SocialAwareness
        </Text>
        <Text className="font-semibold text-xs text-gray-500 ">#Trend</Text>
      </View>

      <Text className="mt-2 font-semibold">{post.title}</Text>

      <Text className="mt-2 font-thin">{post.description}</Text>
    </View>
  );
};

export default PostCard;
