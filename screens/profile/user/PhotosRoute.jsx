import React from 'react';
import { View, Image, FlatList } from 'react-native';

const PhotosRoutes = () => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={photos}
      numColumns={3}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            aspectRatio: 1,
            margin: 3,
          }}
        >
          <Image
            key={index}
            source={item}
            style={{ width: '100%', height: '100%', borderRadius: 12 }}
          />
        </View>
      )}
    />
  </View>
);

const LikesRoutes = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'blue',
    }}
  />
);

const renderScene = SceneMap({
  first: PhotosRoutes,
  second: LikesRoutes,
});
