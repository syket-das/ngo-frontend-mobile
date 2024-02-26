import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../constants';
import { Ionicons } from '@expo/vector-icons';
import ProfileTopTabs from '../../../navigations/ProfileTopTabs';
import { useSearchStore } from '../../../store/searchStore';

const UserPublicProfile = ({ user }) => {
  const { searchedUser, setSearchedUser, setRole } = useSearchStore(
    (state) => state
  );

  useEffect(() => {
    setSearchedUser(user);
    setRole('USER');
  }, [user]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View className="flex-row justify-between items-center mt-4 mx-4">
        <View>
          <Image source={images.profile} className="h-14 w-14 rounded-full" />
          <Text className="text-sm font-semibold mt-2">
            {user?.fullName || 'Full Name'}{' '}
            {user?.profession && `(${user?.profession})`}
          </Text>
        </View>

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
            <Text className="text-sm font-semibold text-red-800">300</Text>
            <Text className="text-xs font-semibold text-gray-500">Points</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row  items-center  mx-4">
        <Ionicons name="location" size={16} color="gray" />
        <Text className="text-xs font-semibold text-gray-500">
          {user?.address?.city}, {user?.address?.country}
        </Text>
      </View>

      <ScrollView>
        <View className="mx-4 mt-2">
          <Text className="text-xs font-semibold text-gray-500">
            {user?.bio}
          </Text>
        </View>

        <ProfileTopTabs role="USER" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserPublicProfile;
