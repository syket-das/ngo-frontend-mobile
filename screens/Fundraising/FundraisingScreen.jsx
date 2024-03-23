import { View, Text, ScrollView, RefreshControl, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useControlStore } from '../../store/useControlStore';
import { useFundRaisingStore } from '../../store/fundRaisingStore';
import FundRaisingCard from '../../components/fundRaising/FundRaisingCard';

const FundRaisingScreen = ({ defaultFundRaisings }) => {
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const { fundRaisings, getFundRaisings } = useFundRaisingStore(
    (state) => state
  );

  useEffect(() => {
    getFundRaisings();
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
              getFundRaisings();
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
        data={defaultFundRaisings ? defaultFundRaisings : fundRaisings}
        renderItem={({ item }) => <FundRaisingCard fundRaising={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <View
            style={{
              height: 100,
            }}
          >
            <Text style={{ textAlign: 'center' }}>No more Fund Raisings</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

export default FundRaisingScreen;
