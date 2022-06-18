import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import LogInSignUp from 'screens/auth/LogInSignUp';
import Onboard from 'screens/auth/Onboard';

const NativeStack = createNativeStackNavigator();

function AuthStacks() {
  return (
    <NativeStack.Navigator
      initialRouteName="/auth/onboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="/auth/onboard" component={Onboard} />
      <NativeStack.Screen name="/auth/login-signup" component={LogInSignUp} />
    </NativeStack.Navigator>
  );
}

export default AuthStacks;
