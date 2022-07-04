import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import Button from 'components/Button/Button';
import PasswordInput from 'components/Input/Password';
import Text from 'components/Text/Text';
import { useStores } from 'hooks/useStore';
import { theme } from 'styles/theme';
import { LoginScreenProps } from 'types/NavigationTypes';

interface LoginProps {
  navigation: LoginScreenProps;
  route: {
    params: {
      email: string;
      name: string;
    };
  };
}

const Login = ({ navigation, route }: LoginProps) => {
  const store = useStores();
  const [password, setPassword] = useState('');
  const onPasswordInputChange = (text: string) => setPassword(text);
  const handlePressLoginBtn = async () => {
    const { response, message } = await store.auth.login({
      email: route.params.email,
      password,
    });

    if (response.status !== 200) {
      alert(message);
    } else {
      await store.setCurrentUser();
      const isEmailVerified = store.checkActiveUser;
      if (isEmailVerified) {
        navigation.navigate('/', {
          screen: '/home',
        });
      } else {
        navigation.navigate('/auth/send-verification', {
          ...route.params,
          password,
        });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Styled.Container>
        <Text size="lg" fontWeight="bold">
          Hi, {route.params.name}
        </Text>
        <Text size="xl" fontWeight="bold">
          Enter your password
        </Text>
        <PasswordInput
          value={password}
          onChangeText={onPasswordInputChange}
          placeholder="Password"
          textContentType="password"
        />
        <Button variant="primary" onPress={handlePressLoginBtn}>
          <Text fontWeight="bold" color={theme.colors.white}>
            Login
          </Text>
        </Button>
        <Button variant="ghost">
          <Text fontWeight="semiBold" color={theme.colors.primary}>
            Forgot password?
          </Text>
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

  Text: styled.Text`
    font-size: 36px;
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
};

export default Login;
