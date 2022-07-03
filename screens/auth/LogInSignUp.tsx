import { useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import Button from 'components/Button';
import InputBase from 'components/Input';
import Text from 'components/Text';
import { useStores } from 'hooks/useStore';
import { LoginSignupScreenNavigationProp } from 'types/NavigationTypes';

type LoginSignUpProp = {
  navigation: LoginSignupScreenNavigationProp;
};

const LogInSignUp = (props: LoginSignUpProp) => {
  const { navigation } = props;
  const store = useStores().auth;
  const emailInputRef = useRef('');

  const onEmailInputChange = (text: string) => (emailInputRef.current = text);
  const handlePressNextBtn = useCallback(async () => {
    const { redirectTo, name } = await store.checkRegistration(
      emailInputRef.current
    );
    navigation.navigate(redirectTo, {
      name,
      email: emailInputRef.current,
    });
  }, [navigation, store]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Text fontWeight="bold" size="xl">
          Log in or Sign up{'\n'}with email
        </Text>

        <Styled.InputWrapper>
          <InputBase
            onChangeText={onEmailInputChange}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Enter email address"
          />
        </Styled.InputWrapper>
        <Button onPress={handlePressNextBtn} size="100%" variant="primary">
          Next
        </Button>
      </Styled.Container>
    </SafeAreaView>
  );
};

const Styled = {
  Container: styled.View`
    flex: 1;
    padding: 32px 16px 0 16px;
  `,

  InputWrapper: styled.View`
    padding: 0 8px;
    margin-top: 30px;
    margin-bottom: 60px;
  `,
};

export default LogInSignUp;
