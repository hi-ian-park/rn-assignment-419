import React, { useRef, useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import NavigationBar from 'components/Bars/NavigationBar';
import Btn from 'components/Btn';
import PasswordInput from 'components/Input/Password';
import Text from 'components/Text';

interface SignUpProps {}

const SignUp = (props: SignUpProps) => {
  const [password, setPassword] = useState('');
  const { route } = props;
  const onChangeText = (text) => setPassword(text);
  const handlePressNextBtn = () => {
    console.log(password);
  };
  console.log(route.params);
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
