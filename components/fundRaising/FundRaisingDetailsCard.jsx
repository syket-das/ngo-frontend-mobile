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
import { FAB, Portal, Modal } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import Toast from 'react-native-toast-message';
import Button from '../Button';
import { useStripe } from '@stripe/stripe-react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions } from 'react-native';
import { useFundRaisingStore } from '../../store/fundRaisingStore';

const FundRaisingDetailsCard = ({ fundRaising, hideModal }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    getFundRaisings,
    fundRaising: fundRaisingFromSt,
    createPaymentIntentForDonation,
  } = useFundRaisingStore((state) => state);

  const [visible, setVisible] = useState(false);

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
        fundRaising.id
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
            {fundRaising?.title || 'No title provided'}
          </Text>
          <Text className="text-gray-500 text-xs">
            {new Date(fundRaising?.createdAt).toDateString() ||
              'No date provided'}
          </Text>
          <Text className="text-gray-500 text-xs">Lagos, Nigeria</Text>
        </View>
        <View className="w-8 ">
          <Button onPress={hideModal} title="X" color="red" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="my-4">
          {fundRaising?.media && fundRaising.media.length > 0 ? (
            <Carousel
              width={Dimensions.get('window').width - 40}
              height={300}
              data={fundRaising.media || []}
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
                        {index + 1} of {fundRaising.media.length}
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
            {new Date(fundRaising?.startDate).toLocaleDateString() ||
              'No date provided'}{' '}
            -{' '}
            {new Date(fundRaising?.endDate).toLocaleDateString() ||
              'No date provided'}
          </Text>
        </View>

        <View className="flex-row justify-start items-start mt-4">
          <View className="flex-1">
            <Text className="text-lg font-bold">Mission</Text>
            <Text className="text-gray-500 text-xs">
              {fundRaising?.description || 'No description provided'}
            </Text>
          </View>
        </View>

        <View className="gap-y-2 mt-8">
          <View className="flex-row justify-between items-center">
            <Text className=" font-bold">Created By</Text>
            <View className="flex-row items-center gap-2">
              <Text className="">
                {fundRaising?.userId
                  ? fundRaising?.user?.fullName
                  : fundRaising?.ngo?.name || 'Anonymous'}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className=" font-bold">Location</Text>
            <Text className="">
              {`${
                fundRaising.address?.city ||
                fundRaising.address?.state ||
                fundRaising.address?.country
              }`}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className=" font-bold">Funds Needed</Text>
            <Text className="">{`INR ${fundRaising.fundsRequired || 0}`}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className=" font-bold">Funds Raised</Text>
            <Text className="">{`INR ${
              fundRaising.transactions
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

export default FundRaisingDetailsCard;
