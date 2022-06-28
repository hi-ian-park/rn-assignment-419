import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import Btn from 'components/Btn';
import Text from 'components/Text';
import { useStores } from 'store/useStore';
import { flexBox } from 'styles/utils';

function Account() {
  const store = useStores();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const hasToken = !!store.auth?.accessToken;
  console.log('hasToken: ', hasToken);

  const handlePressLogInBtn = useCallback(() => {
    navigation.navigate('/auth');
  }, [navigation]);

  const handlePressLogOutBtn = useCallback(async () => {
    store.logout();
    alert('logout');
    navigation.navigate('/home');
  }, [navigation, store]);

  if (!isFocused) return null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Text size="xl" fontWeight="bold" style={{ marginBottom: 60 }}>
          {store.user?.name ?? 'Log in or Sign up'}
        </Text>
        <Btn
          size="100%"
          variant="primary"
          onPress={hasToken ? handlePressLogOutBtn : handlePressLogInBtn}
        >
          {hasToken ? 'Log out' : 'Log in'}
        </Btn>
      </Styled.Container>
    </SafeAreaView>
  );
}

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
