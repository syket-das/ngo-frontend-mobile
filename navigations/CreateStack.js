import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateIssue from '../screens/create/CreateIssue';
import CreatePost from '../screens/create/CreatePost';
import CreateFundRaiser from '../screens/create/CreateFundRaiser';
import CreateCampaign from '../screens/create/CreateCampaign';
import Create from '../screens/create/Create';

const CreateStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Options"
    >
      <Stack.Screen name="Options" component={Create} />
      <Stack.Screen name="CreateIssue" component={CreateIssue} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="CreateFundRaiser" component={CreateFundRaiser} />
      <Stack.Screen name="CreateCampaign" component={CreateCampaign} />
    </Stack.Navigator>
  );
};

export default CreateStack;
