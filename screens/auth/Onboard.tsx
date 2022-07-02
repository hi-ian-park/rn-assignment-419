import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import BottomSheet from 'components/BottomSheet';
import Button from 'components/Button';
import SocialLoginButton from 'components/Button/SocialLoginButton';
import { flexBox } from 'styles/utils';
import { OnboardScreenNavigationProp } from 'types/NavigationTypes';

const Onboard = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const navigation = useNavigation<OnboardScreenNavigationProp>();

  // Event Handler
  const handlePressStartBtn = useCallback(() => {
    setIsBottomSheetOpen(true);
  }, []);

  const onCloseBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  const handlePressContinueAsGuestBtn = useCallback(() => {
    setIsBottomSheetOpen(false);
    navigation.reset({ routes: [{ name: '/' }] });
  }, [navigation]);

  const handlePressContinueWithEmailBtn = useCallback(() => {
    onCloseBottomSheet();
    navigation.navigate('/auth/login-signup');
  }, [navigation, onCloseBottomSheet]);

  return (
    <ImageBackground
      source={require('assets/images/onboarding-ko.jpg')}
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <Styled.BottomSheet>
        <Button
          style={{ marginBottom: 10 }}
          onPress={handlePressStartBtn}
          size="100%"
          variant="primary"
        >
          Get Started
        </Button>
        <Button
          onPress={handlePressContinueAsGuestBtn}
          size="100%"
          variant="ghost"
          fontSize="sm"
        >
          Continue as guest
        </Button>
      </Styled.BottomSheet>
      <BottomSheet visible={isBottomSheetOpen} onClose={onCloseBottomSheet}>
        <Styled.SocialLoginButton
          style={{ marginBottom: 10 }}
          iconName="apple"
          variant="primary"
          backgroundColor="#0F0F0F"
          iconColor="#fff"
          onPress={onCloseBottomSheet}
          size="100%"
        >
          Continue with Apple
        </Styled.SocialLoginButton>
        <Styled.SocialLoginButton
          style={{ marginBottom: 10 }}
          iconName="google"
          backgroundColor="transparent"
          iconColor="#333"
          variant="outlined"
          onPress={onCloseBottomSheet}
          size="100%"
        >
          Continue with Google
        </Styled.SocialLoginButton>
        <Styled.SocialLoginButton
          style={{ marginBottom: 10 }}
          iconName="facebook"
          variant="primary"
          backgroundColor="#007DFF"
          iconColor="#fff"
          onPress={onCloseBottomSheet}
          size="100%"
        >
          Continue with Facebook
        </Styled.SocialLoginButton>
        <Button
          onPress={handlePressContinueWithEmailBtn}
          size="100%"
          variant="ghost"
          fontSize="sm"
        >
          Continue with Email
        </Button>
      </BottomSheet>
    </ImageBackground>
  );
};

const Styled = {
  BottomSheet: styled.View`
    ${flexBox('column', 'center', 'center')};
    width: 100%;
    padding: 28px 16px;
    background-color: #fff;
  `,

  SocialLoginButton: styled(SocialLoginButton)``,

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
