import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { useStores } from 'store/useStore';

import AuthStacks from './AuthStacks';
import MainTabs from './MainTabs';

const RootStack = createNativeStackNavigator();

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    user,
    auth,
    auth: { accessToken },
  } = useStores();
  const initialRouteName = isLoggedIn ? '/' : '/auth';
  useEffect(() => {
    setIsLoggedIn(accessToken && user?.authority === 'ACTIVATED_USER');
  }, [auth, user]);

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
