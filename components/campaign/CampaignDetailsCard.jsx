import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import CampaignAttendesTable from './CampaignAttendesTable';
import { FAB, Portal, Modal } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useCampaignStore } from '../../store/campaignStore';
import Toast from 'react-native-toast-message';
import Button from '../Button';
import { useStripe } from '@stripe/stripe-react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';

const CampaignDetailsCard = ({ campaign, hideModal }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    broadcastCampaign,
    deleteBroadcast,
    getCampaigns,
    campaign: campaignFromSt,
    createPaymentIntentForDonation,
  } = useCampaignStore((state) => state);

  const [visible, setVisible] = useState(false);

  const [message, setMessage] = useState('');

  const handleBroadcast = async () => {
    try {
      await broadcastCampaign(campaign.id, message);
      setVisible(false);

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Broadcast sent',
        visibilityTime: 3000,
        autoHide: true,
      });

      await getCampaigns();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: error.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const handleDeleteBroadcast = async (broadcastId) => {
    try {
      await deleteBroadcast(broadcastId);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Broadcast deleted',
        visibilityTime: 3000,
        autoHide: true,
      });

      await getCampaigns();
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Broadcast not deleted',
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const handleDonate = async () => {
    setAmountModal(true);
  };

  const [amount, setAmount] = useState(Number(0));
  const [amountModal, setAmountModal] = useState(false);

  const hideAmountModal = () => {
    setAmountModal(false);
  };

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  };

  const initPayment = async () => {
    try {
      const paymentIntent = await createPaymentIntentForDonation(
        Number(amount),
        campaign.id
      );

      if (paymentIntent) {
        hideAmountModal();

        const initResponse = await initPaymentSheet({
          merchantDisplayName: 'Cyp India',
          paymentIntentClientSecret: paymentIntent.clientSecret,
          googlePay: true,
        });

        if (initResponse.error) {
          Alert.alert('Error', initResponse.error.message);
        }

        const paymentRes = await presentPaymentSheet();

        if (paymentRes.error) {
          Alert.alert('Error', paymentRes.error.message);
          return;
        }
      }

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Donation successful',
        visibilityTime: 3000,
        autoHide: true,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="w-full h-full relative">
      <View className="flex-row justify-start items-start">
        <View className="flex-1">
          <Text className="text-lg font-bold">
            {campaign?.title || 'No title provided'}
          </Text>
          <Text className="text-gray-500 text-xs">
            {new Date(campaign?.createdAt).toDateString() || 'No date provided'}
          </Text>
          <Text className="text-gray-500 text-xs">Lagos, Nigeria</Text>
        </View>
        <View className="w-8 ">
          <Button onPress={hideModal} title="X" color="red" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="my-4">
          {campaign?.media && campaign.media.length > 0 ? (
            <Carousel
              width={Dimensions.get('window').width - 40}
              height={300}
              data={campaign.media || []}
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
                        {index + 1} of {campaign.media.length}
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
        </View>

        <View className="flex-row justify-center items-center">
          <Text className="text-lg font-bold">
            {new Date(campaign?.startDate).toLocaleDateString() ||
              'No date provided'}{' '}
            -{' '}
            {new Date(campaign?.endDate).toLocaleDateString() ||
              'No date provided'}
          </Text>
        </View>

        <View className="flex-row justify-start items-start mt-2">
          <View className="flex-1">
            <Text className="text-lg font-bold">Motto</Text>
            <Text className="text-gray-500 text-xs">
              {campaign?.motto || 'No Motto provided'}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-start items-start mt-4">
          <View className="flex-1">
            <Text className="text-lg font-bold">Mission</Text>
            <Text className="text-gray-500 text-xs">
              {campaign?.description || 'No description provided'}
            </Text>
          </View>
        </View>

        <View className="gap-y-2 mt-8">
          <View className="flex-row justify-between items-center">
            <Text className=" font-bold">Created By</Text>
            <View className="flex-row items-center gap-2">
              <Text className="">
                {campaign?.ownUserId
                  ? campaign?.ownUser?.fullName
                  : campaign?.ownNgo?.name || 'Anonymous'}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className=" font-bold">Location</Text>
            <Text className="">
              {`${
                campaign.virtual
                  ? 'Virtual'
                  : campaign.address?.city ||
                    campaign.address?.state ||
                    campaign.address?.country
              }`}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className=" font-bold">Funds Needed</Text>
            <Text className="">{`INR ${campaign.fundsRequired || 0}`}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className=" font-bold">Funds Raised</Text>
            <Text className="">{`INR ${
              campaign.transactions
                .filter(
                  (t) =>
                    t.status === 'SUCCESS' &&
                    t.refunded === false &&
                    t.amount > 0
                )
                .reduce((acc, curr) => acc + curr.amount, 0) || 0
            }`}</Text>
          </View>
        </View>

        <View className="my-8">
          <Text className="text-md font-bold">Campaign Attendees</Text>
          <View className="w-full border border-gray-400 mt-2" />
          <CampaignAttendesTable campaign={campaign} />
        </View>

        <View className="flex-col  my-8">
          <View className="flex-row justify-between items-center">
            <Text className="text-md font-bold">Campaign Broadcasts</Text>

            <TouchableOpacity
              style={{
                display: campaign.loggedInUserOrNgoDetailsForCampaign.isOwner
                  ? 'flex'
                  : 'none',
              }}
              onPress={() => {
                setVisible(!visible);
              }}
              className="flex-row items-center gap-2"
            >
              <Ionicons name="add-circle" size={24} color="blue" />
              <Text className="text-blue-500">Add Message</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col  gap-2 mt-2">
            <View
              style={{
                marginBottom: 12,
                display: visible ? 'flex' : 'none',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                Broadcast
              </Text>

              <View
                style={{
                  width: '100%',
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="Enter the broadcast message"
                  placeholderTextColor={COLORS.black}
                  keyboardType="default"
                  style={{
                    width: '100%',
                    minHeight: 200,
                    maxHeight: 250,
                    textAlignVertical: 'top',
                    paddingTop: 12,
                  }}
                  multiline
                  value={message}
                  onChangeText={(val) => {
                    setMessage(val);
                  }}
                />
              </View>
              <View className="mt-2">
                <Button
                  onPress={handleBroadcast}
                  color={COLORS.primary}
                  title="Save Message"
                />
              </View>
            </View>

            {campaign.campaignBroadcasts.reverse().map((broadcast, index) => (
              <View key={index} className=" gap-2 bg-slate-100">
                <View className="flex-row justify-between items-center">
                  <Text className="text-xs text-gray-500">
                    {new Date(broadcast.createdAt).toDateString()} at{' '}
                    {new Date(broadcast.createdAt).toLocaleTimeString()}
                  </Text>
                  <TouchableOpacity
                    style={{
                      display: campaign.loggedInUserOrNgoDetailsForCampaign
                        .isOwner
                        ? 'flex'
                        : 'none',
                      marginRight: 8,
                    }}
                    onPress={() => {
                      handleDeleteBroadcast(broadcast.id);
                    }}
                  >
                    <Ionicons name="close-circle-sharp" size={20} color="red" />
                  </TouchableOpacity>
                </View>
                <View className="border border-gray-300" />

                <Text className="font-bold my-2">{broadcast.message}</Text>
              </View>
            ))}

            {campaign.campaignBroadcasts.length === 0 && (
              <Text className="text-gray-500 text-xs">
                No Broadcasts provided
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => {
          handleDonate();
        }}
        label="Donate"
      />
      <Portal>
        <Modal
          visible={amountModal}
          onDismiss={hideAmountModal}
          contentContainerStyle={containerStyle}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Enter the amount to donate
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="eg. 1000"
              placeholderTextColor={COLORS.grey}
              keyboardType="numeric"
              style={{
                width: '100%',
              }}
              value={amount}
              onChangeText={(val) => {
                setAmount(val);
              }}
            />
          </View>
          <View className="mt-4" />
          <Button
            disabled={!amount || amount <= 0}
            onPress={() => {
              initPayment();
            }}
            color={COLORS.primary}
            title="Donate"
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default CampaignDetailsCard;
