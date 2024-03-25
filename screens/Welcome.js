import { View, Text, Pressable, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../constants/data';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Welcome = ({ navigation }) => {
  const isFocused = useIsFocused();

  const checkToken = async () => {
    const authToken = await AsyncStorage.getItem('auth');

    if (authToken) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${URL}/api/v1/auth/check-token`,
          headers: {
            Authorization: `Bearer ${JSON.parse(authToken)?.token}`,
          },
        });

        if (data.success) {
          navigation.navigate('BottomTabNavigation');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      checkToken();
    }
  }, [isFocused, navigation]);

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.white, COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        <View>
          <LottieView
            className="w-full h-full"
            autoPlay
            style={{ width: '100%', height: 350 }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require('../assets/lottie/welcome.json')}
          />
        </View>

        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            bottom: 30,
            width: '100%',
            marginTop: 'auto',
          }}
        >
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Society your
          </Text>
          <Text
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: COLORS.white,
            }}
          >
            Planet
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                marginVertical: 4,
              }}
            >
              Join the community of contributors
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Together we can do more
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 22, marginBottom: 15 }}>
          <Button
            onPress={() => navigation.navigate('Signup')}
            title="Join Now"
            style={{
              marginTop: 22,
              width: '100%',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
              }}
            >
              Already have an account ?
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  marginLeft: 4,
                }}
              >
                Login
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
    </LinearGradient>
  );
};

export default Welcome;
