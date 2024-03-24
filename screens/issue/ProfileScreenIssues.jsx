import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  FlatList,
  VirtualizedList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { useControlStore } from '../../store/useControlStore';
import useAuthStore from '../../store/authStore';
import useUserStore from '../../store/userStore';
import useNgoStore from '../../store/ngoStore';
import useModalStore from '../../store/modalStore';
import SingleIssue from '../../components/issue/SingleIssue';

const ProfileScreenIssues = ({ navigation }) => {
  const { setVisible, setModalContent } = useModalStore((state) => state);

  const [refreshing, setRefreshing] = React.useState(false);
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  const { auth, authType, setAuthType } = useAuthStore((state) => state);
  const { profile, getProfile } = useUserStore((state) => state);

  const { profile: ngoProfile, getProfile: getNgoProfile } = useNgoStore(
    (state) => state
  );

  useEffect(() => {
    setAuthType();
  }, []);

  useEffect(() => {
    if (authType.role === 'USER') {
      getProfile();
    }

    if (authType.role === 'NGO') {
      getNgoProfile();
    }
  }, [authType.role]);

  useEffect(() => {
    setAuthType();
  }, []);

  return (
    <View
      showsVerticalScrollIndicator={false}
      className=" bg-white flex-row flex-wrap"
      onScroll={(e) => {
        if (e.nativeEvent.contentOffset.y > 100) {
          setHomePostsScrolled(true);
        } else {
          setHomePostsScrolled(false);
        }
      }}
    >
      <View style={{ flex: 1 }}>
        {authType.role === 'USER' ? (
          <FlatList
            data={profile?.createdIssues || []}
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
                    style={{ width: '100%', height: '100%', borderRadius: 12 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : authType.role === 'NGO' ? (
          <FlatList
            data={ngoProfile?.createdIssues || []}
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
                    style={{ width: '100%', height: '100%', borderRadius: 12 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : null}
      </View>

      <View
        style={{
          height: 100,
        }}
      ></View>
    </View>
  );
};

export default ProfileScreenIssues;
