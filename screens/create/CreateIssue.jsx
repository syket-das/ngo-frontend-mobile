import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import useIssueStore from '../../store/issueStore';
import Toast from 'react-native-toast-message';
import useAuthStore from '../../store/authStore';
import { TAGS } from '../../constants/data';
import * as ImagePicker from 'expo-image-picker';
import useLocation from '../../hooks/useLocation';

const CreateIssue = ({ navigation }) => {
  const { location, errorMsg, fetchLocation } = useLocation();

  const { createIssueByUser, createIssueByNgo } = useIssueStore(
    (state) => state
  );

  const [selected, setSelected] = React.useState([]);

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

  const [issue, setIssue] = React.useState({
    title: '',
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
    setIssue({ ...issue, tags: selected });
  }, [selected]);

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
      setIssue({
        ...issue,
        address: {
          ...issue.address,
          lat: location.latitude,
          lng: location.longitude,
        },
      });
    }
  }, [errorMsg, location]);

  const tags = TAGS.filter((tag) => tag.issue).map((tag) => {
    return { key: tag.value, value: tag.value };
  });

  const handleImageSelection = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setIssue({ ...issue, media: result.assets });
    }
  };

  const handleSubmit = async () => {
    try {
      if (authType.role === 'USER') {
        await createIssueByUser(issue);
      } else if (authType.role === 'NGO') {
        await createIssueByNgo(issue);
      }

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Issue created successfully',
        visibilityTime: 2000,
        autoHide: true,
      });

      navigation.navigate('Issue');
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
          {issue.media.map((image, index) => (
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
                placeholder="Enter title of the issue"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
                value={issue.title}
                onChangeText={(text) => setIssue({ ...issue, title: text })}
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
                placeholder="Enter description of the issue"
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
                value={issue.description}
                onChangeText={(text) =>
                  setIssue({ ...issue, description: text })
                }
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
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
                    setIssue({
                      ...issue,
                      address: {
                        ...issue.address,
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
                  {issue.address.lat && issue.address.lng
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
                value={issue.address.street}
                onChangeText={(text) =>
                  setIssue({
                    ...issue,
                    address: { ...issue.address, street: text },
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
                  value={issue.address.city}
                  onChangeText={(text) =>
                    setIssue({
                      ...issue,
                      address: { ...issue.address, city: text },
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
                  value={issue.address.state}
                  onChangeText={(text) =>
                    setIssue({
                      ...issue,
                      address: { ...issue.address, state: text },
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
                  value={issue.address.country}
                  onChangeText={(text) =>
                    setIssue({
                      ...issue,
                      address: { ...issue.address, country: text },
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
                  keyboardType="default"
                  style={{
                    width: '100%',
                  }}
                  value={issue.address.zipCode}
                  onChangeText={(text) =>
                    setIssue({
                      ...issue,
                      address: { ...issue.address, zipCode: text },
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
          title="Create Issue"
          color={COLORS.primary}
        />

        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};

export default CreateIssue;
