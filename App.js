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

import Toast from 'react-native-toast-message';
import useBottomSheetStore from './store/bottomSheetStore';
import SignupStack from './navigations/SignupStack';

const Stack = createNativeStackNavigator();

export default function App() {
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
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomSheetComponent />
      <Toast position="top" bottomOffset={20} visibilityTime={1000} />
    </GestureHandlerRootView>
  );
}
