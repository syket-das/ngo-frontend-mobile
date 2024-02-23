import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  StatusBar,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import Button from '../../components/Button';
import SvgView from '../../components/SvgView';
import { svgs } from '../../assets/svg/svgs';
import Toast from 'react-native-toast-message';

const SignUpOptions = ({ navigation }) => {
  const [selected, setSelected] = useState(null);

  const onNext = () => {
    if (selected === '0') {
      navigation.navigate('UserStep1');
    } else if (selected === '1') {
      navigation.navigate('NgoStep1');
    } else if (selected === '2') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Coming Soon',
        text2: 'This feature is not available yet',
        visibilityTime: 4000,
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
            Create Account
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Connect with social workers and help the community
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setSelected('0')}
          className={`border ${
            selected === '0' ? 'border-green-500 border-2' : ''
          }  h-[15%] rounded-xl mb-4 flex-row items-center justify-start p-2`}
        >
          <SvgView svgPath={svgs.user} height="80" width="80" />
          <View className="justify-center flex-1 flex-row">
            <Text className="text-lg font-bold ml-4"> User</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected('1')}
          className={`border ${
            selected === '1' ? 'border-green-500 border-2' : ''
          }  h-[15%] rounded-xl mb-4 flex-row items-center justify-start p-2`}
        >
          <SvgView svgPath={svgs.ngo} height="80" width="80" />
          <View className="justify-center flex-1 flex-row">
            <Text className="text-lg font-bold ml-4">
              Non Profit Organization
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected('2')}
          className={`border ${
            selected === '2' ? 'border-green-500 border-2' : ''
          }  h-[15%] rounded-xl mb-4 flex-row items-center justify-start p-2`}
        >
          <SvgView svgPath={svgs.community} height="80" width="80" />
          <View className="justify-center flex-1 flex-row">
            <Text className="text-lg font-bold ml-4"> Community & Society</Text>
          </View>
        </TouchableOpacity>
        <Button
          disabled={selected === null ? true : false}
          title="Next"
          onPress={onNext}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
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
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Already have an account
          </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
      <StatusBar backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default SignUpOptions;
