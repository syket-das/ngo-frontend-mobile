import { View, Text, TextInput, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import StepIndicator from 'react-native-step-indicator';
import COLORS from '../../../constants/colors';
import { stepIndicatorStyles } from '../../../styles/stepIndicatorStyles';
import Button from '../../../components/Button';
import { OtpInput } from 'react-native-otp-entry';
import Toast from 'react-native-toast-message';
import useAuthStore from '../../../store/authStore';

const NgoStep2 = ({ route, navigation }) => {
  const { verifyNgoEmail, resendNgoOTP } = useAuthStore((state) => state);

  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(true);

  const labels = ['Basic Info', 'Verify Email', 'Set Password'];

  const onNext = async () => {
    if (!otp) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter the OTP',
        position: 'top',
      });
      return;
    }

    try {
      await verifyNgoEmail({
        email: route.params.email,
        otp,
      });

      navigation.navigate('NgoStep3', {
        email: route.params.email,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        position: 'top',
      });
    }
  };
  const onBack = () => {
    navigation.navigate('NgoStep1');
  };

  const resendOtp = async () => {
    try {
      await resendNgoOTP({
        email: route.params.email,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'OTP sent successfully',
        position: 'top',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        position: 'top',
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Create Ngo Account
          </Text>
        </View>

        <StepIndicator
          customStyles={stepIndicatorStyles}
          currentPosition={1}
          labels={labels}
          stepCount={3}
        />

        <View className="my-8">
          <OtpInput
            numberOfDigits={6}
            focusColor="green"
            focusStickBlinkingDuration={500}
            onFilled={(text) => setOtp(text)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
          }}
        >
          <Text>
            Didn't receive the OTP?{' '}
            <Text
              onPress={resendOtp}
              style={{
                color: COLORS.primary,
                fontWeight: 'bold',
              }}
            >
              Resend OTP
            </Text>
          </Text>
        </View>

        <View className="flex flex-row justify-between items-start mt-8">
          <Button
            onPress={onBack}
            title="Back"
            style={{
              marginTop: 18,
              marginBottom: 4,
              minWidth: 150,
            }}
          />
          <Button
            onPress={onNext}
            disabled={!verified}
            title="Next"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
              minWidth: 150,
            }}
          />
        </View>
      </View>
      <StatusBar backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default NgoStep2;
