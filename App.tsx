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
import { useState, useEffect } from 'react';
import { connectToDevTools } from 'react-devtools-core';
import { ThemeProvider } from 'styled-components';

import utils from 'lib/utils';
import { getToken } from 'service/auth.storage';
import StoreProvider from 'store/StoreProvider';

import Root from './navigation/Root';
import { theme } from './styles/theme';

if (__DEV__) {
  connectToDevTools({
    host: 'localhost',
    port: 8097,
  });
}

export default function App() {
  const [lazyLoaded, setLazyLoaded] = useState(false);
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

  const isAppReady = isNotoSansFontsLoaded && isPoppinsFontsLoaded;

  useEffect(() => {
    (async () => {
      await getToken();
      await utils.sleep(100);
      setLazyLoaded(true);
    })();
  }, []);

  if (!isAppReady) return <AppLoading autoHideSplash />;

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <NavigationContainer>
          <StatusBar />
          {lazyLoaded ? <Root /> : <AppLoading />}
        </NavigationContainer>
      </StoreProvider>
    </ThemeProvider>
  );
}
