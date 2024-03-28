import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../constants';
import { Ionicons } from '@expo/vector-icons';
import ProfileTopTabs from '../../../navigations/ProfileTopTabs';
import { useSearchStore } from '../../../store/searchStore';
import useBottomSheetStore from '../../../store/bottomSheetStore';
import useUserStore from '../../../store/userStore';
import useFollowStore from '../../../store/followStore';

const UserPublicProfile = ({ user }) => {
  const { mutateFollow, followers, followings, getFollowers, getFollowings } =
    useFollowStore((state) => state);
  const { setBottomSheet, setBottomSheetContent, setInitialSnap } =
    useBottomSheetStore((state) => state);
  const [points, setPoints] = useState(0);
  const [donation, setDonation] = useState(0);
  const [volunteer, setVolunteer] = useState(0);
  const [intellectual, setIntellectual] = useState(0);

  const { searchedUser, setSearchedUser, setRole } = useSearchStore(
    (state) => state
  );

  const { userData, getUserData } = useUserStore((state) => state);

  useEffect(() => {
    getUserData(user?.id);
  }, []);

  useEffect(() => {
    setSearchedUser(user);

    let point = 0;
    let donation = 0;
    let volunteer = 0;
    let intellectual = 0;

    if (user?.userPoints) {
      user?.userPoints?.map((p) => {
        if (p.donation) {
          donation += p.donation;
        }
        if (p.volunteer) {
          volunteer += p.volunteer;
        }
        if (p.intellectual) {
          intellectual += p.intellectual;
        }

        point = donation + volunteer + intellectual;
      });

      setDonation(donation);
      setVolunteer(volunteer);
      setIntellectual(intellectual);
    }

    setRole('USER');
  }, []);

  useEffect(() => {
    fetchFollowers();
    fetchFollowings();
  }, []);

  const fetchFollowers = async () => {
    try {
      await getFollowers();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  const fetchFollowings = async () => {
    try {
      await getFollowings();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View className="mt-4">
        <View className="flex-row  items-center justify-between  mx-4">
          <Text className="text-sm font-semibold  ">
            {user?.fullName || ' Name'}{' '}
            {user?.profession && `(${user?.profession})`}
          </Text>

          {followings?.find((f) => f.followingId === user?.id) ? (
            <TouchableOpacity
              onPress={async () => {
                await mutateFollow(user?.id, 'USER');
                await fetchFollowings();
              }}
              className="bg-primary  rounded-full"
            >
              <Text className="text-md font-semibold text-red-800 ">
                Unfollow
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                await mutateFollow(user?.id, 'USER');
                await fetchFollowings();
              }}
              className="bg-primary  rounded-full"
            >
              <Text className="text-md font-semibold text-blue-800 ">
                Follow
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-row mx-4 justify-between">
          <Image
            source={{ uri: user?.profileImage?.url || '' }}
            className="h-14 w-14 rounded-full"
          />

          <View className="flex-row items-center flex-0.5 gap-4">
            <TouchableOpacity
              onPress={() => {}}
              className="justify-center items-center "
            >
              <Text className="text-sm font-semibold text-green-800">
                {userData?.followers?.length || 0}
              </Text>
              <Text className="text-xs font-semibold text-gray-500">
                Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              className="justify-center items-center "
            >
              <Text className="text-sm font-semibold text-blue-800">
                {userData?.followings?.length || 0}
              </Text>
              <Text className="text-xs font-semibold text-gray-500">
                Followings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBottomSheet(true);
                setInitialSnap('50%');

                setBottomSheetContent(
                  <View className="w-full flex-col gap-y-2 px-2 mt-8">
                    <View className="flex-row items-center  w-full justify-between bg-slate-200 p-4">
                      <Text className="text-sm font-semibold text-gray-800">
                        Donation Points
                      </Text>
                      <Text className="text-sm font-semibold text-green-800">
                        {donation}
                      </Text>
                    </View>
                    <View className="flex-row items-center  w-full justify-between bg-slate-200 p-4">
                      <Text className="text-sm font-semibold text-gray-800">
                        Volunteer Points
                      </Text>

                      <Text className="text-sm font-semibold text-blue-800">
                        {volunteer}
                      </Text>
                    </View>
                    <View className="flex-row items-center  w-full justify-between bg-slate-200 p-4">
                      <Text className="text-sm font-semibold text-gray-800">
                        Intellectual Points
                      </Text>
                      <Text className="text-sm font-semibold text-red-800">
                        {intellectual}
                      </Text>
                    </View>
                  </View>
                );
              }}
              className="justify-center items-center "
            >
              <Text className="text-sm font-semibold text-red-800">
                {donation + volunteer + intellectual}
              </Text>
              <Text className="text-xs font-semibold text-gray-500">
                Points
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-sm font-semibold mt-2 mx-4">
          {user?.fullName || 'Full Name'}{' '}
          {user?.profession && `(${user?.profession})`}
        </Text>
      </View>
      <View className="flex-row  items-center  mx-4">
        <Ionicons name="location" size={16} color="gray" />
        <Text className="text-xs font-semibold text-gray-500">
          {user?.address?.city}, {user?.address?.country}
        </Text>
      </View>
      {/* <View className="flex-row items-center gap-x-2 mx-4 mt-2">
        <Text className="text-[10px] text-green-700 font-semibold border border-dashed border-green-700 px-1">
          Top Contributor
        </Text>
        <Text className="text-[10px] text-blue-700 font-semibold border border-dashed border-blue-700 px-1">
          Top Donor
        </Text>
        <Text className="text-[10px] font-semibold border border-dashed border-red-600 text-red-600 px-1">
          Top Volunteer
        </Text>
      </View> */}

      <View className="mx-4 mt-2">
        <Text className="text-xs font-semibold text-gray-500">{user?.bio}</Text>
      </View>

      <ProfileTopTabs />
    </SafeAreaView>
  );
};

export default UserPublicProfile;
