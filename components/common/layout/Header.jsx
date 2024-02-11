import { View, Text, Image } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View className="flex-row justify-between mt-4">
      <View>
        <View className="flex-row items-center">
          <Image
            source={require('../../../assets/transparent_logo.png')}
            className="h-8 w-[150px]"
          />
        </View>
      </View>
      <MaterialCommunityIcons name="bell-outline" size={30} />
    </View>
  );
};

export default Header;
