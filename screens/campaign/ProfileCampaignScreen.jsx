import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { useControlStore } from '../../store/useControlStore';
import { useCampaignStore } from '../../store/campaignStore';
import CampaignCard from '../../components/campaign/CampaignCard';
import { useSearchStore } from '../../store/searchStore';
import useModalStore from '../../store/modalStore';
import SingleCampaign from '../../components/campaign/SingleCampaign';

const ProfileCampaignScreen = ({}) => {
  const { setVisible, setModalContent } = useModalStore((state) => state);

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
      <View style={{ flex: 1 }}>
        {role === 'USER' ? (
          <FlatList
            data={searchedUser?.createdCampaigns || []}
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
        ) : role === 'NGO' ? (
          <FlatList
            data={searchedNgo?.createdCampaigns || []}
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
    </View>
  );
};

export default ProfileCampaignScreen;
