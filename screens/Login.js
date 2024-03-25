import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import Toast from 'react-native-toast-message';

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import useAuthStore from '../store/authStore';
import SvgView from '../components/SvgView';
import { svgs } from '../assets/svg/svgs';
import Button from '../components/Button';
const Login = ({ navigation }) => {
  const [methods, setMethods] = useState(['user', 'ngo', 'community']);
  const [slectedMethod, setSelectedMethod] = useState(methods[0]);

  const { auth, loginUser, authLoading, loginNgo } = useAuthStore(
    (state) => state
  );
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async ({ navigation }) => {
    if (formData.email == '' || formData.password == '') {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill all the fields',
      });

      return;
    }

    try {
      if (slectedMethod == 'user') {
        await loginUser(formData);
      } else if (slectedMethod == 'ngo') {
        await loginNgo(formData);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  useEffect(() => {
    if (auth) {
      navigation.navigate('BottomTabNavigation');
    }
  }, [auth, navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        position: 'relative',
      }}
    >
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
            Hi Welcome Back ! 👋
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
              fontWeight: 400,
            }}
          >
            Login to continue with your account
          </Text>
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
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              style={{
                width: '100%',
              }}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
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
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: '100%',
              }}
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
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

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>Remenber Me</Text>
        </View>

        <Button
          disabled={authLoading}
          onPress={handleLogin}
          title={` ${slectedMethod} Login`.toUpperCase()}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View className="">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
              marginTop: 'auto',
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
            <Text style={{ fontSize: 14 }}>Or Login As </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {methods.map((method) => (
              <TouchableOpacity
                key={method}
                onPress={() => setSelectedMethod(method)}
                style={{
                  marginHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor:
                    slectedMethod == method ? COLORS.primary : COLORS.grey,
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <SvgView
                  width={40}
                  height={40}
                  svgPath={
                    method == 'user'
                      ? svgs.user
                      : method == 'ngo'
                      ? svgs.ngo
                      : svgs.community
                  }
                />
                <Text
                  style={{
                    fontSize: 14,
                    color:
                      slectedMethod == method ? COLORS.primary : COLORS.grey,
                    fontWeight: 'bold',
                    marginTop: 6,
                  }}
                >
                  {method}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Don't have an account ?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  marginLeft: 6,
                }}
              >
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <StatusBar
        backgroundColor={COLORS.white}
        animated
        barStyle={'dark-content'}
      />
    </SafeAreaView>
  );
};

export default Login;
