import {
  NotoSansKR_400Regular,
  NotoSansKR_500Medium,
  NotoSansKR_700Bold,
  useFonts as useNotoSansKrFonts,
} from '@expo-google-fonts/noto-sans-kr';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts as usePoppinsFonts,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { connectToDevTools } from 'react-devtools-core';
import { ThemeProvider } from 'styled-components';

import StoreProvider from 'store/StoreProvider';
import { useStores } from 'store/useStore';

import Root from './navigation/Root';
import { theme } from './styles/theme';

if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8097,
  });
}

export default function App() {
  const store = useStores();
  const [isNotoSansFontsLoaded] = useNotoSansKrFonts({
    NotoSansKR_700Bold,
    NotoSansKR_500Medium,
    NotoSansKR_400Regular,
  });
  const [isPoppinsFontsLoaded] = usePoppinsFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const isResourceLoaded = !(isNotoSansFontsLoaded && isPoppinsFontsLoaded);

  useEffect(() => {
    (async () => {
      await store.auth.setToken();
      if (store.auth.accessToken) {
        await store.getCurrentUser();
      } else {
        console.log('user 없음');
      }
    })();
  }, [store.auth.accessToken]);

  if (isResourceLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <NavigationContainer>
          <StatusBar />
          <Root />
        </NavigationContainer>
      </StoreProvider>
    </ThemeProvider>
  );
}
