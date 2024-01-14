import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PostCommentElement from './PostCommentElement';
import usePostStore from '../../store/postStore';
import Toast from 'react-native-toast-message';
import { URL } from '../../constants/data';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const PostCommentContainer = ({ post }) => {
  const [singlePost, setSinglePost] = React.useState(post);

  const { commentOnPostByUser } = usePostStore((state) => state);
  const [commentInput, setCommentInput] = React.useState('');

  const handleCommentSubmit = () => {
    if (!commentInput) return;

    commentOnPostByUser(post.id, commentInput);
    setCommentInput('');

    getSinglePost();
  };

  const getSinglePost = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/post/${post.id}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      setSinglePost(data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, [singlePost]);

  return (
    <View className="relative">
      <Text className="text-center">Comments</Text>

      <View className=" items-center mt-2 mx-4">
        <View className="flex-row items-center gap-2">
          <Image
            className="w-8 h-8 rounded-full"
            source={require('../../assets/images/cover.jpg')}
          />
          <TextInput
            className="flex-1 h-8  px-2 rounded-full border border-gray-300"
            placeholder="Write a comment..."
            value={commentInput}
            onChangeText={(text) => setCommentInput(text)}
          />

          <TouchableOpacity onPress={handleCommentSubmit}>
            <Ionicons name="send" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="mt-8 ">
        {singlePost.comments.map((comment) => (
          <PostCommentElement key={comment.id} comment={comment} />
        ))}

        <View className="h-[200px]"></View>
      </ScrollView>
    </View>
  );
};

export default PostCommentContainer;
