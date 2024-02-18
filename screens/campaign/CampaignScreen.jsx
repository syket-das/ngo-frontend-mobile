import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useControlStore } from '../../store/useControlStore';
import { useCampaignStore } from '../../store/campaignStore';
import CampaignCard from '../../components/campaign/CampaignCard';

const CampaignScreen = () => {
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  const { campaigns, getCampaigns, joinOrLeaveCampaignByUser } =
    useCampaignStore((state) => state);

  useEffect(() => {
    getCampaigns();
    setHomePostsScrolled(false);
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={(e) => {
        if (e.nativeEvent.contentOffset.y > 100) {
          setHomePostsScrolled(true);
        } else {
          setHomePostsScrolled(false);
        }
      }}
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </ScrollView>
  );
};

export default CampaignScreen;
