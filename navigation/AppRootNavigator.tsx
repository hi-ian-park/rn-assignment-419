import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { useStores } from 'hooks/useStore';
import { RootStackParamList } from 'types/NavigationTypes';

import AuthStacks from './AuthStacks';
import MainTabs from './MainTabs';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppRootNavigator = () => {
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

export default observer(AppRootNavigator);
