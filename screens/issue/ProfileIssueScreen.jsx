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

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import IssueCard from '../../components/issue/IssueCard';
import useIssueStore from '../../store/issueStore';
import ScreenWrapper from '../../components/common/layout/ScreenWrapper';
import { useSearchStore } from '../../store/searchStore';
import SingleIssue from '../../components/issue/SingleIssue';
import useModalStore from '../../store/modalStore';

const ProfileIssueScreen = () => {
  const { setVisible, setModalContent } = useModalStore((state) => state);

  const { searchedUser, setSearchedUser, searchedNgo, setSearchedNgo, role } =
    useSearchStore((state) => state);

  return (
    <View className="mb-8 mt-2">
      <View>
        {role === 'USER' ? (
          <FlatList
            data={searchedUser?.createdIssues || []}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  aspectRatio: 1,
                  margin: 3,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                    setModalContent(<SingleIssue id={item.id} />);
                  }}
                >
                  <Image
                    key={index}
                    source={{
                      uri:
                        item?.media[0]?.url || 'https://picsum.photos/200/300',
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 12,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : role === 'NGO' ? (
          <FlatList
            data={searchedNgo?.createdIssues || []}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  aspectRatio: 1,
                  margin: 3,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                    setModalContent(<SingleIssue id={item.id} />);
                  }}
                >
                  <Image
                    key={index}
                    source={{
                      uri:
                        item?.media[0]?.url || 'https://picsum.photos/200/300',
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 12,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : null}
      </View>
    </View>
  );
};

export default ProfileIssueScreen;
