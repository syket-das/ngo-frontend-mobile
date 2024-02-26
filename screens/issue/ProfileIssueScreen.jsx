import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, { useEffect } from 'react';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import IssueCard from '../../components/issue/IssueCard';
import useIssueStore from '../../store/issueStore';
import ScreenWrapper from '../../components/common/layout/ScreenWrapper';
import { useSearchStore } from '../../store/searchStore';

const ProfileIssueScreen = () => {
  const { searchedUser, setSearchedUser, searchedNgo, setSearchedNgo, role } =
    useSearchStore((state) => state);

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} className="mb-8 mt-2">
        {role === 'USER' &&
          searchedUser?.createdIssues?.length > 0 &&
          searchedUser?.createdIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        {role === 'NGO' &&
          searchedNgo?.createdIssues?.length > 0 &&
          searchedNgo?.createdIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfileIssueScreen;
