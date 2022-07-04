import { useIsFocused } from '@react-navigation/native';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import Button from 'components/Button/Button';
import Text from 'components/Text/Text';
import { useStores } from 'hooks/useStore';
import { flexBox } from 'styles/utils';
import { AccountScreenProps } from 'types/NavigationTypes';

interface AccountProps {
  navigation: AccountScreenProps;
}

const Account = ({ navigation }: AccountProps) => {
  const store = useStores();
  const isFocused = useIsFocused();
  const hasToken = !!store.auth?.accessToken;

  const handlePressLogInBtn = useCallback(() => {
    navigation.reset({ routes: [{ name: '/auth' }] });
  }, [navigation]);

  const handlePressLogOutBtn = useCallback(async () => {
    store.auth.logout();
    alert('logout');
    navigation.navigate('/', { screen: '/home' });
  }, [navigation, store]);

  if (!isFocused) return null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Text size="xl" fontWeight="bold" style={{ marginBottom: 60 }}>
          {store.user?.name || 'Log in or Sign up'}
        </Text>
        <Button
          variant="primary"
          onPress={hasToken ? handlePressLogOutBtn : handlePressLogInBtn}
        >
          {hasToken ? 'Log out' : 'Log in'}
        </Button>
      </Styled.Container>
    </SafeAreaView>
  );
};

const Styled = {
  Container: styled.View`
    flex: 1;
    ${flexBox('column', 'center', 'center')}
    padding: 0 16px;
  `,

  Text: styled.Text`
    font-size: 36px;
  `,
};

export default Account;
