import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import Text from 'components/Text';
import { useStores } from 'store/useStore';
import { flexBox } from 'styles/utils';

function Account() {
  const store = useStores();
  console.log(store.user);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Text size="xl" fontWeight="bold">
          {store.user?.name ?? 'Log in or Sign up'}
        </Text>
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
