import { useRef, useCallback } from 'react';
import styled from 'styled-components/native';

import Button from 'components/Button/Button';
import Input from 'components/Input/Input';
import Text from 'components/Text/Text';
import { useStores } from 'hooks/useStore';
import { theme } from 'styles/theme';
import { EnterFullNameScreenProps } from 'types/NavigationTypes';

interface EnterFullNameProps {
  navigation: EnterFullNameScreenProps;
  route: { params: { email: string; password: string; name: string } };
}

const EnterFullName = (props: EnterFullNameProps) => {
  const { navigation, route } = props;
  const store = useStores();
  const nameInputRef = useRef('');

  const onChangeText = useCallback((text: string) => {
    nameInputRef.current = text;
  }, []);

  const handlePressSignUpBtn = useCallback(async () => {
    await store.auth.signup({
      ...route.params,
      name: nameInputRef.current,
    });
    navigation.navigate('/auth/send-verification', {
      accessToken: store.auth?.accessToken,
      email: route.params.email,
    });
  }, [navigation, route.params, store.auth]);

  return (
    <Styled.Container>
      <Text size="lg" fontWeight="bold">
        One last step
      </Text>
      <Text size="xl" fontWeight="bold">
        Enter your full name
      </Text>
      <Styled.InputWrapper>
        <Input onChangeText={onChangeText} />
      </Styled.InputWrapper>
      <Styled.HintWrapper>
        <Text size="xs" color={theme.colors.hintText}>
          Let your family and friends know who you are!
        </Text>
      </Styled.HintWrapper>
      <Button variant="primary" onPress={handlePressSignUpBtn}>
        Sign up
      </Button>
    </Styled.Container>
  );
};

export default EnterFullName;

const Styled = {
  Container: styled.View`
    flex: 1;
    padding: 32px 16px 0 16px;
  `,

  InputWrapper: styled.View`
    padding: 0 8px;
    margin-top: 30px;
    margin-bottom: 8px;
  `,

  HintWrapper: styled.View`
    margin-top: 8px;
    margin-bottom: 94px;
    padding: 0 8px;
  `,
};
