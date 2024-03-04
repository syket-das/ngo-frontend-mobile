import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, FONTS } from '../../../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { imagesDataURL } from '../../../constants/data';
import Toast from 'react-native-toast-message';
import useUserStore from '../../../store/userStore';

const EditUserProfile = ({ navigation }) => {
  const { profile, getProfile, updateProfile, updateProfileImage } =
    useUserStore((state) => state);

  const [profileData, setProfileData] = useState({
    profileImage: '',

    fullName: '',

    bio: '',
    profession: '',
    interests: [],
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    },
  });

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setProfileData({
        profileImage: profile?.profileImage?.url || '',
        fullName: profile.fullName || '',
        bio: profile?.bio || '',
        profession: profile?.profession || '',
        interests: profile?.interests || [],
        email: profile.email || '',
        address: {
          street: profile?.address?.street || '',
          city: profile?.address?.city || '',
          state: profile?.address?.state || '',
          country: profile?.address?.country || '',
          zipCode: profile?.address?.zipCode || '',
        },
      });
    }
  }, [profile]);

  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    const formData = new FormData();
    formData.append('media', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });

    await updateProfileImage(formData);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSaveChange = async () => {
    try {
      await updateProfile({
        fullName: profileData.fullName,
        email: profileData.email,
        bio: profileData.bio,
        profession: profileData.profession,
        interests: profileData.interests,
        address: profileData.address,
      });

      await getProfile();

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile updated successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

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
          marginHorizontal: 12,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: 20,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: profileData?.profileImage || selectedImage }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.primary,
              }}
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Full Name</Text>
            <View
              style={{
                height: 44,
                width: '100%',
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={profileData?.fullName}
                onChangeText={(value) =>
                  setProfileData({ ...profileData, fullName: value })
                }
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Email</Text>
            <View
              style={{
                height: 44,
                width: '100%',
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={profileData?.email}
                onChangeText={(value) =>
                  setProfileData({ ...profileData, email: value })
                }
                editable={true}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Profession</Text>
            <View
              style={{
                height: 44,
                width: '100%',
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={profileData?.profession}
                onChangeText={(value) =>
                  setProfileData({ ...profileData, profession: value })
                }
                editable={true}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Bio</Text>
            <View
              style={{
                height: 100,
                width: '100%',
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={profileData?.bio}
                onChangeText={(value) =>
                  setProfileData({ ...profileData, bio: value })
                }
                style={{
                  height: 100,
                  textAlignVertical: 'top',
                  paddingTop: 8,
                }}
                multiline
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Password</Text>
            <View
              style={{
                height: 44,
                width: '100%',
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <TextInput editable={true} secureTextEntry />
            </View>
          </View>
        </View>

        <View
          style={{
            marginBottom: 12,
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
              value={profileData.address.street}
              onChangeText={(val) =>
                setProfileData({
                  ...profileData,
                  address: { ...profileData.address, street: val },
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
                value={profileData.address.city}
                onChangeText={(val) =>
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, city: val },
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
                value={profileData.address.state}
                onChangeText={(val) =>
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, state: val },
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
                value={profileData.address.country}
                onChangeText={(val) =>
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, country: val },
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
                value={profileData.address.zipCode}
                onChangeText={(val) =>
                  setProfileData({
                    ...profileData,
                    address: { ...profileData.address, zipCode: val },
                  })
                }
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSaveChange}
          style={{
            backgroundColor: COLORS.primary,
            height: 44,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          >
            Save Change
          </Text>
        </TouchableOpacity>

        <View className="h-[100px]" />
      </ScrollView>
      <StatusBar backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default EditUserProfile;
