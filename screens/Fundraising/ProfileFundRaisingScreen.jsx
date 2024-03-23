import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';
import { useControlStore } from '../../store/useControlStore';
import { useSearchStore } from '../../store/searchStore';
import FundRaisingCard from '../../components/fundRaising/FundRaisingCard';

const ProfileFundRaisingScreen = ({ defaultFundRaisings }) => {
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  const { searchedUser, setSearchedUser, searchedNgo, setSearchedNgo, role } =
    useSearchStore((state) => state);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 100) {
            setHomePostsScrolled(true);
          } else {
            setHomePostsScrolled(false);
          }
        }}
      >
        {role === 'USER' &&
          searchedUser?.fundRaisings?.length > 0 &&
          searchedUser?.fundRaisings.map((fundRaising) => (
            <FundRaisingCard key={fundRaising.id} fundRaising={fundRaising} />
          ))}

        {role === 'NGO' &&
          searchedNgo?.fundRaisings?.length > 0 &&
          searchedNgo?.fundRaisings.map((fundRaising) => (
            <FundRaisingCard key={fundRaising.id} fundRaising={fundRaising} />
          ))}

        <View
          style={{
            height: 100,
          }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default ProfileFundRaisingScreen;
