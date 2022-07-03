import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef, useCallback } from 'react';
import styled from 'styled-components/native';

import Button from 'components/Button';
import InputBase from 'components/Input';
import Text from 'components/Text';
import { useStores } from 'hooks/useStore';
import { theme } from 'styles/theme';
import { AuthStackParamList } from 'types/NavigationTypes';

interface EnterFullNameProps {
  navigation: NativeStackScreenProps<AuthStackParamList>['navigation'];
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
        <InputBase onChangeText={onChangeText} placeholderTextColor="#7b7b7b" />
      </Styled.InputWrapper>
      <Styled.HintWrapper>
        <Text size="xs" color={theme.colors.hintText}>
          Let your family and friends know who you are!
        </Text>
      </Styled.HintWrapper>
      <Button variant="primary" size="100%" onPress={handlePressSignUpBtn}>
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
