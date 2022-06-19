import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import NavigationBar from 'components/Bars/NavigationBar';
import Btn from 'components/Btn';
import InputBase from 'components/Input';
import Text from 'components/Text';
import { theme } from 'styles/theme';

import PasswordInput from '../../components/Input/Password';

function Login({ route }) {
  // TODO: navigate route로 email 보내줘야함~!
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const onChangeText = (text) => setPassword(text);
  console.log(route);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <NavigationBar />
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
        {/* <Styled.InputWrapper>
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
        </Styled.InputWrapper> */}
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
