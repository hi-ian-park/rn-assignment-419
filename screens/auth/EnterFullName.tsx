import { useRef } from 'react';
import styled from 'styled-components/native';

import Btn from 'components/Btn';
import InputBase from 'components/Input';
import Text from 'components/Text';
import { getToken } from 'service/auth.storage';
import { useStores } from 'store/useStore';
import { theme } from 'styles/theme';

interface EnterFullNameProps {}

const EnterFullName = (props: EnterFullNameProps) => {
  const store = useStores();
  const nameInputRef = useRef('');
  const onChangeText = (text) => {
    nameInputRef.current = text;
  };
  const handlePressSignUpBtn = async () => {
    await store.auth.signup({
      ...props.route.params,
      name: nameInputRef.current,
    });
    const token = await getToken();
    console.log(token);
  };
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
      <Btn variant="primary" size="100%" onPress={handlePressSignUpBtn}>
        Sign up
      </Btn>
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
