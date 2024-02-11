import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CommentElement from './CommentElement';

const CommentContainer = () => {
  return (
    <View className="relative">
      <View className=" items-center mt-2 mx-4">
        <View className="flex-row items-center gap-2">
          <Image
            className="w-8 h-8 rounded-full"
            source={require('../../assets/images/cover.jpg')}
          />
          <TextInput
            className="flex-1 max-h-[200px] py-1  px-2  border border-gray-300"
            placeholder="Write a comment..."
            multiline
          />

          <Ionicons name="send" size={18} />
        </View>
      </View>

      <ScrollView className="mt-8 ">
        <CommentElement />
        <CommentElement />
        <CommentElement />
        <CommentElement />
        <CommentElement />
        <CommentElement />
        <CommentElement />

        <View className="h-[100px]"></View>
      </ScrollView>
    </View>
  );
};

export default CommentContainer;
