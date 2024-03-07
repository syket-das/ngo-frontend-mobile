import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { Modal, Portal } from 'react-native-paper';

import { COLORS } from '../constants';
import ScreenWrapper from '../components/common/layout/ScreenWrapper';
import Header from '../components/common/layout/Header';
import HomeTopTabs from '../navigations/HomeTopTabs';
import { useControlStore } from '../store/useControlStore';
import { Ionicons } from '@expo/vector-icons';
const Home = ({ navigation }) => {
  const { homePostsScrolled, setHomePostsScrolled } = useControlStore(
    (state) => state
  );

  useEffect(() => {
    setHomePostsScrolled(false);
  }, []);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: Dimensions.get('window').height,
  };

  return (
    <ScreenWrapper>
      <StatusBar backgroundColor={COLORS.primary} />
      <View className="flex-row justify-between mt-4">
        <View>
          <View className="flex-row items-center">
            <Image
              source={require('../assets/transparent_logo.png')}
              className="h-8 w-[150px]"
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={26} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: !homePostsScrolled ? 'flex' : 'none',
          transition: 'all 1s ease-in',
        }}
      >
        <ScrollView
          className="mb-4 mt-2 gap-4 ml-2"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="items-center h-14 w-20 rounded-md bg-gray-200"
          >
            <Ionicons name="add-circle" size={40} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            className="items-center"
          >
            <Image
              source={require('../assets/images/cover.jpg')}
              className="w-20 h-14 rounded-md"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            className="items-center"
          >
            <Image
              source={require('../assets/images/cover.jpg')}
              className="w-20 h-14 rounded-md"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            className="items-center"
          >
            <Image
              source={require('../assets/images/cover.jpg')}
              className="w-20 h-14 rounded-md"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            className="items-center"
          >
            <Image
              source={require('../assets/images/cover.jpg')}
              className="w-20 h-14 rounded-md"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            className="items-center"
          >
            <Image
              source={require('../assets/images/cover.jpg')}
              className="w-20 h-14 rounded-md"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            className="items-center"
          >
            <Image
              source={require('../assets/images/cover.jpg')}
              className="w-20 h-14 rounded-md"
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <HomeTopTabs />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Image
            source={require('../assets/images/cover.jpg')}
            className="w-full h-96 rounded-md"
          />
        </Modal>
      </Portal>
    </ScreenWrapper>
  );
};

export default Home;
