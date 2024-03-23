import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Modal,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants';
import Toast from 'react-native-toast-message';
import useAuthStore from '../../store/authStore';
import Checkbox from 'expo-checkbox';
import { TAGS } from '../../constants/data';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import useLocation from '../../hooks/useLocation';
import { useFundRaisingStore } from '../../store/fundRaisingStore';

const CreateFundRaiser = ({ navigation }) => {
  const { location, errorMsg, fetchLocation } = useLocation();

  const { createFundRaisingByUser, createFundRaisingByNgo } =
    useFundRaisingStore((state) => state);
  const [selected, setSelected] = React.useState([]);

  const [fundRaising, setFundRaising] = React.useState({
    title: '',
    startDate: '',
    endDate: '',
    amount: 0,
    description: '',
    tags: [],
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      lat: '',
      lng: '',
    },
    media: [],
  });

  useEffect(() => {
    if (errorMsg) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: errorMsg,
        visibilityTime: 2000,
        autoHide: true,
      });
    }

    if (location) {
      setFundRaising({
        ...fundRaising,
        address: {
          ...fundRaising.address,
          lat: location.latitude,
          lng: location.longitude,
        },
      });
    }
  }, [errorMsg, location]);

  useEffect(() => {
    setFundRaising({ ...fundRaising, tags: selected });
  }, [selected]);

  const tags = TAGS.filter((tag) => tag.campaign).map((tag) => {
    return { key: tag.value, value: tag.value };
  });

  const { authType, setAuthType } = useAuthStore((state) => state);

  useEffect(() => {
    const fetchAuthType = async () => {
      try {
        await setAuthType();
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchAuthType();
  }, []);

  const handleSubmit = async () => {
    try {
      if (authType.role === 'USER') {
        await createFundRaisingByUser(fundRaising);
      } else if (authType.role === 'NGO') {
        await createFundRaisingByNgo(fundRaising);
      }

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Issue created successfully',
        visibilityTime: 2000,
        autoHide: true,
      });

      navigation.navigate('Home');
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.message,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleImageSelection = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFundRaising({ ...fundRaising, media: result.assets });
    }
  };

  return (
    <View>
      <ScrollView className="mx-4 my-2" showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={handleImageSelection}
          className="mt-4 border h-56 w-full border-dashed border-gray-600 items-center justify-center"
        >
          <Ionicons name="image-outline" size={48} color="black" />
        </TouchableOpacity>
        <ScrollView horizontal className=" gap-2 mt-2">
          {fundRaising.media.map((image, index) => (
            <View
              key={index}
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{
                  uri: image.uri,
                }}
              />
            </View>
          ))}
        </ScrollView>

        <View className="my-4">
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Title
            </Text>

            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter title of the Fund Raising"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
                value={fundRaising.title}
                onChangeText={(val) =>
                  setFundRaising({ ...fundRaising, title: val })
                }
              />
            </View>
          </View>

          <View
            style={{ marginBottom: 12 }}
            className="flex-row justify-between items-center gap-x-2"
          >
            <View
              style={{
                flexDirection: 'column',
                marginBottom: 6,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                Start Date
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="eg. 2024-02-23"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: '100%',
                  }}
                  value={fundRaising.startDate}
                  onChangeText={(val) =>
                    setFundRaising({ ...fundRaising, startDate: val })
                  }
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginBottom: 6,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                End Date
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="eg. 2024-02-23"
                  placeholderTextColor={COLORS.grey}
                  keyboardType="default"
                  style={{
                    width: '100%',
                  }}
                  value={fundRaising.endDate}
                  onChangeText={(val) =>
                    setFundRaising({ ...fundRaising, endDate: val })
                  }
                />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Amount Required
            </Text>

            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="eg. 100000"
                placeholderTextColor={COLORS.secondary}
                keyboardType="number-pad"
                type="number"
                style={{
                  width: '100%',
                }}
                value={String(fundRaising.amount)}
                onChangeText={(val) =>
                  setFundRaising({ ...fundRaising, amount: Number(val) })
                }
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Description
            </Text>

            <View
              style={{
                width: '100%',
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter description of the fund raising"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                  minHeight: 200,
                  maxHeight: 250,
                  textAlignVertical: 'top',
                  paddingTop: 12,
                }}
                multiline
                value={fundRaising.description}
                onChangeText={(val) =>
                  setFundRaising({ ...fundRaising, description: val })
                }
              />
            </View>
          </View>

          <View
            style={{
              marginBottom: 12,
            }}
          >
            <View className="flex-row gap-x-2 my-2">
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                }}
              >
                Address
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await fetchLocation();

                  if (location) {
                    setFundRaising({
                      ...fundRaising,
                      address: {
                        ...fundRaising.address,
                        lat: location.latitude,
                        lng: location.longitude,
                      },
                    });
                  }
                }}
                className="flex-row items-center gap-x-1"
              >
                <Text
                  style={{
                    color: COLORS.primary,
                  }}
                >
                  {fundRaising.address.lat && fundRaising.address.lng
                    ? 'Geo Tag Added'
                    : 'Add Geo Tag'}
                </Text>
                <Ionicons name="locate" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Sreet & Building Number"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
                value={fundRaising.address.street}
                onChangeText={(val) =>
                  setFundRaising({
                    ...fundRaising,
                    address: { ...fundRaising.address, street: val },
                  })
                }
              />
            </View>
            <View className="flex-row gap-x-1 mt-2">
              <View
                style={{
                  // width: '100%',
                  flex: 1,
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="City"
                  placeholderTextColor={COLORS.black}
                  keyboardType="default"
                  style={{
                    width: '100%',
                  }}
                  value={fundRaising.address.city}
                  onChangeText={(val) =>
                    setFundRaising({
                      ...fundRaising,
                      address: { ...fundRaising.address, city: val },
                    })
                  }
                />
              </View>
              <View
                style={{
                  // width: '100%',
                  flex: 1,
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="State"
                  placeholderTextColor={COLORS.black}
                  keyboardType="default"
                  style={{
                    width: '100%',
                  }}
                  value={fundRaising.address.state}
                  onChangeText={(val) =>
                    setFundRaising({
                      ...fundRaising,
                      address: { ...fundRaising.address, state: val },
                    })
                  }
                />
              </View>
            </View>
            <View className="flex-row gap-x-1 mt-2">
              <View
                style={{
                  // width: '100%',
                  flex: 1,
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="Country"
                  placeholderTextColor={COLORS.black}
                  keyboardType="default"
                  style={{
                    width: '100%',
                  }}
                  value={fundRaising.address.country}
                  onChangeText={(val) =>
                    setFundRaising({
                      ...fundRaising,
                      address: { ...fundRaising.address, country: val },
                    })
                  }
                />
              </View>
              <View
                style={{
                  // width: '100%',
                  flex: 1,
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="Zip Code"
                  placeholderTextColor={COLORS.black}
                  keyboardType="number-pad"
                  type="number"
                  style={{
                    width: '100%',
                  }}
                  value={fundRaising.address.zipCode}
                  onChangeText={(val) =>
                    setFundRaising({
                      ...fundRaising,
                      address: { ...fundRaising.address, zipCode: val },
                    })
                  }
                />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Tags *
            </Text>

            <MultipleSelectList
              setSelected={(val) => setSelected(val)}
              data={tags}
              save="value"
              label="Tags"
              selected={selected}
            />
          </View>
        </View>

        <Button
          onPress={handleSubmit}
          title="Raise Fund"
          color={COLORS.primary}
        />

        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};

export default CreateFundRaiser;
