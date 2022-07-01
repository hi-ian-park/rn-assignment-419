import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { useStores } from 'store/useStore';

import AuthStacks, { AuthStackParamList } from './AuthStacks';
import MainTabs, { MainTabParamList } from './MainTabs';

export type RootStackParamList = {
  '/': undefined;
  '/auth': undefined;
  MainTabNavigator: NavigatorScreenParams<MainTabParamList>;
  AuthStackNavigator: NavigatorScreenParams<AuthStackParamList>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Root = () => {
  const {
    auth: { isLoggedIn },
  } = useStores();
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
};

export default observer(Root);
