import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import usePostStore from '../../store/postStore';
import { URL } from '../../constants/data';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../store/authStore';
const PostVote = ({ post }) => {
  const [singlePost, setSinglePost] = React.useState(post);
  const { voteOnPostByUser, voteOnPostByNgo } = usePostStore((state) => state);

  const { authType, setAuthType } = useAuthStore((state) => state);

  useEffect(() => {
    const fetchAuthType = async () => {
      try {
        await setAuthType();
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchAuthType();
  }, []);
  const getSinglePost = async (postId) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/post/${postId}`,
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
    getSinglePost(post.id);
  }, []);

  const handleUpVote = async () => {
    if (authType.role === 'USER') {
      await voteOnPostByUser(post.id, 'UPVOTE');
      await getSinglePost(post.id);
    } else if (authType.role === 'NGO') {
      await voteOnPostByNgo(post.id, 'UPVOTE');
      await getSinglePost(post.id);
    }
  };
  const handleDownVote = async () => {
    if (authType.role === 'USER') {
      await voteOnPostByUser(post.id, 'DOWNVOTE');
      await getSinglePost(post.id);
    } else if (authType.role === 'NGO') {
      await voteOnPostByNgo(post.id, 'DOWNVOTE');
      await getSinglePost(post.id);
    }
  };

  return (
    <View className="flex-row justify-between ">
      <View className="flex-row  items-center bg-slate-200 px-2 py-1 rounded-lg">
        <TouchableOpacity
          className="flex-row  items-center gap-1"
          onPress={handleUpVote}
        >
          <Ionicons
            name={
              singlePost.loggedInUserOrNgoDetailsForPost.isVoted &&
              singlePost.loggedInUserOrNgoDetailsForPost.voteTypeIfVoted ===
                'UPVOTE'
                ? 'heart'
                : 'heart-outline'
            }
            size={
              singlePost.loggedInUserOrNgoDetailsForPost.isVoted &&
              singlePost.loggedInUserOrNgoDetailsForPost.voteTypeIfVoted ===
                'UPVOTE'
                ? 26
                : 22
            }
            style={{
              color:
                singlePost.loggedInUserOrNgoDetailsForPost.isVoted &&
                singlePost.loggedInUserOrNgoDetailsForPost.voteTypeIfVoted ===
                  'UPVOTE'
                  ? 'red'
                  : 'gray',
            }}
          />
        </TouchableOpacity>
        <Text className="text-xs ml-1">{singlePost.upVoteCount}</Text>
        <View className="w-[1px] h-full bg-slate-400 mx-2"></View>
        <TouchableOpacity
          className="flex-row  items-center gap-1"
          onPress={handleDownVote}
        >
          <Ionicons
            name={
              singlePost.loggedInUserOrNgoDetailsForPost.isVoted &&
              singlePost.loggedInUserOrNgoDetailsForPost.voteTypeIfVoted ===
                'DOWNVOTE'
                ? 'heart-dislike'
                : 'heart-dislike-outline'
            }
            style={{
              color:
                singlePost.loggedInUserOrNgoDetailsForPost.isVoted &&
                singlePost.loggedInUserOrNgoDetailsForPost.voteTypeIfVoted ===
                  'DOWNVOTE'
                  ? 'black'
                  : 'gray',
            }}
            size={
              singlePost.loggedInUserOrNgoDetailsForPost.isVoted &&
              singlePost.loggedInUserOrNgoDetailsForPost.voteTypeIfVoted ===
                'DOWNVOTE'
                ? 26
                : 22
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostVote;
