import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, { useEffect } from 'react';
import { Chip } from 'react-native-paper';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import IssueCard from '../../components/issue/IssueCard';
import useIssueStore from '../../store/issueStore';
import Header from '../../components/common/layout/Header';
import ScreenWrapper from '../../components/common/layout/ScreenWrapper';

const IssueScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { issues, getIssues } = useIssueStore((state) => state);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterVisible, setFilterVisible] = React.useState(false);

  useEffect(() => {
    getIssues();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      getIssues(searchQuery);
    }
  }, [searchQuery]);

  return (
    <ScreenWrapper>
      <Header />
      <View className="mt-4 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold">Issues</Text>
          <Text className="text-gray-500">
            {issues.length} issues found in total
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center my-4 ">
        <TextInput
          placeholder="Search for issues"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          className="border-2 border-gray-300 rounded-lg  px-4 py-1 flex-1"
        />
        <TouchableOpacity
          className="bg-primary rounded-lg px-4 py-2 ml-2"
          style={{ backgroundColor: COLORS.secondaryGray }}
          onPress={() => {
            setFilterVisible(!filterVisible);
          }}
        >
          <MaterialCommunityIcons name="filter-variant" size={24} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: filterVisible ? 'flex' : 'none',
        }}
        className="flex flex-row gap-x-2"
      >
        <Chip
          mode="outlined"
          // icon="information"
          onPress={() => console.log('Pressed')}
        >
          Newest
        </Chip>
        <Chip
          mode="outlined"
          // icon="information"
          onPress={() => console.log('Pressed')}
        >
          Nearby
        </Chip>
        <Chip
          mode="outlined"
          // icon="information"
          onPress={() => console.log('Pressed')}
        >
          Popular
        </Chip>
        <Chip
          mode="outlined"
          // icon="information"
          onPress={() => console.log('Pressed')}
        >
          Need Help
        </Chip>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            title="Pull to refresh"
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getIssues();
              setRefreshing(false);
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        data={issues}
        renderItem={({ item }) => <IssueCard issue={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <View
            style={{
              height: 100,
            }}
          >
            <Text style={{ textAlign: 'center' }}>No more issues</Text>
          </View>
        )}
      />
      <StatusBar
        backgroundColor={COLORS.white}
        animated
        barStyle={'dark-content'}
      />
    </ScreenWrapper>
  );
};

export default IssueScreen;
