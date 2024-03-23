import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome6,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { COLORS } from '../../constants';
import SvgView from '../SvgView';
import { svgs } from '../../assets/svg/svgs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../constants/data';
import { Modal, Portal } from 'react-native-paper';
import useAuthStore from '../../store/authStore';
import * as Linking from 'expo-linking';
import { useFundRaisingStore } from '../../store/fundRaisingStore';
import FundRaisingDetailsCard from './FundRaisingDetailsCard';

const FundRaisingCard = ({ fundRaising }) => {
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

  const [singleFundRaising, setSingleFundRaising] = useState(fundRaising);
  const { getFundRaising } = useFundRaisingStore((state) => state);

  const { authType, setAuthType } = useAuthStore((state) => state);

  useEffect(() => {
    const fetchAuthType = async () => {
      try {
        await setAuthType();
      } catch (error) {}
    };
    fetchAuthType();
  }, []);

  const getSingleFundRaising = async (fundRaisingId) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/fundRaising/${fundRaisingId}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });

      setSingleFundRaising(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSingleFundRaising(fundRaising.id);
  }, []);

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
              {singleFundRaising?.userId
                ? singleFundRaising?.user?.fullName
                : singleFundRaising?.ngo?.name || 'Anonymous'}
            </Text>
            <Text className="text-xs text-gray-500">
              {new Date(singleFundRaising.createdAt).toDateString()}
            </Text>
          </View>
          <Ionicons name="chevron-down-outline" size={18} />
        </View>
        <View className="flex-row items-center my-1">
          {/* <Ionicons name="location-outline" size={18} /> */}

          <View className="flex-row items-center ml-2">
            {singleFundRaising.address?.lat &&
            singleFundRaising.address?.lng ? (
              <TouchableOpacity
                onPress={() => {
                  const location = `${singleFundRaising.address?.lat},${singleFundRaising.address?.lng}`;

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
        {singleFundRaising?.media && singleFundRaising.media.length > 0 ? (
          <Carousel
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            loop={false}
            width={Dimensions.get('window').width - 20}
            height={300}
            data={singleFundRaising.media || []}
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
                      {index + 1} of {singleFundRaising.media.length}
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

        <View className="flex-row items-center justify-between "></View>

        <TouchableOpacity
          className="flex-row items-center justify-between mt-2"
          onPress={showModal}
        >
          <Text
            className="font-semibold text-lg "
            style={{
              color: COLORS.primary,
            }}
          >
            {singleFundRaising.title}
          </Text>
        </TouchableOpacity>
        <View className="flex-row items-center  mt-2 flex-wrap">
          {singleFundRaising?.tags?.map((tag, index) => (
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
          <FundRaisingDetailsCard
            fundRaising={fundRaising}
            hideModal={hideModal}
          />
        </Modal>
      </Portal>
    </>
  );
};

export default FundRaisingCard;
