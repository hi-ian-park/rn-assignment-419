import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { removeToken } from 'service/auth.storage';
import { useStores } from 'store/useStore';

import AuthStacks from './AuthStacks';
import MainTabs from './MainTabs';

const RootStack = createNativeStackNavigator();

function Root() {
  const {
    auth: { accessToken },
  } = useStores();
  const initialRouteName = accessToken ? '/' : '/auth';

  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      {!accessToken && <RootStack.Screen name="/auth" component={AuthStacks} />}
      <RootStack.Screen name="/" component={MainTabs} />
    </RootStack.Navigator>
  );
}

export default Root;
