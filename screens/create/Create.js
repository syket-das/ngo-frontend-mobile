import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants';

const Create = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View className="mx-4">
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Create
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            What do you want to create?
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatePost')}
          className={`border   h-[15%] rounded-xl mb-4 flex-row items-center justify-start p-2`}
        >
          <View className="justify-center flex-1 flex-row">
            <Text className="text-lg font-bold ml-4"> Post</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateCampaign')}
          className={`border  h-[15%] rounded-xl mb-4 flex-row items-center justify-start p-2`}
        >
          <View className="justify-center flex-1 flex-row">
            <Text className="text-lg font-bold ml-4">Campaign</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateFundRaiser')}
          className={`border   h-[15%] rounded-xl mb-4 flex-row items-center justify-start p-2`}
        >
          <View className="justify-center flex-1 flex-row">
            <Text className="text-lg font-bold ml-4">Raise Fund</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateIssue')}
          className={`border   h-[15%] rounded-xl mb-4 flex-row items-center justify-start p-2`}
        >
          <View className="justify-center flex-1 flex-row">
            <Text className="text-lg font-bold ml-4">Issue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Create;
