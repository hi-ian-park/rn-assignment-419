import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

function Onboard() {
  const navigation = useNavigation();

  return (
    <Styled.Container source={require('../../assets/images/onboarding-ko.jpg')}>
      <Styled.BottomSheet>
        <Styled.Button isTint>
          <Styled.Text isTint>Get Started</Styled.Text>
        </Styled.Button>
        <Styled.Button>
          <Styled.Text>Continue as guest</Styled.Text>
        </Styled.Button>
      </Styled.BottomSheet>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled(ImageBackground)`
    flex: 1;
    ${({ theme }) => theme.flexBox('row', 'flex-end', 'center')};
  `,

  BottomSheet: styled.View`
    ${({ theme }) => theme.flexBox('column', 'center', 'center')};
    width: 100%;
    padding: 28px 16px;
    background-color: #fff;
  `,

  Button: styled.TouchableOpacity<{ isTint?: boolean }>`
    ${({ theme }) => theme.flexBox('row', 'center', 'center')};
    width: 100%;
    background-color: ${({ isTint, theme }) =>
      isTint ? theme.tint : theme.white};
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 15px;
  `,

  Text: styled.Text<{ isTint?: boolean }>`
    color: ${({ isTint, theme }) => (isTint ? theme.white : theme.text)};
    font-size: 16px;
    font-weight: ${({ isTint }) => (isTint ? 500 : 400)};
  `,
};

export default Onboard;
