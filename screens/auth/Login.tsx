import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import Btn from 'components/Btn';
import Text from 'components/Text';
import { useStores } from 'store/useStore';
import { theme } from 'styles/theme';

import PasswordInput from '../../components/Input/Password';

function Login({ route }) {
  const store = useStores();
  const [password, setPassword] = useState('');
  const onChangeText = (text) => setPassword(text);
  const handlePressLoginBtn = async () => {
    await store.auth.login(route.params.email, password);
  };
  console.log(store.auth.accessToken);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Text size="lg" fontWeight="bold">
          Hi, {route.params.name}
        </Text>
        <Text size="xl" fontWeight="bold">
          Enter your password
        </Text>
        <PasswordInput
          value={password}
          onChangeText={onChangeText}
          placeholder="Password"
          placeholderTextColor="#7b7b7b"
          textContentType="password"
        />
        <Btn size="100%" variant="primary" onPress={handlePressLoginBtn}>
          <Text fontWeight="bold" color={theme.colors.white}>
            Login
          </Text>
        </Btn>
        <Btn size="100%" variant="ghost">
          <Text fontWeight="semiBold" color={theme.colors.primary}>
            Forgot password?
          </Text>
        </Btn>
      </Styled.Container>
    </SafeAreaView>
  );
}

const Styled = {
  Container: styled.View`
    flex: 1;
    padding: 32px 16px 0 16px;
  `,

  Text: styled.Text`
    font-size: 36px;
  `,

  InputWrapper: styled.View`
    padding: 0 8px;
    margin-top: 30px;
    margin-bottom: 60px;
  `,

  HelpText: styled.View`
    margin-top: 8px;
    padding: 0 8px;
  `,
};

export default Login;
