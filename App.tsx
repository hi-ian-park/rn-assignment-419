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
import { ThemeProvider } from 'styled-components';

import Root from './navigation/Root';
import { theme } from './styles/theme';

export default function App() {
  const [isNotoSansFontsLoaded] = useNotoSansKrFonts({
    NotoSansKR_700Bold,
    NotoSansKR_500Medium,
    NotoSansKR_400Regular,
  });
  console.log('isNotoSansFontsLoaded: ', isNotoSansFontsLoaded);
  const [isPoppinsFontsLoaded] = usePoppinsFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });
  console.log('isPoppinsFontsLoaded: ', isPoppinsFontsLoaded);

  const isResourceLoaded = !(isNotoSansFontsLoaded && isPoppinsFontsLoaded);

  if (isResourceLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar />
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
