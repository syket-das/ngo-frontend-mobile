import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from './navigations/BottomTabNav';
import EditProfile from './screens/EditProfile';
import { useFonts } from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Login, Profile, Signup, Welcome } from './screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetComponent from './components/BottomSheetComponent';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import useBottomSheetStore from './store/bottomSheetStore';
import SignupStack from './navigations/SignupStack';
import EditUserProfile from './screens/profile/user/EditUserProfile';
import EditNgoProfile from './screens/profile/ngo/EditNgoProfile';
import useAuthStore from './store/authStore';
import SearchScreen from './screens/search/SearchScreen';
import SearchProfile from './screens/search/SearchProfile';
import Providers from './components/Providers';
import * as Updates from 'expo-updates';
import * as Location from 'expo-location';
import useModalStore from './store/modalStore';
import { Modal, Portal } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import UserProfile from './screens/profile/user/UserProfile';
import NgoProfile from './screens/profile/ngo/NgoProfile';
import COLORS from './constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    // You can also add an alert() to see the error message in case of an error when fetching updates.
    alert(`Error fetching latest Expo update: ${error}`);
  }
}
const containerStyle = {
  backgroundColor: 'white',
  padding: 20,

  height: '100%',
  width: `100%`,
  alignSelf: 'center',
};

export default function App() {
  const { authType, setAuthType } = useAuthStore((state) => state);
  const { visible, hideModal, modalContent, setModalContent } = useModalStore(
    (state) => state
  );

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  useEffect(() => {
    async function getAuthType() {
      try {
        await setAuthType();
      } catch (error) {
        console.log(error);
      }
    }

    getAuthType();
  }, []);

  const { bottomSheetRef, setBottomSheetRef } = useBottomSheetStore(
    (state) => state
  );
  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Inter-Black.ttf'),
    bold: require('./assets/fonts/Inter-Bold.ttf'),
    medium: require('./assets/fonts/Inter-Medium.ttf'),
    regular: require('./assets/fonts/Inter-Regular.ttf'),
    semiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Providers>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer
            onStateChange={() => {
              if (bottomSheetRef?.current) {
                bottomSheetRef?.current.close();
              }
            }}
          >
            <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupStack}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="BottomTabNavigation"
                component={BottomTabNav}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="Profile"
                component={
                  authType && authType?.role === 'USER'
                    ? UserProfile
                    : authType?.role === 'NGO'
                    ? NgoProfile
                    : Profile
                }
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="EditProfile"
                component={
                  authType && authType?.role === 'USER'
                    ? EditUserProfile
                    : authType?.role === 'NGO'
                    ? EditNgoProfile
                    : EditProfile
                }
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="SearchProfile"
                component={SearchProfile}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <BottomSheetComponent />
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <View className="flex-1">
                <View className="flex-row justify-between items-center   ">
                  <TouchableOpacity
                    className="bg-primary  p-2 rounded-full"
                    style={{ backgroundColor: COLORS.grey }}
                    onPress={() => {
                      hideModal();
                    }}
                  >
                    <MaterialIcons
                      style={{
                        color: COLORS.white,
                      }}
                      name="arrow-back"
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
                {modalContent}
              </View>
            </Modal>
          </Portal>
          <Toast
            position="top"
            bottomOffset={20}
            visibilityTime={1000}
            autoHide={true}
          />
        </GestureHandlerRootView>
      </Providers>
    </PaperProvider>
  );
}
