import { View, Text } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
const LocationComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}
    >
      <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>
        Get device location
      </Text>
    </View>
  );
};

export default LocationComponent;
