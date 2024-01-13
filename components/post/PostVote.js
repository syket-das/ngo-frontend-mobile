import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import usePostStore from '../../store/postStore';
import { URL } from '../../constants/data';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const PostVote = ({ post }) => {
  const navigation = useNavigation();
  const [singlePost, setSinglePost] = React.useState(post);
  const { voteOnPostByUser, getPosts } = usePostStore((state) => state);

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
  }, [singlePost]);

  return (
    <View className="flex-row justify-between mt-2">
      <View className="flex-row  items-center bg-slate-200 px-2 py-1 rounded-lg">
        <TouchableOpacity
          className="flex-row  items-center gap-1"
          onPress={() => {
            voteOnPostByUser(post.id, 'UPVOTE');
            getSinglePost(post.id);
          }}
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
                ? 22
                : 18
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
          onPress={() => {
            voteOnPostByUser(singlePost.id, 'DOWNVOTE');
            getSinglePost(post.id);
          }}
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
                ? 22
                : 18
            }
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="flex-row items-center gap-2"
        onPress={() => {
          setBottomSheet(true);
          setBottomSheetContent(<CommentContainer />);
        }}
      >
        <Text className="text-xs">{singlePost.commentsCount}</Text>
        <Ionicons name="chatbubble-outline" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default PostVote;
