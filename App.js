import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNav from './navigations/BottomTabNav';
import EditProfile from './screens/EditProfile';
import { useFonts } from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Login, Signup, Welcome } from './screens';
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
import NgoPublicProfile from './screens/profile/ngo/NgoPublicProfile';
import UserPublicProfile from './screens/profile/user/UserPublicProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  const { authType, setAuthType } = useAuthStore((state) => state);

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
              name="Search"
              component={SearchScreen}
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
        <Toast position="top" bottomOffset={20} visibilityTime={1000} />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
