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
import { useCampaignStore } from '../../store/campaignStore';
import Toast from 'react-native-toast-message';
import useAuthStore from '../../store/authStore';
import Checkbox from 'expo-checkbox';
import { TAGS } from '../../constants/data';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';

const data = [
  { key: '1', value: 'Mobiles', disabled: true },
  { key: '2', value: 'Appliances' },
  { key: '3', value: 'Cameras' },
  { key: '4', value: 'Computers', disabled: true },
  { key: '5', value: 'Vegetables' },
  { key: '6', value: 'Diary Products' },
  { key: '7', value: 'Drinks' },
];
const CreateCampaign = ({ navigation }) => {
  const { createCampaignByUser, createCampaignByNgo } = useCampaignStore(
    (state) => state
  );
  const [selected, setSelected] = React.useState([]);

  const [campaign, setCampaign] = React.useState({
    title: '',
    motto: '',
    startDate: '',
    endDate: '',
    fundsRequired: 0,
    description: '',
    virtual: false,
    tags: [],
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    },
    media: [],
  });

  useEffect(() => {
    setCampaign({ ...campaign, tags: selected });
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
        await createCampaignByUser(campaign);
      } else if (authType.role === 'NGO') {
        await createCampaignByNgo(campaign);
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
      setCampaign({ ...campaign, media: result.assets });
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
          {campaign.media.map((image, index) => (
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
                placeholder="Enter title of the campaign"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
                value={campaign.title}
                onChangeText={(val) => setCampaign({ ...campaign, title: val })}
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
              Motto
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
                placeholder="Enter motto of the campaign"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
                value={campaign.motto}
                onChangeText={(val) => setCampaign({ ...campaign, motto: val })}
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
                  value={campaign.startDate}
                  onChangeText={(val) =>
                    setCampaign({ ...campaign, startDate: val })
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
                  value={campaign.endDate}
                  onChangeText={(val) =>
                    setCampaign({ ...campaign, endDate: val })
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
              Funds Required
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
                value={String(campaign.fundsRequired)}
                onChangeText={(val) =>
                  setCampaign({ ...campaign, fundsRequired: Number(val) })
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
                placeholder="Enter description of the campaign"
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
                value={campaign.description}
                onChangeText={(val) =>
                  setCampaign({ ...campaign, description: val })
                }
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
                marginTop: 12,
              }}
            >
              <Checkbox
                value={campaign.virtual}
                onValueChange={(val) =>
                  setCampaign({ ...campaign, virtual: val })
                }
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  // marginVertical: 8,
                  marginLeft: 8,
                }}
              >
                Virtual Campaign
              </Text>
            </View>
          </View>

          <View
            style={{
              marginBottom: 12,
              display: campaign.virtual ? 'none' : 'flex',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Address
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
                placeholder="Sreet & Building Number"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
                value={campaign.address.street}
                onChangeText={(val) =>
                  setCampaign({
                    ...campaign,
                    address: { ...campaign.address, street: val },
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
                  value={campaign.address.city}
                  onChangeText={(val) =>
                    setCampaign({
                      ...campaign,
                      address: { ...campaign.address, city: val },
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
                  value={campaign.address.state}
                  onChangeText={(val) =>
                    setCampaign({
                      ...campaign,
                      address: { ...campaign.address, state: val },
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
                  value={campaign.address.country}
                  onChangeText={(val) =>
                    setCampaign({
                      ...campaign,
                      address: { ...campaign.address, country: val },
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
                  value={campaign.address.zipCode}
                  onChangeText={(val) =>
                    setCampaign({
                      ...campaign,
                      address: { ...campaign.address, zipCode: val },
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
          title="Create Campaign"
          color={COLORS.primary}
        />

        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};

export default CreateCampaign;
