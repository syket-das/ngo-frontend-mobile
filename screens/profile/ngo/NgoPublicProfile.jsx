import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../constants';
import { Ionicons } from '@expo/vector-icons';
import ProfileTopTabs from '../../../navigations/ProfileTopTabs';
import { useSearchStore } from '../../../store/searchStore';

const NgoPublicProfile = ({ ngo }) => {
  const { searchedUser, setSearchedUser, setSearchedNgo, setRole } =
    useSearchStore((state) => state);

  useEffect(() => {
    setSearchedNgo(ngo);
    setRole('NGO');
  }, [ngo]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View className=" mt-4">
        <View className="flex-row mx-4 justify-between">
          <Image
            source={{ uri: ngo?.profileImage?.url }}
            className="h-14 w-14 rounded-full"
          />
          <View className="flex-row items-center gap-4">
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
              <Text className="text-xs font-semibold text-gray-500">
                Points
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-sm font-semibold mt-2 ml-4">
          {ngo?.name || ' Name'} {ngo?.type && `(${ngo?.type})`}
        </Text>
      </View>
      <View className="flex-row  items-center  mx-4">
        <Ionicons name="location" size={16} color="gray" />
        <Text className="text-xs font-semibold text-gray-500">
          {ngo?.address?.city}, {ngo?.address?.country}
        </Text>
      </View>

      <ScrollView>
        <View className="mx-4 mt-2">
          <Text className="text-xs font-semibold text-gray-500">
            {ngo?.bio}
          </Text>
        </View>

        <ProfileTopTabs role="NGO" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NgoPublicProfile;
