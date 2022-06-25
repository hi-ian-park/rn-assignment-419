import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { removeToken } from 'service/auth.storage';
import { useStores } from 'store/useStore';

import AuthStacks from './AuthStacks';
import MainTabs from './MainTabs';

const RootStack = createNativeStackNavigator();

function Root() {
  // removeToken();
  const {
    user,
    auth: { accessToken },
  } = useStores();

  const isLoggedIn = accessToken && user?.authority === 'ACTIVATED_USER';
  const initialRouteName = isLoggedIn ? '/' : '/auth';

  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      {!isLoggedIn && <RootStack.Screen name="/auth" component={AuthStacks} />}
      <RootStack.Screen name="/" component={MainTabs} />
    </RootStack.Navigator>
  );
}

export default Root;
