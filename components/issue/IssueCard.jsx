import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import React from 'react';
import {
  Modal,
  Portal,
  Text as PaperText,
  Button,
  PaperProvider,
} from 'react-native-paper';
import IssueDetailsCard from './IssueDetailsCard';
import { MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

const IssueCard = ({ issue }) => {
  const issueBy = issue.ownUserId ? 'USER' : issue.ownNgoId ? 'NGO' : '';

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,

    height: '100%',
    width: `100%`,
    alignSelf: 'center',
  };

  return (
    <>
      <View className="w-full flex-row border-b border-b-gray-300 my-2 pb-4 ">
        <View className="w-1/4 flex-col gap-1 justify-start items-end pr-3  gap-y-2">
          <Text className="text-gray-500 text-xs  px-1">
            {issue.votes.length} Votes
          </Text>
          <Text className="text-gray-500 text-xs  px-1 border border-gray-400 rounded-sm">
            {issue.comments.length} Answers
          </Text>
          <View className="flex-row items-center ml-2 ">
            <View className="flex-row items-center ml-2 ">
              {issue.address?.lat && issue.address?.lng ? (
                <TouchableOpacity
                  onPress={() => {
                    const location = `${issue.address?.lat},${issue.address?.lng}`;

                    const url = Platform.select({
                      ios: `maps:${location}`,
                      android: `geo:${location}?center=${location}&q=${location}&z=16`,
                    });
                    Linking.openURL(url);
                  }}
                >
                  <Text className=" text-green-800">
                    View <FontAwesome6 name="map-location-dot" size={18} />{' '}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={async () => {
              try {
                const result = await Share.share({
                  message:
                    'Cy India | A platform for social work and public welfare. Join us now. https://reactnative.dev/',
                  title: 'Cyp India',
                  url: 'https://reactnative.dev/',
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            <Text className="text-xs">Share</Text>
            <MaterialCommunityIcons name="share" size={20} />
          </TouchableOpacity>
        </View>
        <View className="w-3/4 ">
          <TouchableOpacity
            onPress={showModal}
            className="flex-col gap-1 justify-start items-start"
          >
            <Text className="text-md font-bold text-blue-400">
              {issue?.title || 'No title provided'}
            </Text>
          </TouchableOpacity>
          <View>
            <Text className="text-gray-500 text-xs">
              {issue?.description.slice(0, 150) || 'No description provided'}
            </Text>
          </View>

          <View className=" w-full mt-2">
            <View className="flex-row items-center mt-2 flex-wrap">
              {issue?.tags?.map((tag, index) => (
                <View key={index} className="rounded-md">
                  <Text
                    style={{
                      fontSize: 10,
                    }}
                    className="text-xs text-black p-1 "
                  >
                    # {tag}
                  </Text>
                </View>
              ))}
            </View>
            <View className=" flex-row justify-end mt-2 ">
              <View className="flex-row justify-end">
                <Image
                  source={require('../../assets/images/cover.jpg')}
                  className="w-4 h-4 rounded-full"
                />
                <Text
                  style={{
                    fontSize: 10,
                  }}
                  className="text-gray-500 text-xs ml-1"
                >
                  {issueBy === 'USER'
                    ? issue.ownUser.fullName
                    : issue.ownNgo.name}
                </Text>
              </View>

              <Text
                className="text-gray-500 text-xs text-right"
                style={{
                  fontSize: 10,
                }}
              >
                {new Date(issue.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <IssueDetailsCard issue={issue} hideModal={hideModal} />
        </Modal>
      </Portal>
    </>
  );
};

export default IssueCard;
