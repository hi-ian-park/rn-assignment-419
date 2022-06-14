import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import BottomSheet from 'components/BottomSheet';
import Btn from 'components/Btn';
import SocialLoginButton from 'components/Btn/SocialLoginButton';
import { flexBox } from 'styles/utils';

function Onboard() {
  const [isModalOn, setIsModalOn] = useState(false);
  const navigation = useNavigation();
  const onGoToHome = () => navigation.reset({ routes: [{ name: '/' }] });
  const onToggleModal = () => setIsModalOn(!isModalOn);
  const onOpenModal = () => setIsModalOn(true);
  const onCloseModal = () => setIsModalOn(false);

  return (
    <Styled.Container source={require('../../assets/images/onboarding-ko.jpg')}>
      <Styled.BottomSheet>
        <Btn onPress={onOpenModal} size="100%" variant="primary">
          Get Started
        </Btn>
        <Btn onPress={onGoToHome} size="100%" variant="ghost">
          Continue as guest
        </Btn>
      </Styled.BottomSheet>
      <BottomSheet
        onToggleModal={onToggleModal}
        visible={isModalOn}
        onCloseModal={onCloseModal}
      >
        <SocialLoginButton
          iconName="apple"
          variant="primary"
          backgroundColor="#0F0F0F"
          iconColor="#fff"
          onPress={() => setIsModalOn(false)}
          size="100%"
        >
          Continue with Apple
        </SocialLoginButton>
        <SocialLoginButton
          iconName="google"
          backgroundColor="transparent"
          iconColor="#333"
          variant="outlined"
          onPress={() => setIsModalOn(false)}
          size="100%"
        >
          Continue with Google
        </SocialLoginButton>
        <SocialLoginButton
          iconName="facebook"
          variant="primary"
          backgroundColor="#007DFF"
          iconColor="#fff"
          onPress={() => setIsModalOn(false)}
          size="100%"
        >
          Continue with Facebook
        </SocialLoginButton>
        <Btn onPress={onGoToHome} size="100%" variant="ghost">
          Continue with Email
        </Btn>
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
