import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import useCheckAccessToken from '../hooks/useCheckAccessToken';
import { useStores } from '../store/useStore';
import AuthStacks from './AuthStacks';
import MainTabs from './MainTabs';

const RootStack = createNativeStackNavigator();

function Root() {
  const store = useStores();
  // const isLoggedIn = false;
  // const isLoggedIn = !!store.auth.accessToken;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { hasToken: isLoggedIn } = useCheckAccessToken();
  console.log(isLoggedIn);
  console.log('render부 : ', store.auth.accessToken);
  const initialRouteName = isLoggedIn ? '/' : '/auth';

  // useEffect(() => {
  //   (async () => {
  //     await store.auth.setToken();
  //     console.log('RootNav useEffect1 :', store.auth.accessToken);
  //     if (store.auth.accessToken) {
  //       await store.getCurrentUser();
  //       setIsLoggedIn(!!store.auth.accessToken);
  //     } else {
  //       console.log('user 없음');
  //     }
  //   })();
  // }, [store.auth.accessToken]);

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
