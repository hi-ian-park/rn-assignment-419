import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import Button from 'components/Button';
import Text from 'components/Text';
import { useStores } from 'hooks/useStore';
import { theme } from 'styles/theme';
import { flexBox } from 'styles/utils';

interface SendVerificationProps {
  route: {
    params: {
      email: string;
      name: string;
    };
  };
}

// XXX: email 인증을 완료 했을 때 어떻게 이 페이지에서 home으로 redirect 시키지?
//    :: 딥링크 / 다이나믹링크!
const SendVerification = (props: SendVerificationProps) => {
  const store = useStores();
  const { route } = props;

  const handlePressResendBtn = async () => {
    console.log(store.auth.accessToken);
  };

  return (
    <Styled.Container>
      <Styled.InfoWrapper>
        <MaterialIcons
          name="mark-email-read"
          size={78}
          color="#ffcbda"
          style={{ marginBottom: 24 }}
        />
        <Text size="xl" fontWeight="bold" style={{ marginBottom: 20 }}>
          Verify your email address
        </Text>
        <Text size="lg" fontWeight="bold" style={{ marginBottom: 28 }}>
          {route.params.email}
        </Text>
        <Text
          size="xs"
          color={theme.colors.hintText}
          style={{ textAlign: 'center' }}
        >
          In order to start gifting to Korea with SodaGift{'\n'}
          please confirm your email address.
        </Text>
      </Styled.InfoWrapper>

      <Styled.ButtonWrapper>
        <Button variant="primary" size="100%">
          Open email
        </Button>
        <Button variant="ghost" size="100%" onPress={handlePressResendBtn}>
          <Text color={theme.colors.primary}>Resend email</Text>
        </Button>
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
};

export default SendVerification;

const Styled = {
  Container: styled.View`
    flex: 1;
    padding: 0 16px 60px 16px;
    justify-content: space-between;
  `,

  InfoWrapper: styled.View`
    ${flexBox('column', 'center', 'center')}
  `,

  ButtonWrapper: styled.View`
    ${flexBox('column', 'center', 'center')}
  `,
};
