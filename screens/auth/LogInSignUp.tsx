import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Btn from 'components/Btn';
import { flexBox } from 'styles/utils';

function SignUp() {
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
  const handleGoBackBtn = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Styled.Header>
          <TouchableOpacity onPress={handleGoBackBtn}>
            <FontAwesome5 name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        </Styled.Header>
        <Styled.H1>Log in or Sign up{'\n'}with email</Styled.H1>

        <Styled.InputWrapper>
          <Styled.Input
            placeholder="Enter email address"
            placeholderTextColor="#7b7b7b"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            isFocus={isFocus}
          />
        </Styled.InputWrapper>
        <Btn size="100%" variant="primary">
          Next
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

  Header: styled.View`
    ${flexBox('row', 'center', 'start')}
    height: 50px;
    margin-bottom: 32px;
  `,

  H1: styled.Text`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 24px;
  `,

  H2: styled.Text`
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 4px;
  `,

  InputWrapper: styled.View`
    padding: 0 8px;
  `,

  Input: styled.TextInput`
    align-items: center;
    justify-content: center;
    padding: 30px 8px 13px 8px;
    margin-bottom: 60px;
    font-size: 15px;
    line-height: 23;
    border-bottom-color: ${({ isFocus, theme }) =>
      isFocus ? theme.colors.text : theme.colors.border};
    border-bottom-width: 1px;
  `,
};

export default SignUp;
