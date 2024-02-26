import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';
import { useControlStore } from '../../store/useControlStore';
import { useCampaignStore } from '../../store/campaignStore';
import CampaignCard from '../../components/campaign/CampaignCard';
import { useSearchStore } from '../../store/searchStore';

const ProfileCampaignScreen = ({ defaultCampaigns }) => {
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
          searchedUser?.createdCampaigns?.length > 0 &&
          searchedUser?.createdCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}

        {role === 'NGO' &&
          searchedNgo?.createdCampaigns?.length > 0 &&
          searchedNgo?.createdCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
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

export default ProfileCampaignScreen;
