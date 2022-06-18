import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Btn from 'components/Btn';
import InputBase from 'components/Input';
import Text from 'components/Text';
import { flexBox } from 'styles/utils';

function SignUp() {
  const navigation = useNavigation();
  const handleGoBackBtn = () => {
    navigation.goBack();
  };
  const handlePressNextBtn = () => {
    console.log('NEXT 버튼이욤');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Styled.Header>
          <TouchableOpacity onPress={handleGoBackBtn}>
            <FontAwesome5 name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        </Styled.Header>
        <Text fontWeight="bold" size="lg">
          Log in or Sign up{'\n'}with email
        </Text>

        <Styled.InputWrapper>
          <InputBase
            keyboardType="email-address"
            placeholder="hihi"
            placeholderTextColor="#7b7b7b"
          />
        </Styled.InputWrapper>
        <Btn onPress={handlePressNextBtn} size="100%" variant="primary">
          <Text color="#fff">Next</Text>
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

  H1: styled(Text)`
    margin-bottom: 24px;
  `,

  H2: styled.Text`
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 4px;
  `,

  // 디자인 상에서는 with Label Text Fields 이지만, 실제로 Label이 없기 때문에 margin으로 스타일링
  InputWrapper: styled.View`
    padding: 0 8px;
    margin-top: 30px;
    margin-bottom: 60px;
  `,
};

export default SignUp;
