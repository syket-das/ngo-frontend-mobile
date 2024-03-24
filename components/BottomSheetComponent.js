import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import useBottomSheetStore from '../store/bottomSheetStore';

const BottomSheetComponent = ({}) => {
  const { bottomSheet, setBottomSheet, bottomSheetContent, setBottomSheetRef } =
    useBottomSheetStore((state) => state);
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
  const bottomSheetRef = React.useRef(null);

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        enableTouchThrough={false}
        pressBehavior={'close'}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  useEffect(() => {
    setBottomSheetRef(bottomSheetRef);
    if (bottomSheet) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [bottomSheet]);

  return (
    <BottomSheet
      style={{
        zIndex: 1000,
      }}
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
      backdropComponent={renderBackdrop}
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
