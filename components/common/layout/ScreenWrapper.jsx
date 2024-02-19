import { View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenWrapper = ({ children }) => {
  return (
    <SafeAreaView
      className="px-2 h-full"
      style={{
        // flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
