import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import IssueCommentVote from './IssueCommentVote';

const IssueCommentElement = ({ comment }) => {
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
            ? comment.ngo.name
            : ''}
        </Text>

        <Text className="text-xs text-gray-500">
          {new Date(comment.createdAt).toDateString()}
        </Text>

        <Ionicons name="chevron-down-outline" size={18} />
      </View>
      <IssueCommentVote comment={comment} />
      <View>
        <TouchableOpacity className="flex-row justify-between  items-center gap-2 mt-2">
          <Text className="text-xs text-gray-500">Reply </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row   items-center gap-2 mt-0">
          <View className="-rotate-90">
            <Ionicons name="pin-outline" size={18} color={'#cccccc'} />
          </View>
          <Text className="text-xs text-gray-500">View 8 replies </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IssueCommentElement;
