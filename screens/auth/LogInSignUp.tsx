import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import Btn from 'components/Btn';
import InputBase from 'components/Input';
import Text from 'components/Text';
import { useStores } from 'store/useStore';

function LogInSignUp() {
  const store = useStores().authStore;
  const navigation = useNavigation();
  const emailInputRef = useRef('');
  const onChangeText = (text: string) => (emailInputRef.current = text);
  const handlePressNextBtn = async () => {
    const data = await store.checkRegistration(emailInputRef.current);
    if (data.registered)
      navigation.navigate('/auth/login', {
        name: data.name,
        email: emailInputRef.current,
      });
    else
      navigation.navigate('/auth/signup', {
        email: emailInputRef.current,
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Text fontWeight="bold" size="xl">
          Log in or Sign up{'\n'}with email
        </Text>

        <Styled.InputWrapper>
          <InputBase
            onChangeText={onChangeText}
            keyboardType="email-address"
            placeholder="Enter email address"
            placeholderTextColor="#7b7b7b"
          />
        </Styled.InputWrapper>
        <Btn onPress={handlePressNextBtn} size="100%" variant="primary">
          Next
        </Btn>
      </Styled.Container>
    </SafeAreaView>
  );
}

const Styled = {
  Container: styled.View`
    flex: 1;
    padding: 32px 16px 0 16px;
  `,

  H1: styled(Text)`
    margin-bottom: 24px;
  `,

  // 디자인 상에서는 with Label Text Fields 이지만, 실제로 Label이 없기 때문에 margin으로 스타일링
  InputWrapper: styled.View`
    padding: 0 8px;
    margin-top: 30px;
    margin-bottom: 60px;
  `,
};

export default LogInSignUp;
