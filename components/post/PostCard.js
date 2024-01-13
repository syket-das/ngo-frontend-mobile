import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';

import { Ionicons } from '@expo/vector-icons';
import useBottomSheetStore from '../../store/bottomSheetStore';
import CommentContainer from '../comment/CommentContainer';

const PostCard = () => {
  const { setBottomSheet, setBottomSheetContent } = useBottomSheetStore(
    (state) => state
  );

  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <Image
            className="w-8 h-8 rounded-full"
            source={require('../../assets/images/cover.jpg')}
          />
          <Text className="font-bold">John Doe</Text>
          <Text className="text-xs text-gray-500">2h ago</Text>
        </View>
        <Ionicons name="chevron-down-outline" size={18} />
      </View>
      <View className="flex-row items-center mt-1">
        {/* <Ionicons name="location-outline" size={18} /> */}
        <Text className="text-xs text-gray-500 ml-1">
          Los Angeles, California
        </Text>
      </View>
      <Image
        className="w-full h-64 rounded-xl mt-2"
        source={require('../../assets/images/cover.jpg')}
      />

      <View className="flex-row justify-between mt-2">
        <View className="flex-row  items-center bg-slate-200 px-2 py-1 rounded-lg">
          <View className="flex-row  items-center gap-1">
            <Ionicons
              name="heart"
              size={18}
              style={{
                color: 'red',
              }}
            />
            <Text className="text-xs">1K</Text>
          </View>

          <View className="w-[1px] h-full bg-slate-400 mx-2"></View>

          <Ionicons name="heart-dislike-outline" size={18} />
        </View>

        <TouchableOpacity
          className="flex-row items-center gap-2"
          onPress={() => {
            setBottomSheet(true);
            setBottomSheetContent(<CommentContainer />);
          }}
        >
          <Text className="text-xs">1K</Text>
          <Ionicons name="chatbubble-outline" size={18} />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-start gap-2 items-center mt-2">
        <Text className="font-semibold text-xs text-gray-500 ">#FreeLife</Text>
        <Text className="font-semibold text-xs text-gray-500 ">
          #SocialAwareness
        </Text>
        <Text className="font-semibold text-xs text-gray-500 ">#Trend</Text>
      </View>

      <Text className="mt-2 font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates
      </Text>

      <Text className="mt-2 font-thin">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
        aspernatur illum et harum, laboriosam suscipit? Nihil necessitatibus
        dolores, itaque ullam quo distinctio quisquam, porro quaerat facere
        perspiciatis repudiandae repellat aspernatur?
      </Text>
    </View>
  );
};

export default PostCard;
