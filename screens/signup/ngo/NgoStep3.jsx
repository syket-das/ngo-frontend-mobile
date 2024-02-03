import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepIndicator from 'react-native-step-indicator';
import COLORS from '../../../constants/colors';
import { stepIndicatorStyles } from '../../../styles/stepIndicatorStyles';
import Button from '../../../components/Button';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const UserStep3 = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',
  });

  const labels = ['Basic Info', 'Verify Email', 'Set Password'];

  const onNext = () => {
    if (data.password !== data.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'Password and Confirm Password do not match',
        position: 'top',
      });
      return;
    }

    navigation.navigate('NgoStep3');
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
          currentPosition={2}
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
            Password
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
              secureTextEntry={false}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              // keyboardType="visible-password"
              style={{
                width: '100%',
              }}
              value={data.password}
              onChangeText={(text) => setData({ ...data, password: text })}
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
            Confirm Password
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
              secureTextEntry={isPasswordShown ? false : true}
              placeholder="Re enter your password"
              placeholderTextColor={COLORS.black}
              // keyboardType="visible-password"
              style={{
                width: '100%',
              }}
              value={data.confirmPassword}
              onChangeText={(text) =>
                setData({ ...data, confirmPassword: text })
              }
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
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
            title="Finish"
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

export default UserStep3;
