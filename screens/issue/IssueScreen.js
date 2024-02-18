import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect } from 'react';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import IssueCard from '../../components/issue/IssueCard';
import useIssueStore from '../../store/issueStore';
import Header from '../../components/common/layout/Header';
import ScreenWrapper from '../../components/common/layout/ScreenWrapper';

const IssueScreen = () => {
  const { issues, getIssues } = useIssueStore((state) => state);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <ScreenWrapper>
      <StatusBar backgroundColor={COLORS.primary} />
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
          onPress={() => {}}
        >
          <MaterialCommunityIcons name="filter-variant" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView className="mb-8 mt-2">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default IssueScreen;
