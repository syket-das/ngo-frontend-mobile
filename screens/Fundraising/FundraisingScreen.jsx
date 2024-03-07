import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const FundraisingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      {/* Under Constraction */}
      <Ionicons name="construct-outline" size={24} color="black" />
      <Text>Under Construction</Text>
    </View>
  );
};

export default FundraisingScreen;
