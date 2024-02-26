import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import UserPublicProfile from '../profile/user/UserPublicProfile';
import NgoPublicProfile from '../profile/ngo/NgoPublicProfile';

const SearchProfile = ({ navigation, route }) => {
  if (route.params.role === 'USER') {
    return <UserPublicProfile user={route.params.user} />;
  } else if (route.params.role === 'NGO') {
    return <NgoPublicProfile ngo={route.params.ngo} />;
  } else {
    return (
      <View>
        <Text>SearchProfile</Text>
      </View>
    );
  }
};

export default SearchProfile;
