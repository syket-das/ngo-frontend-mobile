import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

const CreateFundRaiser = () => {
  const [selected, setSelected] = React.useState([]);

  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ];

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
              Description
            </Text>

            <MultipleSelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              onSelect={() => alert(selected)}
              label="Categories"
            />
          </View>
        </View>

        <Button title="Create Post" color={COLORS.primary} />

        <View className="h-[100px]" />
      </ScrollView>
    </View>
  );
};

export default CreateFundRaiser;
