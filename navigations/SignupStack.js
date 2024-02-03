import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpOptions from '../screens/signup/SignUpOptions';
import UserStep1 from '../screens/signup/user/UserStep1';
import UserStep2 from '../screens/signup/user/UserStep2';
import UserStep3 from '../screens/signup/user/UserStep3';
import NgoStep1 from '../screens/signup/ngo/NgoStep1';
import NgoStep2 from '../screens/signup/ngo/NgoStep2';
import NgoStep3 from '../screens/signup/ngo/NgoStep3';

const SignupStack = () => {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Signup-option" component={SignUpOptions} />
      <Stack.Screen name="UserStep1" component={UserStep1} />
      <Stack.Screen name="UserStep2" component={UserStep2} />
      <Stack.Screen name="UserStep3" component={UserStep3} />
      <Stack.Screen name="NgoStep1" component={NgoStep1} />
      <Stack.Screen name="NgoStep2" component={NgoStep2} />
      <Stack.Screen name="NgoStep3" component={NgoStep3} />
    </Stack.Navigator>
  );
};

export default SignupStack;
