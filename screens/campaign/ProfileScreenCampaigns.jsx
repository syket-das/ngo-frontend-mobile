import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { useControlStore } from '../../store/useControlStore';
import useAuthStore from '../../store/authStore';
import useUserStore from '../../store/userStore';
import useNgoStore from '../../store/ngoStore';
import SingleCampaign from '../../components/campaign/SingleCampaign';
import useModalStore from '../../store/modalStore';

const ProfileScreenCampaigns = ({ navigation }) => {
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

  useEffect(() => {
    if (authType.role === 'USER') {
      getProfile();
    }
  }, [authType.role]);

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
            data={profile?.createdCampaigns || []}
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
                    setModalContent(<SingleCampaign id={item.id} />);
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
            data={ngoProfile?.createdCampaigns || []}
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
                    setModalContent(<SingleCampaign id={item.id} />);
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

export default ProfileScreenCampaigns;
