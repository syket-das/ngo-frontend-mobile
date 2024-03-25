import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Share,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import useAuthStore from '../store/authStore';
import NgoProfile from './profile/ngo/NgoProfile';
import Profile from './Profile';

const Settings = ({ navigation }) => {
  const {
    auth,
    logout: logOut,
    authType,
    setAuthType,
  } = useAuthStore((state) => state);

  useEffect(() => {
    async function getAuthType() {
      try {
        await setAuthType();
      } catch (error) {
        console.log(error);
      }
    }

    getAuthType();
  }, []);

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const navigateToSecurity = () => {
    console.log('Security function');
  };

  const navigateToNotifications = () => {
    console.log('Notifications function');
  };

  const navigateToPrivacy = () => {
    console.log('Privacy function');
  };

  const navigateToSubscription = () => {
    console.log('Subscription function');
  };

  const navigateToSupport = () => {
    console.log('Support function');
  };

  const navigateToTermsAndPolicies = () => {
    console.log('Terms and Policies function');
  };

  const navigateToFreeSpace = () => {
    console.log('Free Space function');
  };

  const navigateToDateSaver = () => {
    console.log('Date saver');
  };

  const navigateToReportProblem = () => {
    console.log('Report a problem');
  };

  const addAccount = () => {
    console.log('Aadd account ');
  };

  const logout = () => {
    logOut();
    navigation.navigate('Welcome');
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Cy India | A platform for social work and public welfare. Join us now. https://reactnative.dev/',
        title: 'Cyp India',
        url: 'https://reactnative.dev/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const navigateToProfile = () => {
    if (authType.role === 'NGO') {
      navigation.navigate('Profile');
    }
    if (authType.role === 'USER') {
      navigation.navigate('Profile');
    }
  };

  const accountItems = [
    {
      icon: 'person',
      text: 'Profile',
      action: navigateToProfile,
    },
    {
      icon: 'person-add',
      text: 'Edit Profile',
      action: navigateToEditProfile,
    },
    { icon: 'security', text: 'Security', action: navigateToSecurity },
    {
      icon: 'notifications-none',
      text: 'Notifications',
      action: navigateToNotifications,
    },
    { icon: 'lock-outline', text: 'Privacy', action: navigateToPrivacy },
  ];

  const supportItems = [
    {
      icon: 'share',
      text: 'Share  with a friend',
      action: shareApp,
    },

    { icon: 'help-outline', text: 'Help & Support', action: navigateToSupport },
    {
      icon: 'info-outline',
      text: 'Terms and Policies',
      action: navigateToTermsAndPolicies,
    },
  ];

  const actionsItems = [
    {
      icon: 'outlined-flag',
      text: 'Report a problem',
      action: navigateToReportProblem,
    },
    { icon: 'logout', text: 'Log out', action: logout },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: COLORS.gray,
      }}
    >
      <MaterialIcons name={icon} size={24} color="black" />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.semiBold,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {text}{' '}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Settings</Text>
      </View>

      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Account</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
            Support & About{' '}
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Actions</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
        <View style={{ marginBottom: 50 }} />
      </ScrollView>
      <StatusBar backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default Settings;
