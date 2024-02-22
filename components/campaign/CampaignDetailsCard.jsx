import { View, Text, Button, ScrollView, Image } from 'react-native';
import React from 'react';

const CampaignDetailsCard = ({ campaign, hideModal }) => {
  return (
    <View className="w-full h-full">
      <View className="flex-row justify-start items-start">
        <View className="flex-1">
          <Text className="text-lg font-bold">
            {campaign?.title || 'No title provided'}
          </Text>
          <Text className="text-gray-500 text-xs">
            {new Date(campaign?.createdAt).toDateString() || 'No date provided'}
          </Text>
          <Text className="text-gray-500 text-xs">Lagos, Nigeria</Text>
        </View>
        <View className="w-8 ">
          <Button onPress={hideModal} title="X" color="red" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="my-4">
          {campaign?.media && campaign.media.length > 0 ? (
            <Carousel
              width={Dimensions.get('window').width - 40}
              height={300}
              data={campaign.media || []}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <View className="absolute top-2 right-8 z-10 p-1 bg-slate-200 rounded-md">
                      <Text className="text-xs text-red-500 text-center">
                        {index + 1} of {campaign.media.length}
                      </Text>
                    </View>

                    <Image
                      className="w-full h-full"
                      source={{
                        uri: item.url,
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <Image
              className="w-full h-60"
              source={{ uri: 'https://picsum.photos/200/300' }}
            />
          )}
        </View>

        <View className="flex-row justify-center items-center">
          <Text className="text-lg font-bold">
            {new Date(campaign?.startDate).toLocaleDateString() ||
              'No date provided'}{' '}
            -{' '}
            {new Date(campaign?.endDate).toLocaleDateString() ||
              'No date provided'}
          </Text>
        </View>

        <View className="flex-row justify-start items-start mt-2">
          <View className="flex-1">
            <Text className="text-lg font-bold">Motto</Text>
            <Text className="text-gray-500 text-xs">
              {campaign?.motto || 'No Motto provided'}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-start items-start mt-4">
          <View className="flex-1">
            <Text className="text-lg font-bold">Mission</Text>
            <Text className="text-gray-500 text-xs">
              {campaign?.description || 'No description provided'}
            </Text>
          </View>
        </View>

        <View className="gap-y-2 mt-8">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">Created By</Text>
            <View className="flex-row items-center gap-2">
              <Text className="font-bold">
                {campaign?.ownUserId
                  ? campaign?.ownUser?.fullName
                  : campaign?.ownNgo?.name || 'Anonymous'}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">Location</Text>
            <Text className="font-bold">
              {`${
                campaign.virtual
                  ? 'Virtual'
                  : campaign.address?.city ||
                    campaign.address?.state ||
                    campaign.address?.country
              }`}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">Funds Needed</Text>
            <Text className="font-bold">{`$${campaign.fundsNeeded || 0}`}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">Users</Text>
            <Text className="font-bold">{campaign.joinedUsers.length}</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">Ngo's</Text>
            <Text className="font-bold">{campaign.joinedNgos.length}</Text>
          </View>
        </View>

        <View className="flex-col  my-8">
          <Text className="text-md font-bold">Campaign Broadcasts</Text>

          <View className="flex-row items-center gap-2 mt-2">
            {campaign.campaignBroadcasts.map((broadcast, index) => (
              <View key={index} className="flex-row items-center gap-2">
                <Text className="font-bold">{broadcast.message}</Text>
              </View>
            ))}

            {campaign.campaignBroadcasts.length === 0 && (
              <Text className="text-gray-500 text-xs">
                No Broadcasts provided
              </Text>
            )}
          </View>
        </View>
        <View style={{}}>
          <Button title="Donate " />
        </View>
      </ScrollView>
    </View>
  );
};

export default CampaignDetailsCard;
