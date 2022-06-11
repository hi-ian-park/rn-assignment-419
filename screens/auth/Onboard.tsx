import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';
import { flexBox } from '../../styles/utils';

function Onboard() {
  const navigation = useNavigation();

  return (
    <Styled.Container source={require('../../assets/images/onboarding-ko.jpg')}>
      <Styled.BottomSheet>
        <Button
          onPress={() => console.log('primary')}
          size="100%"
          fontWeight={500}
          variant="primary"
        >
          Get Started
        </Button>
        <Button
          onPress={() => console.log('ghost')}
          size="100%"
          fontWeight={400}
          variant="ghost"
        >
          Continue as guest
        </Button>
      </Styled.BottomSheet>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled(ImageBackground)`
    flex: 1;
    ${flexBox('row', 'flex-end', 'center')};
  `,

  BottomSheet: styled.View`
    ${flexBox('column', 'center', 'center')};
    width: 100%;
    padding: 28px 16px;
    background-color: #fff;
  `,
};

export default Onboard;
