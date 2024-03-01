import { View, Text } from 'react-native';
import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

const Providers = ({ children }) => {
  const publishableKey =
    'pk_test_51KSdQVSCo3iNZ6M6ryNOpFQfNK7PaKFGyOuleBnvsGUB4lcBMbgWcAM7jTCb8CkD9bPaoB9AliKCjZBqB9ck5BU600snkpKRTM';
  return (
    <>
      <StripeProvider publishableKey={publishableKey}>
        {children}
      </StripeProvider>
    </>
  );
};

export default Providers;
