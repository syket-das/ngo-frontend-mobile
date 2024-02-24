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
import IssueCommentElement from './IssueCommentElement';
import { URL } from '../../constants/data';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useIssueStore from '../../store/issueStore';
import useAuthStore from '../../store/authStore';

const IssueCommentsContainer = ({ issue }) => {
  const [singleIssue, setSingleIssue] = React.useState(issue);
  const { commentOnIssueByUser, commentOnIssueByNgo } = useIssueStore(
    (state) => state
  );
  const [commentInput, setCommentInput] = React.useState('');

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

  const handleCommentSubmit = async () => {
    if (!commentInput) return;

    if (authType.role === 'USER') {
      await commentOnIssueByUser(issue.id, commentInput);
    }

    if (authType.role === 'NGO') {
      await commentOnIssueByNgo(issue.id, commentInput);
    }

    setCommentInput('');

    await getSingleIssue();
  };

  const getSingleIssue = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/issue/${singleIssue.id}`,
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
  }, [issue]);

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
            value={commentInput}
            onChangeText={(text) => setCommentInput(text)}
          />

          <TouchableOpacity onPress={handleCommentSubmit}>
            <Ionicons name="send" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="mt-8 ">
        {singleIssue.comments.map((comment) => (
          <IssueCommentElement key={comment.id} comment={comment} />
        ))}

        <View className="h-[100px]"></View>
      </ScrollView>
    </View>
  );
};

export default IssueCommentsContainer;
