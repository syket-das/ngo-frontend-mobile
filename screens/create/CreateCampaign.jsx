import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants';
import { useCampaignStore } from '../../store/campaignStore';
import Toast from 'react-native-toast-message';

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
  const { createCampaignByUser } = useCampaignStore((state) => state);
  const [campaign, setCampaign] = React.useState({
    title: '',
    motto: '',
    startDate: '',
    endDate: '',
    fundsRequired: 0,
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    },
  });

  const handleSubmit = async () => {
    try {
      await createCampaignByUser(campaign);

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

  function convertToISODate(dateString) {
    // Create a new Date object using the input string
    var date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    } else {
      // Use the toISOString method to convert the date to ISO format
      return date.toISOString();
    }
  }

  function convertToStringDate(isoDate) {
    // Create a new Date object from the ISO date string
    var date = new Date(isoDate);

    // Extract the components of the date
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    var day = String(date.getDate()).padStart(2, '0');

    // Construct the stringDate in the desired format
    var stringDate = year + '-' + month + '-' + day;

    return stringDate;
  }

  return (
    <View>
      <ScrollView className="mx-4 my-2" showsVerticalScrollIndicator={false}>
        <TouchableOpacity className="mt-4 border h-56 w-full border-dashed border-gray-600 items-center justify-center">
          <Ionicons name="image-outline" size={48} color="black" />
        </TouchableOpacity>

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

          {/* <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Description
            </Text>

            <MultipleSelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              onSelect={() => alert(selected)}
              label="Categories"
            />
          </View> */}
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
