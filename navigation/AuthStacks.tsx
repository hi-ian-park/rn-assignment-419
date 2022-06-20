import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavigationBar from 'components/Bars/NavigationBar';
import LogInSignUp from 'screens/auth/LogInSignUp';
import Login from 'screens/auth/Login';
import Onboard from 'screens/auth/Onboard';
import SignUp from 'screens/auth/SignUp';

const NativeStack = createNativeStackNavigator();

function AuthStacks() {
  return (
    <NativeStack.Navigator
      initialRouteName="/auth/onboard"
      screenOptions={{
        headerLeft: NavigationBar,
        title: '',
        headerStyle: {
          backgroundColor: '#f2f2f2',
        },
        headerShadowVisible: false,
      }}
    >
      <NativeStack.Screen
        name="/auth/onboard"
        component={Onboard}
        options={{ headerShown: false }}
      />
      <NativeStack.Screen name="/auth/login-signup" component={LogInSignUp} />
      <NativeStack.Screen name="/auth/signup" component={SignUp} />
      <NativeStack.Screen name="/auth/login" component={Login} />
    </NativeStack.Navigator>
  );
}

export default AuthStacks;
