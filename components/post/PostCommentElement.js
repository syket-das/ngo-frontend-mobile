import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import PostCommentVote from './PostCommentVote';

const PostCommentElement = ({ comment }) => {
  const commentBy = comment.userId ? 'USER' : comment.ngoId ? 'NGO' : '';

  return (
    <View className=" mx-4 mb-4">
      <View className="flex-row items-center gap-2">
        <Image
          className="w-6 h-6 rounded-full"
          source={require('../../assets/images/cover.jpg')}
        />
        <Text className="font-bold">
          {commentBy === 'USER'
            ? comment.user.fullName
            : commentBy === 'NGO'
            ? comment.ngo.fullName
            : ''}
        </Text>

        <Text className="text-xs text-gray-500">
          {new Date(comment.createdAt).toDateString()}
        </Text>

        <Ionicons name="chevron-down-outline" size={18} />
      </View>
      <PostCommentVote comment={comment} />
    </View>
  );
};

export default PostCommentElement;
