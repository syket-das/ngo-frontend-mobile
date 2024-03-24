import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import usePostStore from '../../store/postStore';
import { useControlStore } from '../../store/useControlStore';
import { useSearchStore } from '../../store/searchStore';
import SinglePost from '../../components/post/SinglePost';
import useModalStore from '../../store/modalStore';

const ProfilePostScreen = ({}) => {
  const { setVisible, setModalContent } = useModalStore((state) => state);

  const [refreshing, setRefreshing] = React.useState(false);
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  const { searchedUser, setSearchedUser, searchedNgo, setSearchedNgo, role } =
    useSearchStore((state) => state);

  return (
    <View className="flex-1 px-2 bg-white">
      <View style={{ flex: 1 }}>
        {role === 'USER' ? (
          <FlatList
            data={searchedUser?.createdPosts || []}
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
        ) : role === 'NGO' ? (
          <FlatList
            data={searchedNgo?.createdPosts || []}
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

export default ProfilePostScreen;
