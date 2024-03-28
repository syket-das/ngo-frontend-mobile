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
import ProfileTopTabs from '../../../navigations/ProfileScreenTopTabs';
import useBottomSheetStore from '../../../store/bottomSheetStore';
import useFollowStore from '../../../store/followStore';

const UserProfile = ({ navigation }) => {
  const { followers, followings, getFollowers, getFollowings } = useFollowStore(
    (state) => state
  );

  const { setBottomSheet, setBottomSheetContent, setInitialSnap } =
    useBottomSheetStore((state) => state);
  const { profile, getProfile } = useUserStore((state) => state);
  const [points, setPoints] = useState(0);
  const [donation, setDonation] = useState(0);
  const [volunteer, setVolunteer] = useState(0);
  const [intellectual, setIntellectual] = useState(0);

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
  }, []);

  useEffect(() => {
    let point = 0;
    let donation = 0;
    let volunteer = 0;
    let intellectual = 0;

    if (profile?.userPoints) {
      profile?.userPoints?.map((p) => {
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
  }, [profile]);

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
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar
        backgroundColor={COLORS.white}
        animated
        style="auto"
        networkActivityIndicatorVisible={true}
      />
      <View className=" my-1">
        <View className="flex-row justify-between items-center mx-4 ">
          <Text className="text-sm font-semibold mt-2 mx-4  ">
            {profile?.fullName || 'Full Name'}{' '}
            {profile?.profession && `(${profile?.profession})`}
          </Text>

          <View className="flex-row items-center gap-4">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditProfile');
              }}
            >
              <FontAwesome name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Create');
              }}
            >
              <MaterialIcons name="add-box" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-row mx-4 justify-between">
        <View>
          <Image
            source={{ uri: profile?.profileImage?.url || '' }}
            className="h-20 w-h-20 rounded-full"
          />
        </View>

        <View className="flex-row items-center flex-0.5 gap-4">
          <TouchableOpacity
            onPress={() => {}}
            className="justify-center items-center "
          >
            <Text className="text-sm font-semibold text-green-800">
              {followers?.length || 0}
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
              {followings?.length || 0}
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
            <Text className="text-xs font-semibold text-gray-500">Points</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row  items-center  mx-4">
        <Ionicons name="location" size={16} color="gray" />
        <Text className="text-xs font-semibold text-gray-500">
          {profile?.address?.city}, {profile?.address?.country}
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
        <Text className="text-xs font-semibold text-gray-500">
          {profile?.bio}
        </Text>
      </View>
      <ProfileTopTabs />
    </SafeAreaView>
  );
};

export default UserProfile;
