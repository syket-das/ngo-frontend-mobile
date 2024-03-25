import { View, Text, TextInput, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import StepIndicator from 'react-native-step-indicator';
import COLORS from '../../../constants/colors';
import { stepIndicatorStyles } from '../../../styles/stepIndicatorStyles';
import Button from '../../../components/Button';
import Toast from 'react-native-toast-message';
import useAuthStore from '../../../store/authStore';

const NgoStep1 = ({ navigation }) => {
  const { registerNgo } = useAuthStore((state) => state);

  const [data, setData] = useState({
    name: '',
    email: '',
    code: '',
    phone: '',
    isChecked: false,
    location: '',
  });

  const labels = ['Basic Info', 'Verify Email', 'Set Password'];

  const onNext = async () => {
    if (
      data.name &&
      data.email &&
      data.phone &&
      data.location &&
      data.isChecked
    ) {
      try {
        await registerNgo({
          name: data.name,
          email: data.email,
          phone: data.code + data.phone,
          address: {
            city: data.location,
          },

          type: 'social',
        });

        navigation.navigate('NgoStep2', {
          email: data.email,
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: error.message,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please fill all the fields',
        autoHide: true,
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
            Create NGO Account
          </Text>
        </View>

        <StepIndicator
          customStyles={stepIndicatorStyles}
          currentPosition={0}
          labels={labels}
          stepCount={3}
        />

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Name
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
              placeholder="Enter ngo name"
              placeholderTextColor={COLORS.black}
              keyboardType="name-phone-pad"
              style={{
                width: '100%',
              }}
              value={data.name}
              onChangeText={(text) => setData({ ...data, name: text })}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Email address
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
              placeholder="Enter ngo email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: '100%',
              }}
              value={data.email}
              onChangeText={(text) => setData({ ...data, email: text })}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Mobile Number
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="+91"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: '12%',
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: '100%',
              }}
              value={data.code}
              onChangeText={(text) => setData({ ...data, code: text })}
            />

            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: '80%',
              }}
              value={data.phone}
              onChangeText={(text) => setData({ ...data, phone: text })}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            Location
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 500,
              marginBottom: 8,
              color: COLORS.primary,
            }}
          >
            street address, city, state, country, pincode
          </Text>

          <View
            style={{
              width: '100%',
              // height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 22,
            }}
          >
            <TextInput
              multiline
              placeholderTextColor={COLORS.black}
              keyboardType="default"
              style={{
                width: '100%',
                height: 78,
              }}
              value={data.location}
              onChangeText={(text) => setData({ ...data, location: text })}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={data.isChecked}
            color={data.isChecked ? COLORS.primary : undefined}
            onValueChange={(value) => setData({ ...data, isChecked: value })}
          />

          <Text>I aggree to the terms and conditions</Text>
        </View>

        <View className="flex flex-row justify-between items-start mt-8">
          <Button
            disabled
            title="Back"
            style={{
              marginTop: 18,
              marginBottom: 4,
              minWidth: 150,
            }}
          />
          <Button
            onPress={onNext}
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
      <StatusBar
        backgroundColor={COLORS.white}
        animated
        barStyle={'dark-content'}
      />{' '}
    </SafeAreaView>
  );
};

export default NgoStep1;
