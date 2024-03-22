import React, { useState } from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);
    } catch (error) {
      setErrorMsg('Error fetching location');
    }
  };

  return { location, errorMsg, fetchLocation };
};

export default useLocation;
