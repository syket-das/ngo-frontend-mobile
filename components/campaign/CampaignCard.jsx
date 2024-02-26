import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { AntDesign, Entypo, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useCampaignStore } from '../../store/campaignStore';
import SvgView from '../SvgView';
import { svgs } from '../../assets/svg/svgs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../constants/data';
import { Modal, Portal } from 'react-native-paper';
import CampaignDetailsCard from './CampaignDetailsCard';
import useAuthStore from '../../store/authStore';

const CampaignCard = ({ campaign }) => {
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

  const [singleCampaign, setSingleCampaign] = useState(campaign);
  const { getCampaign, joinOrLeaveCampaignByUser, joinOrLeaveCampaignByNgo } =
    useCampaignStore((state) => state);

  const { authType, setAuthType } = useAuthStore((state) => state);

  useEffect(() => {
    const fetchAuthType = async () => {
      try {
        await setAuthType();
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchAuthType();
  }, []);

  const getSingleCampaign = async (campaignId) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/campaign/${campaignId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      setSingleCampaign(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSingleCampaign(campaign.id);
  }, []);

  const handleJoinOrLeaveCampaign = async () => {
    if (authType.role === 'USER') {
      await joinOrLeaveCampaignByUser(singleCampaign.id);
      await getSingleCampaign(singleCampaign.id);
    } else if (authType.role === 'NGO') {
      await joinOrLeaveCampaignByNgo(singleCampaign.id);
      await getSingleCampaign(singleCampaign.id);
    }
  };

  return (
    <>
      <View className="flex-1 my-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-2 mb-2">
            <Image
              className="w-8 h-8 rounded-full"
              source={{
                uri: 'https://picsum.photos/200/300',
              }}
            />
            <Text className="font-bold">
              {singleCampaign?.ownUserId
                ? singleCampaign?.ownUser?.fullName
                : singleCampaign?.ownNgo?.name || 'Anonymous'}
            </Text>
            <Text className="text-xs text-gray-500">
              {new Date(singleCampaign.createdAt).toDateString()}
            </Text>
          </View>
          <Ionicons name="chevron-down-outline" size={18} />
        </View>
        {singleCampaign?.media && singleCampaign.media.length > 0 ? (
          <Carousel
            width={Dimensions.get('window').width - 20}
            height={300}
            data={singleCampaign.media || []}
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
                      {index + 1} of {singleCampaign.media.length}
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

        <View className="flex-row items-center justify-between ">
          <View className="flex-row items-center gap-x-1">
            <TouchableOpacity className="flex-row items-center gap-x-1 mt-2">
              <AntDesign name="team" size={18} />
              <Text className="text-xs font-bold">
                {singleCampaign.joinedUsers.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-x-1 mt-2">
              <FontAwesome6 name="building-ngo" size={18} />
              <Text className="text-xs font-bold">
                {singleCampaign.joinedNgos.length}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-x-1">
            <TouchableOpacity className="flex-row items-center  mt-2 p-1 ">
              <Entypo name="location-pin" size={18} />
              <Text
                className={`text-xs
              ${singleCampaign.virtual ? 'text-stone-400' : 'text-gray-500'}
            `}
              >
                {`${
                  singleCampaign.virtual
                    ? 'Virtual'
                    : singleCampaign.address?.city ||
                      singleCampaign.address?.state ||
                      singleCampaign.address?.country
                }`}
              </Text>
            </TouchableOpacity>

            {singleCampaign.loggedInUserOrNgoDetailsForCampaign.isJoined ? (
              <TouchableOpacity
                className="flex-row items-center gap-x-1 mt-2 p-1 "
                onPress={handleJoinOrLeaveCampaign}
              >
                <Text className="text-xs text-red-500">Leave</Text>
                <AntDesign name="logout" color={'red'} size={18} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="flex-row items-center gap-x-1 mt-2 p-1 "
                onPress={handleJoinOrLeaveCampaign}
              >
                <Text className="text-xs text-green-600">Join</Text>
                <AntDesign name="login" color={COLORS.primary} size={18} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-between mt-2"
          onPress={showModal}
        >
          <Text className="font-semibold text-lg">{singleCampaign.title}</Text>
        </TouchableOpacity>
        <View className="flex-row items-center  mt-2 flex-wrap">
          {singleCampaign?.tags?.map((tag, index) => (
            <View key={index} className="rounded-md">
              <Text className="text-xs text-black p-1 "># {tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <CampaignDetailsCard campaign={campaign} hideModal={hideModal} />
        </Modal>
      </Portal>
    </>
  );
};

export default CampaignCard;
