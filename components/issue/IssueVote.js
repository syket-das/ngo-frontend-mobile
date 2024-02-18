import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { URL } from '../../constants/data';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useIssueStore from '../../store/issueStore';
const IssueVote = ({ issue }) => {
  const [singleIssue, setSingleIssue] = React.useState(issue);
  const { voteOnIssueByUser } = useIssueStore((state) => state);

  const getSingleIssue = async (issueId) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/issue/${issueId}`,
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
    getSingleIssue(issue.id);
  }, []);

  return (
    <View className="flex-row justify-between ">
      <View className="flex-row  items-center bg-slate-200 px-2 py-1 rounded-lg">
        <TouchableOpacity
          className="flex-row  items-center gap-1"
          onPress={async () => {
            await voteOnIssueByUser(issue.id, 'UPVOTE');
            await getSingleIssue(issue.id);
          }}
        >
          <Ionicons
            name={
              singleIssue.loggedInUserOrNgoDetailsForIssue.isVoted &&
              singleIssue.loggedInUserOrNgoDetailsForIssue.voteTypeIfVoted ===
                'UPVOTE'
                ? 'heart'
                : 'heart-outline'
            }
            size={
              singleIssue.loggedInUserOrNgoDetailsForIssue.isVoted &&
              singleIssue.loggedInUserOrNgoDetailsForIssue.voteTypeIfVoted ===
                'UPVOTE'
                ? 22
                : 18
            }
            style={{
              color:
                singleIssue.loggedInUserOrNgoDetailsForIssue.isVoted &&
                singleIssue.loggedInUserOrNgoDetailsForIssue.voteTypeIfVoted ===
                  'UPVOTE'
                  ? 'red'
                  : 'gray',
            }}
          />
        </TouchableOpacity>
        <Text className="text-xs ml-1">
          {singleIssue.loggedInUserOrNgoDetailsForIssue.upVoteCount}
        </Text>
        <View className="w-[1px] h-full bg-slate-400 mx-2"></View>
        <TouchableOpacity
          className="flex-row  items-center gap-1"
          onPress={async () => {
            await voteOnIssueByUser(singleIssue.id, 'DOWNVOTE');
            await getSingleIssue(issue.id);
          }}
        >
          <Ionicons
            name={
              singleIssue.loggedInUserOrNgoDetailsForIssue.isVoted &&
              singleIssue.loggedInUserOrNgoDetailsForIssue.voteTypeIfVoted ===
                'DOWNVOTE'
                ? 'heart-dislike'
                : 'heart-dislike-outline'
            }
            style={{
              color:
                singleIssue.loggedInUserOrNgoDetailsForIssue.isVoted &&
                singleIssue.loggedInUserOrNgoDetailsForIssue.voteTypeIfVoted ===
                  'DOWNVOTE'
                  ? 'black'
                  : 'gray',
            }}
            size={
              singleIssue.loggedInUserOrNgoDetailsForIssue.isVoted &&
              singleIssue.loggedInUserOrNgoDetailsForIssue.voteTypeIfVoted ===
                'DOWNVOTE'
                ? 22
                : 18
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IssueVote;
