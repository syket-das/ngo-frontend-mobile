import {
  View,
  Text,
  Button,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import IssueVote from './IssueVote';
import IssueCommentsContainer from './IssueCommentsContainer';

const IssueDetailsCard = ({ issue, hideModal }) => {
  return (
    <View className="w-full h-full">
      <View className="flex-row justify-start items-start">
        <View className="flex-1">
          <Text className="text-lg font-bold">
            {issue?.title || 'No title provided'}
          </Text>
          <Text className="text-gray-500 text-xs">
            {new Date(issue?.createdAt).toDateString() || 'No date provided'}
          </Text>
          <Text className="text-gray-500 text-xs">Lagos, Nigeria</Text>
        </View>
        <View className="w-8 ">
          <Button onPress={hideModal} title="X" color="red" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="my-4">
          {issue?.media && issue.media.length > 0 ? (
            <Carousel
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
              width={Dimensions.get('window').width - 40}
              height={300}
              data={issue.media || []}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <View className="absolute top-2 right-8 z-10 p-1 bg-slate-200 rounded-md">
                      <Text className="text-xs text-red-500 text-center">
                        {index + 1} of {issue.media.length}
                      </Text>
                    </View>

                    <Image
                      className="w-full h-full"
                      source={{
                        uri: item.url,
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <Image
              className="w-full h-60"
              source={{ uri: 'https://picsum.photos/200/300' }}
            />
          )}
        </View>
        <View className="flex-row justify-start items-start">
          <IssueVote issue={issue} />
        </View>

        <View className="flex-row justify-start items-start">
          <View className="flex-1">
            <Text className="text-lg font-bold">Description</Text>
            <Text className="text-gray-500 text-xs">
              {issue?.description || 'No description provided'}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center my-4">
          <Text className="text-md font-bold">
            {issue.commentsCount} Answers
          </Text>
        </View>

        <View className="">
          <IssueCommentsContainer issue={issue} />
        </View>
      </ScrollView>
    </View>
  );
};

export default IssueDetailsCard;
