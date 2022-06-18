import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import NavigationBar from 'components/Bars/NavigationBar';
import Btn from 'components/Btn';
import InputBase from 'components/Input';
import Text from 'components/Text';
import { flexBox } from 'styles/utils';

function LogInSignUp() {
  const navigation = useNavigation();
  const emailInputRef = useRef('');
  const onChangeText = (text: string) => (emailInputRef.current = text);
  const handlePressNextBtn = async () => {
    console.log('next button!');
    const response = await fetch(
      'https://auth-dev.sodacrew.com/auth/check-registration',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          email: emailInputRef.current,
        }),
      }
    ).catch((err) => Alert.alert(err));
    console.log(response.status);
    const data = await response.json();

    console.log(data);
    if (data.registered) navigation.navigate('/auth/login');
    else navigation.navigate('/auth/signup');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <NavigationBar />
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
    padding: 0 16px;
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
