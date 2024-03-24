import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../constants';
import { Ionicons } from '@expo/vector-icons';
import ProfileTopTabs from '../../../navigations/ProfileTopTabs';
import { useSearchStore } from '../../../store/searchStore';

const NgoPublicProfile = ({ ngo }) => {
  const { searchedUser, setSearchedUser, setSearchedNgo, setRole } =
    useSearchStore((state) => state);

  const [points, setPoints] = useState(0);
  const [donation, setDonation] = useState(0);
  const [volunteer, setVolunteer] = useState(0);
  const [intellectual, setIntellectual] = useState(0);

  useEffect(() => {
    setSearchedNgo(ngo);

    let point = 0;
    let donation = 0;
    let volunteer = 0;
    let intellectual = 0;

    if (ngo?.ngoPoints) {
      ngo?.ngoPoints?.map((p) => {
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

    setRole('NGO');
  }, []);

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
            source={{ uri: ngo?.profileImage?.url || '' }}
            className="h-14 w-14 rounded-full"
          />
          <View className="flex-row items-center flex-0.5 gap-4">
            <TouchableOpacity className="justify-center items-center ">
              <Text className="text-sm font-semibold text-red-800">
                {donation}
              </Text>
              <Text className="text-xs font-semibold text-gray-500">
                Donation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="justify-center items-center">
              <Text className="text-sm font-semibold text-green-800">
                {volunteer}
              </Text>

              <Text className="text-xs font-semibold text-gray-500">
                Volunteer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="justify-center items-center">
              <Text className="text-sm font-semibold text-blue-800">
                {intellectual}
              </Text>
              <Text className="text-xs font-semibold text-gray-500">
                Intellectual
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
        <Text className="text-xs font-semibold text-gray-500">{ngo?.bio}</Text>
      </View>

      <ProfileTopTabs role="NGO" />
    </SafeAreaView>
  );
};

export default NgoPublicProfile;
