import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import useBottomSheetStore from '../store/bottomSheetStore';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

const BottomSheetComponent = ({}) => {
  const {
    bottomSheet,
    setBottomSheet,
    bottomSheetContent,
    setBottomSheetRef,
    initialSnap,
  } = useBottomSheetStore((state) => state);
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
        <View className="flex-row justify-between items-center   ">
          <TouchableOpacity
            className="bg-primary  p-2 ml-2 rounded-full"
            style={{ backgroundColor: COLORS.grey }}
            onPress={() => {
              setBottomSheet(false);
            }}
          >
            <MaterialIcons
              style={{
                color: COLORS.white,
              }}
              name="arrow-back"
              size={24}
            />
          </TouchableOpacity>
        </View>
        {bottomSheetContent}
      </View>
    </BottomSheet>
  );
};

export default BottomSheetComponent;
