import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import NavigationBar from 'components/Bars/NavigationBar';
import Btn from 'components/Btn';
import InputBase from 'components/Input';
import Text from 'components/Text';
import { theme } from 'styles/theme';

function Login() {
  const [hidePassword, setHidePassword] = useState(true);
  const handleShowPassword = () => setHidePassword(!hidePassword);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <NavigationBar />
        <Text size="lg" fontWeight="bold">
          Hi, $NAME
        </Text>
        <Text size="xl" fontWeight="bold">
          Enter your password
        </Text>
        <Styled.InputWrapper>
          <InputBase
            placeholder="Password"
            placeholderTextColor="#7b7b7b"
            secureTextEntry={hidePassword}
            textContentType="password"
          />
          <Styled.HelpText>
            <TouchableOpacity onPress={handleShowPassword}>
              <Text size="sm" style={{ textDecorationLine: 'underline' }}>
                {hidePassword ? 'Show password' : 'Hide password'}
              </Text>
            </TouchableOpacity>
          </Styled.HelpText>
        </Styled.InputWrapper>
        <Btn size="100%" variant="primary">
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
    padding: 0 16px;
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
