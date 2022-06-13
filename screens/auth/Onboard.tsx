import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import BottomSheet from 'components/BottomSheet';
import Button from 'components/Button';
import { flexBox } from 'styles/utils';

function Onboard() {
  const [isModalOn, setIsModalOn] = useState(false);
  const navigation = useNavigation();
  const onGoToHome = () => navigation.reset({ routes: [{ name: '/' }] });
  const onOpenModal = () => setIsModalOn(true);
  const onCloseModal = () => setIsModalOn(false);

  return (
    <Styled.Container source={require('../../assets/images/onboarding-ko.jpg')}>
      <Styled.BottomSheet>
        <Button
          onPress={onOpenModal}
          size="100%"
          fontWeight={500}
          variant="primary"
        >
          Get Started
        </Button>
        <Button
          onPress={onGoToHome}
          size="100%"
          fontWeight={400}
          variant="ghost"
        >
          Continue as guest
        </Button>
      </Styled.BottomSheet>
      <BottomSheet visible={isModalOn} onCloseModal={onCloseModal}>
        <Button
          onPress={() => setIsModalOn(false)}
          size="100%"
          fontWeight={500}
          variant="primary"
        >
          Get Started
        </Button>
        <Button
          onPress={() => setIsModalOn(false)}
          size="100%"
          fontWeight={500}
          variant="primary"
        >
          Get Started
        </Button>
        <Button
          onPress={() => setIsModalOn(false)}
          size="100%"
          fontWeight={500}
          variant="primary"
        >
          Get Started
        </Button>
        <Button
          onPress={onGoToHome}
          size="100%"
          fontWeight={400}
          variant="ghost"
        >
          Continue as guest
        </Button>
      </BottomSheet>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled(ImageBackground)`
    flex: 1;
    ${flexBox('row', 'end', 'center')};
  `,

  BottomSheet: styled.View`
    ${flexBox('column', 'center', 'center')};
    width: 100%;
    padding: 28px 16px;
    background-color: #fff;
  `,

  Overlay: styled.View`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${({ theme }) => theme.levels.overlay};
    width: 100%;
    height: 100%;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: 0.7;
  `,
};

export default Onboard;
