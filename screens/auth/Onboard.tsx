import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

function Onboard() {
  const navigation = useNavigation();

  return (
    <Styled.Container>
      <Styled.Text>Onboard</Styled.Text>
      <Styled.Button
        onPress={() => navigation.navigate('/auth', { screen: '/auth/login' })}
      >
        <Text>Get Start</Text>
      </Styled.Button>

      <Styled.Button
        onPress={() => navigation.reset({ routes: [{ name: '/' }] })}
      >
        <Text>Continue as guest</Text>
      </Styled.Button>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,

  Text: styled.Text`
    font-size: 36px;
  `,

  Button: styled.TouchableOpacity`
    margin-bottom: 10px;
  `,
};

export default Onboard;
