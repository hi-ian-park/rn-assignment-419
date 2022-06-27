import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import { useStores } from 'store/useStore';

import AuthStacks from './AuthStacks';
import MainTabs from './MainTabs';

const RootStack = createNativeStackNavigator();

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    user,
    auth: { accessToken },
  } = useStores();
  const initialRouteName = isLoggedIn ? '/' : '/auth';
  useEffect(() => {
    setIsLoggedIn(accessToken && user?.authority === 'ACTIVATED_USER');
  }, [accessToken, user?.authority]);

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
