import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Header = ({ navigation }) => {
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
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Ionicons name="search" size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
