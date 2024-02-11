import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  Modal,
  Portal,
  Text as PaperText,
  Button,
  PaperProvider,
} from 'react-native-paper';
import IssueDetailsCard from './IssueDetailsCard';

const IssueCard = ({ issue }) => {
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
          <Text className="text-gray-500 text-xs  px-1">23 Votes</Text>
          <Text className="text-gray-500 text-xs  px-1 border border-gray-400 rounded-sm">
            3 Answers
          </Text>
          <Text className="text-primary-500 text-xs  px-1">2k Views</Text>
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

          <View className="flex-row w-full mt-2">
            <View className="w-3/4 flex-row justify-start gap-1 flex-wrap">
              <Text
                className="text-gray-500 text-xs"
                style={{
                  fontSize: 10,
                }}
              >
                #Cloud
              </Text>
              <Text
                className="text-gray-500 text-xs"
                style={{
                  fontSize: 10,
                }}
              >
                #Cloud
              </Text>
              <Text
                className="text-gray-500 text-xs"
                style={{
                  fontSize: 10,
                }}
              >
                #Cloud
              </Text>
              <Text
                className="text-gray-500 text-xs"
                style={{
                  fontSize: 10,
                }}
              >
                #Cloud
              </Text>
              <Text
                className="text-gray-500 text-xs"
                style={{
                  fontSize: 10,
                }}
              >
                #Cloud
              </Text>
              <Text
                className="text-gray-500 text-xs"
                style={{
                  fontSize: 10,
                }}
              >
                #Cloud
              </Text>
            </View>

            <View className="w-1/4 flex-col ">
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
                  John Doe
                </Text>
              </View>

              <Text
                className="text-gray-500 text-xs text-right"
                style={{
                  fontSize: 10,
                }}
              >
                2 days ago
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
          <IssueDetailsCard issue={issue} />
        </Modal>
      </Portal>
    </>
  );
};

export default IssueCard;
