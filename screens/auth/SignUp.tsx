import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import Btn from 'components/Btn';
import PasswordInput from 'components/Input/Password';
import Text from 'components/Text';

interface SignUpProps {}

const SignUp = (props: SignUpProps) => {
  const [password, setPassword] = useState('');
  const { route } = props;
  const onChangeText = (text: string) => setPassword(text);
  const handlePressNextBtn = () => {
    console.log(password);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Text size="lg" fontWeight="bold">
          Nice to meet you 👋
        </Text>
        <Text size="xl" fontWeight="bold">
          Create your password
        </Text>
        <PasswordInput
          value={password}
          onChangeText={onChangeText}
          placeholder="Password"
          placeholderTextColor="#7b7b7b"
          textContentType="password"
          isHint
        />
        <Btn size="100%" variant="primary" onPress={handlePressNextBtn}>
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
    padding: 32px 16px 0 16px;
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
