import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '../../constants/data';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useIssueStore from '../../store/issueStore';
import useAuthStore from '../../store/authStore';

const IssueCommentVote = ({ comment }) => {
  const [singleIssue, setSingleIssue] = React.useState({});
  const { voteOnIssueCommentByUser, voteOnIssueCommentByNgo } = useIssueStore(
    (state) => state
  );
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

  const getSingleIssue = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/issue/${comment.issueId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });
      setSingleIssue(data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSingleIssue();
  }, []);

  const isLoggedInUserVotedOnComment = () => {
    if (singleIssue.loggedInUserOrNgoDetailsForIssue !== undefined) {
      return singleIssue.loggedInUserOrNgoDetailsForIssue.voteTypeWithCommentIfVoted.find(
        (v) => comment.id === v.commentId
      );
    }
  };

  const handleUpVote = async () => {
    if (authType.role === 'USER') {
      await voteOnIssueCommentByUser(comment.id, 'UPVOTE');
      await getSingleIssue();
    } else if (authType.role === 'NGO') {
      await voteOnIssueCommentByNgo(comment.id, 'UPVOTE');
      await getSingleIssue();
    }
  };

  const handleDownVote = async () => {
    if (authType.role === 'USER') {
      await voteOnIssueCommentByUser(comment.id, 'DOWNVOTE');
      await getSingleIssue();
    } else if (authType.role === 'NGO') {
      await voteOnIssueCommentByNgo(comment.id, 'DOWNVOTE');
      await getSingleIssue();
    }
  };

  return (
    <View className="flex-row  mt-1">
      <Text className="mt-2 text-xs flex-1 ">{comment.comment}</Text>

      <View className="flex-col justify-between mt-2">
        <View className="flex-col  items-center bg-slate-200 px-2 py-1 rounded-lg">
          <View className="flex-col  items-center gap-1">
            <TouchableOpacity onPress={handleUpVote}>
              <Ionicons
                name={
                  isLoggedInUserVotedOnComment()?.voteType === 'UPVOTE'
                    ? 'heart'
                    : 'heart-outline'
                }
                size={
                  isLoggedInUserVotedOnComment()?.voteType === 'UPVOTE'
                    ? 20
                    : 16
                }
                style={{
                  color: 'red',
                }}
              />
            </TouchableOpacity>
            <Text className="text-xs">
              {
                singleIssue.comments
                  ?.find((c) => c.id === comment.id)
                  .votes?.filter((v) => v.voteType === 'UPVOTE').length
              }
            </Text>
          </View>

          <View className="h-[1px] w-full bg-slate-400 my-2"></View>
          <TouchableOpacity onPress={handleDownVote}>
            <Ionicons
              name={
                isLoggedInUserVotedOnComment()?.voteType === 'DOWNVOTE'
                  ? 'heart-dislike'
                  : 'heart-dislike-outline'
              }
              size={
                isLoggedInUserVotedOnComment()?.voteType === 'DOWNVOTE'
                  ? 20
                  : 16
              }
              style={{
                color: 'black',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default IssueCommentVote;
