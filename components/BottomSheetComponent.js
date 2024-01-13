import { View, Text } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import useBottomSheetStore from '../store/bottomSheetStore';

const BottomSheetComponent = ({}) => {
  const { bottomSheet, setBottomSheet, bottomSheetContent } =
    useBottomSheetStore((state) => state);
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
  const bottomSheetRef = React.useRef(null);

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  };

  useEffect(() => {
    if (bottomSheet) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [bottomSheet]);

  return (
    <BottomSheet
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={(index) => {
        if (index === -1) {
          setBottomSheet(false);
        }
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
        }}
      >
        {bottomSheetContent}
      </View>
    </BottomSheet>
  );
};

export default BottomSheetComponent;
