import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Login from '../screens/auth/Login';
import Onboard from '../screens/auth/Onboard';
import SignUp from '../screens/auth/SignUp';

const NativeStack = createNativeStackNavigator();
// TODO: 여기부터 작업 시작
function AuthStacks() {
  return (
    <NativeStack.Navigator
      initialRouteName="/auth/onboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="/auth/onboard" component={Onboard} />
      <NativeStack.Screen name="/auth/login" component={Login} />
      <NativeStack.Screen name="/auth/signup" component={SignUp} />
    </NativeStack.Navigator>
  );
}

export default AuthStacks;
