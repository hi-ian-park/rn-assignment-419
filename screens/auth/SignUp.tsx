import { useNavigation } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import Btn from 'components/Btn';
import PasswordInput from 'components/Input/Password';
import Text from 'components/Text';

interface SignUpProps {}

const RULES = {
  length: (value) => value.length >= 6 && value.length <= 20,
  atLeast1Letter: (value) => /[a-zA-Z]+/.test(value),
  atLeast1Number: (value) => /[0-9]+/.test(value),
  atLeast1SpecialCharacter: (value) =>
    // eslint-disable-next-line no-useless-escape
    /[!"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]+/.test(value),
};

const SignUp = (props: SignUpProps) => {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { route } = props;
  const onChangeText = (text: string) => setPassword(text);
  const handlePressNextBtn = useCallback(() => {
    const usable =
      RULES.length(password) &&
      RULES.atLeast1Letter(password) &&
      RULES.atLeast1Number(password) &&
      RULES.atLeast1SpecialCharacter(password);

    if (!usable) {
      alert('지원하는 비밀번호 형식이 아닙니다');
      return;
    }
    navigation.navigate('/auth/enter-full-name', { ...route.params, password });
  }, [navigation, password, route.params]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Text size="lg" fontWeight="bold">
          Nice to meet you 👋
        </Text>
        <Text size="xl" fontWeight="bold">
          Create your password
        </Text>
        <PasswordInput
          value={password}
          onChangeText={onChangeText}
          placeholder="Password"
          placeholderTextColor="#7b7b7b"
          textContentType="password"
          validation={RULES}
          isHint
        />
        <Btn size="100%" variant="primary" onPress={handlePressNextBtn}>
          Next
        </Btn>
      </Styled.Container>
    </SafeAreaView>
  );
};

export default SignUp;

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

  HelpText: styled.View`
    margin-top: 8px;
    padding: 0 8px;
  `,

  TextWrapper: styled.View`
    margin-bottom: 24px;
  `,
};
