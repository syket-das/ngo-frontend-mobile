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
import usePostStore from '../../store/postStore';
import { useNavigation } from '@react-navigation/native';
import { useControlStore } from '../../store/useControlStore';
import { useSearchStore } from '../../store/searchStore';
import useAuthStore from '../../store/authStore';
import useUserStore from '../../store/userStore';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import useNgoStore from '../../store/ngoStore';
import useBottomSheetStore from '../../store/bottomSheetStore';
import useModalStore from '../../store/modalStore';
import SinglePost from '../../components/post/SinglePost';

const ProfileScreenPosts = ({ navigation }) => {
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
            data={profile?.createdPosts || []}
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
                    setModalContent(<SinglePost id={item.id} />);
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
            data={ngoProfile?.createdPosts || []}
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
                    setModalContent(<SinglePost id={item.id} />);
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

export default ProfileScreenPosts;
