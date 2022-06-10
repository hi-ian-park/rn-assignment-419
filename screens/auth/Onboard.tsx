import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

function Onboard() {
  const navigation = useNavigation();

  return (
    <Styled.Container>
      <Styled.LadingImage
        source={require('../../assets/images/onboarding-ko.jpg')}
      />
      <Styled.BottomSheet />
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,

  LadingImage: styled.Image``,

  BottomSheet: styled.View`
    background-color: #fff;
  `,

  Text: styled.Text`
    font-size: 36px;
  `,

  Button: styled.TouchableOpacity`
    margin-bottom: 10px;
  `,
};

export default Onboard;
