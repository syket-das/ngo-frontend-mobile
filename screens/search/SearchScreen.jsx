import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import { FONTS } from '../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import { URL } from '../../constants/data';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
  const [checked, setChecked] = React.useState('user');

  const [searchQuery, setSearchQuery] = React.useState('');

  const [searchedUsers, setSearchedUsers] = React.useState([]);
  const [searchedNgos, setSearchedNgos] = React.useState([]);

  const fetchSearchedUsers = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/user/search?fullName=${searchQuery}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });
      setSearchedUsers(data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchSearchedNgos = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${URL}/api/v1/ngo/search?name=${searchQuery}`,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(await AsyncStorage.getItem('auth')).token
          }`,
        },
      });
      setSearchedNgos(data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const onSearch = async () => {
    if (searchQuery) {
      if (checked === 'user') {
        fetchSearchedUsers();
      } else if (checked === 'ngo') {
        fetchSearchedNgos();
      }
    }
  };

  useEffect(() => {
    setSearchedUsers([]);
    setSearchedNgos([]);
    onSearch();
  }, [searchQuery, checked]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 4,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <View className="ml-auto flex-1 ">
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      </View>
      <View className="  flex-row">
        <View className="justify-center flex-row items-center">
          <RadioButton
            color={COLORS.primary}
            uncheckedColor={COLORS.grey}
            value="user"
            status={checked === 'user' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('user')}
          />
          <Text>User</Text>
        </View>
        <View className="justify-center flex-row items-center">
          <RadioButton
            color={COLORS.primary}
            uncheckedColor={COLORS.grey}
            value="ngo"
            status={checked === 'ngo' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('ngo')}
          />
          <Text>Ngo</Text>
        </View>
      </View>

      <ScrollView showVerticalScrollIndicator={false} className="flex-1">
        {searchedUsers.map((user) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SearchProfile', {
                role: 'USER',
                user,
              })
            }
            key={user.id}
            style={{
              paddingVertical: 12,
            }}
            className="flex-row my-4"
          >
            <Image
              source={{
                uri:
                  user?.profileImage?.url ||
                  'https://i.ibb.co/W29btXp/profile.jpg',
              }}
              className="h-12 w-12 rounded-lg mr-2"
            />

            <View>
              <Text>{user.fullName}</Text>
              <Text>{user.email}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {searchedNgos.map((ngo) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SearchProfile', {
                role: 'NGO',
                ngo: ngo,
              })
            }
            key={ngo.id}
            style={{
              paddingVertical: 12,
            }}
            className="flex-row my-4"
          >
            <Image
              source={{
                uri:
                  ngo?.profileImage?.url ||
                  'https://i.ibb.co/W29btXp/profile.jpg',
              }}
              className="h-12 w-12 rounded-lg mr-2"
            />

            <View>
              <Text>{ngo.name}</Text>
              <Text>{ngo.email}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StatusBar
        backgroundColor={COLORS.white}
        animated
        barStyle={'dark-content'}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
