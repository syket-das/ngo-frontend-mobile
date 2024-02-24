import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';
import usePostStore from '../../store/postStore';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../store/authStore';
import { TAGS } from '../../constants/data';

const CreatePost = () => {
  const navigation = useNavigation();
  const { createPostByUser, createPostByNgo } = usePostStore((state) => state);
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

  const [selected, setSelected] = React.useState([]);

  const [post, setPost] = React.useState({
    title: '',
    description: '',
    tags: [],
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
      if (authType.role === 'USER') {
        await createPostByUser(post);
      } else if (authType.role === 'NGO') {
        await createPostByNgo(post);
      }

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'Post created successfully',
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

  useEffect(() => {
    setPost({ ...post, tags: selected });
  }, [selected]);

  const tags = TAGS.filter((tag) => tag.post).map((tag) => {
    return { key: tag.value, value: tag.value };
  });

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
                placeholder="Enter title of your post"
                placeholderTextColor={COLORS.black}
                keyboardType="default"
                style={{
                  width: '100%',
                }}
                value={post.title}
                onChangeText={(val) => setPost({ ...post, title: val })}
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
                placeholder="Enter description of your post"
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
                value={post.description}
                onChangeText={(val) => setPost({ ...post, description: val })}
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
                value={post.address.street}
                onChangeText={(val) =>
                  setPost({
                    ...post,
                    address: { ...post.address, street: val },
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
                  value={post.address.city}
                  onChangeText={(val) =>
                    setPost({
                      ...post,
                      address: { ...post.address, city: val },
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
                  value={post.address.state}
                  onChangeText={(val) =>
                    setPost({
                      ...post,
                      address: { ...post.address, state: val },
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
                  value={post.address.country}
                  onChangeText={(val) =>
                    setPost({
                      ...post,
                      address: { ...post.address, country: val },
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
                  style={{
                    width: '100%',
                  }}
                  value={post.address.zipCode}
                  onChangeText={(val) =>
                    setPost({
                      ...post,
                      address: { ...post.address, zipCode: val },
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
          title="Create Post"
          color={COLORS.primary}
        />

        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};

export default CreatePost;
