import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES, images } from '../../../constants';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { photos } from '../../../constants/data';
import useUserStore from '../../../store/userStore';
import Toast from 'react-native-toast-message';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const UserProfile = () => {
  const { profile, getProfile } = useUserStore((state) => state);
  const [points, setPoints] = useState(0);
  const fetchProfile = async () => {
    try {
      await getProfile();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  useEffect(() => {
    fetchProfile();

    let point = 0;

    if (profile?.userPoints) {
      profile?.userPoints?.map((p) => {
        const total = p.donation + p.intellectual + p.intellectual;

        point += total;
      });

      setPoints(point);
    }
  }, [profile]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.white} />
      <View className=" mt-4">
        <View className="flex-row mx-4 justify-between">
          <Image
            source={{ uri: profile?.profileImage?.url || '' }}
            className="h-14 w-14 rounded-full"
          />
          <View className="flex-row items-center flex-0.5 gap-4">
            <TouchableOpacity className="justify-center items-center">
              <Text className="text-sm font-semibold text-green-800">300</Text>

              <Text className="text-xs font-semibold text-gray-500">
                Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="justify-center items-center">
              <Text className="text-sm font-semibold text-blue-800">300</Text>
              <Text className="text-xs font-semibold text-gray-500">
                Following
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="justify-center items-center">
              <Text className="text-sm font-semibold text-red-800">
                {points}
              </Text>
              <Text className="text-xs font-semibold text-gray-500">
                Points
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-sm font-semibold mt-2 mx-4">
          {profile?.fullName || 'Full Name'}{' '}
          {profile?.profession && `(${profile?.profession})`}
        </Text>
      </View>
      <View className="flex-row  items-center  mx-4">
        <Ionicons name="location" size={16} color="gray" />
        <Text className="text-xs font-semibold text-gray-500">
          {profile?.address?.city}, {profile?.address?.country}
        </Text>
      </View>
      <ScrollView>
        <View className="mx-4 mt-2">
          <Text className="text-xs font-semibold text-gray-500">
            {profile?.bio}
          </Text>
        </View>

        <View className="mx-4 mt-4">
          <View className="flex-row justify-between items-center ">
            <Text className="text-sm font-semibold">Posts</Text>
            <TouchableOpacity>
              <Text className="text-sm font-semibold text-blue-800">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
          >
            {profile &&
              profile?.createdPosts?.map((post) => (
                <View key={post.id} className="items-center relative">
                  <Image
                    source={{
                      uri:
                        post?.media[0]?.url ||
                        'https://i.ibb.co/W29btXp/profile.jpg',
                    }}
                    className="h-28 w-28 rounded-lg mr-2"
                  />
                  <View className="flex-row items-center absolute gap-1 top-0 right-2 border border-gray-400 rounded-tr-md p-1 bg-slate-300">
                    <Ionicons color={COLORS.black} name="analytics" size={10} />
                    <Text
                      style={{
                        fontSize: 10,
                      }}
                      className=" font-semibold text-green-800"
                    >
                      {post.votes.length}
                    </Text>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
        <View className="border mx-4 mt-8 mb-4 border-dashed" />
        <View className=" mx-4 ">
          <View className="flex-row justify-between items-center ">
            <Text className="text-sm font-semibold">Recent Campaigns</Text>
            <TouchableOpacity>
              <Text className="text-sm font-semibold text-blue-800">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} className="mt-2">
            {profile &&
              profile?.createdCampaigns
                ?.map((campaign) => (
                  <View key={campaign.id} className="">
                    <Image
                      source={{
                        uri:
                          campaign?.media[0]?.url ||
                          'https://i.ibb.co/W29btXp/profile.jpg',
                      }}
                      className="h-40 w-full rounded-lg mt-4 relative"
                    />
                    <View className="absolute top-4 right-4">
                      <View className="flex-row items-center mt-2 bg-slate-500 px-2 py-1 rounded-md opacity-80">
                        <FontAwesome
                          name="group"
                          size={16}
                          color={COLORS.black}
                        />
                        <Text className="text-xs font-semibold text-white ml-2">
                          {campaign?.joinedUsers?.length +
                            campaign?.joinedNgos?.length}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-xs mt-1 text-gray-500">
                      {campaign?.title}
                    </Text>
                  </View>
                ))
                .slice(0, 3)}
          </ScrollView>
        </View>

        <View className="border mx-4 mt-8 mb-4 border-dashed" />
        <View className=" mx-4 ">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-semibold">Fund Raising</Text>
            <TouchableOpacity>
              <Text className="text-sm font-semibold text-blue-800">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mt-4">
            <View className="flex-1 ">
              <View className="flex-row items-center">
                <Text className="text-lg font-semibold text-black">3</Text>
              </View>
              <Text className="text-xs font-semibold text-gray-500">
                Open Posts
              </Text>
            </View>
            <View className="flex-1 ">
              <View className="flex-row items-center">
                <Text className="text-lg font-semibold text-black">30</Text>
              </View>
              <Text className="text-xs font-semibold text-gray-500">
                Total Posts
              </Text>
            </View>
            <View className="flex-1 ">
              <Text className="text-lg font-semibold text-black">$3000</Text>
              <Text className="text-xs font-semibold text-gray-500">
                Total Raised
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
          >
            {photos
              .map((photo, index) => (
                <View key={index} className="rounded  mx-2">
                  <Image source={photo} className="h-32 w-[180px] rounded-lg" />
                  <View className="flex-row items-center justify-between mx-2">
                    <View className="flex-row  mt-2 z-10 items-center justify-center">
                      <FontAwesome name="money" size={16} color="gray" />
                      <Text className="text-xs font-semibold  ml-2">23 $</Text>
                    </View>
                    <View className="flex-row  mt-2 z-10 items-center justify-center">
                      <FontAwesome name="group" size={14} color="gray" />
                      <Text className="text-xs font-semibold  ml-2">23</Text>
                    </View>
                  </View>
                </View>
              ))
              .slice(0, 3)}
          </ScrollView>
        </View>
        <View className="border mx-4 mt-8 mb-4 border-dashed" />
        <View className=" mx-4 ">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-semibold">Issues</Text>
            <TouchableOpacity>
              <Text className="text-sm font-semibold text-blue-800">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View className="my-2">
            {profile?.createdIssues?.map((issue) => (
              <TouchableOpacity
                key={issue.id}
                className="mt-1 border p-2 rounded-lg border-gray-500"
              >
                <Text className="font-bold">{issue.title}</Text>
                <Text className="text-xs font-semibold text-gray-500 mt-2">
                  {issue.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="h-40" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
