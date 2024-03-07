import { View, Text, ScrollView, RefreshControl, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useControlStore } from '../../store/useControlStore';
import { useCampaignStore } from '../../store/campaignStore';
import CampaignCard from '../../components/campaign/CampaignCard';

const CampaignScreen = ({ defaultCampaigns }) => {
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const { campaigns, getCampaigns } = useCampaignStore((state) => state);

  useEffect(() => {
    getCampaigns();
    setHomePostsScrolled(false);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <FlatList
        refreshControl={
          <RefreshControl
            title="Pull to refresh"
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getCampaigns();
              setRefreshing(false);
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 100) {
            setHomePostsScrolled(true);
          } else {
            setHomePostsScrolled(false);
          }
        }}
        data={defaultCampaigns ? defaultCampaigns : campaigns}
        renderItem={({ item }) => <CampaignCard campaign={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <View
            style={{
              height: 100,
            }}
          >
            <Text style={{ textAlign: 'center' }}>No more campaigns</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

export default CampaignScreen;
