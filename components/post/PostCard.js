import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
  Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import useBottomSheetStore from '../../store/bottomSheetStore';

import PostVote from './PostVote';
import PostCommentContainer from './PostCommentContainer';
import * as Linking from 'expo-linking';

const PostCard = ({ post }) => {
  const postBy = post.ownUserId ? 'USER' : post.ownNgoId ? 'NGO' : '';
  const { setBottomSheet, setBottomSheetContent } = useBottomSheetStore(
    (state) => state
  );

  const [clicked, setClicked] = React.useState(false);

  return (
    <View className="my-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <Image
            className="w-8 h-8 rounded-full"
            source={{
              uri:
                postBy === 'USER'
                  ? post.ownUser.profileImage?.url
                  : post.ownNgo.profileImage?.url,
            }}
          />
          <Text className="font-bold">
            {postBy === 'USER' ? post.ownUser.fullName : post.ownNgo.name}
          </Text>
          <Text className="text-xs text-gray-500">
            {new Date(post.createdAt).toDateString()}
          </Text>
        </View>
        <Ionicons name="chevron-down-outline" size={18} />
      </View>
      <View className="flex-row items-center my-1">
        {/* <Ionicons name="location-outline" size={18} /> */}
        <Text className="text-xs text-gray-500 ml-10">
          {post.address?.city} {post.address?.state} {post.address?.country}
        </Text>

        <View className="flex-row items-center ml-2">
          {post.address?.lat && post.address?.lng ? (
            <TouchableOpacity
              onPress={() => {
                const location = `${post.address?.lat},${post.address?.lng}`;

                const url = Platform.select({
                  ios: `maps:${location}`,
                  android: `geo:${location}?center=${location}&q=${location}&z=16`,
                });
                Linking.openURL(url);
              }}
            >
              <Text className="text-xs text-blue-500">Geo Tag</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {post?.media && post.media.length > 0 ? (
        <Carousel
          // it should not scroll when i swipe down the post
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          width={Dimensions.get('window').width - 20}
          height={300}
          data={post.media || []}
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
                    {index + 1} of {post.media.length}
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

      <View className="flex-row items-center justify-between mt-2">
        <PostVote post={post} />
        <View className="flex-row gap-x-2">
          <TouchableOpacity
            className="flex-row items-center gap-2"
            onPress={() => {
              setBottomSheet(true);
              setBottomSheetContent(<PostCommentContainer post={post} />);
            }}
          >
            <Text className="text-xs">{post.commentsCount}</Text>
            <Ionicons name="chatbubble-outline" size={18} />
          </TouchableOpacity>
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
            <MaterialCommunityIcons name="share" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center  mt-2 flex-wrap">
        {post?.tags?.map((tag, index) => (
          <View key={index} className="rounded-md">
            <Text className="text-xs text-black p-1 "># {tag}</Text>
          </View>
        ))}
      </View>

      <Text className="mt-2 font-semibold">{post.title}</Text>

      {post.description.length > 150 ? (
        <View>
          <Text className="text-gray-500 text-xs">
            {clicked
              ? post.description
              : post.description.slice(0, 150) + '...'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setClicked(!clicked);
            }}
          >
            <Text className="text-blue-500 text-xs">
              {clicked ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text className="text-gray-500 text-xs">{post.description}</Text>
      )}
      {/* <Text className="mt-2 text-xs  break-all "></Text> */}
    </View>
  );
};

export default PostCard;
