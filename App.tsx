import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Root from './navigation/Root';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Root />
    </NavigationContainer>
  );
}
