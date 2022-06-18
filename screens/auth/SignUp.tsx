import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import NavigationBar from 'components/Bars/NavigationBar';
import Btn from 'components/Btn';
import InputBase from 'components/Input';
import Text from 'components/Text';
import { theme } from 'styles/theme';

interface SignUpProps {}

const SignUp = (props: SignUpProps) => {
  const [hidePassword, setHidePassword] = useState(true);
  const handleShowPassword = () => setHidePassword(!hidePassword);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <NavigationBar />
        <Text size="lg" fontWeight="bold">
          Nice to meet you 👋
        </Text>
        <Text size="xl" fontWeight="bold">
          Create your password
        </Text>

        <Styled.InputWrapper>
          <InputBase
            placeholder="Password"
            placeholderTextColor="#7b7b7b"
            secureTextEntry={hidePassword}
            textContentType="password"
          />
          <Styled.HelpText>
            <Styled.TextWrapper>
              <Text size="xs">
                Your password should be{' '}
                <Text size="xs" fontWeight="bold">
                  6-20 characters
                </Text>{' '}
                long and must contain{' '}
                <Text size="xs" fontWeight="bold">
                  1 letter
                </Text>
                ,{' '}
                <Text size="xs" fontWeight="bold">
                  1 number
                </Text>{' '}
                and{' '}
                <Text size="xs" fontWeight="bold">
                  1 special character
                </Text>
                .
              </Text>
            </Styled.TextWrapper>
            <TouchableOpacity onPress={handleShowPassword}>
              <Text size="sm" style={{ textDecorationLine: 'underline' }}>
                {hidePassword ? 'Show password' : 'Hide password'}
              </Text>
            </TouchableOpacity>
          </Styled.HelpText>
        </Styled.InputWrapper>
        <Btn size="100%" variant="primary">
          Next
        </Btn>
      </Styled.Container>
    </SafeAreaView>
  );
};

export default SignUp;

const Styled = {
  Container: styled.View`
    flex: 1;
    padding: 0 16px;
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

  TextWrapper: styled.View`
    margin-bottom: 24px;
  `,
};
