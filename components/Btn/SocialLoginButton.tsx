import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';
import styled from 'styled-components/native';

import Btn, { ButtonProps } from 'components/Btn';
import Text from 'components/Text';
import { flexBox } from 'styles/utils';

type SocialLoginButtonProps = ButtonProps & {
  iconName?: string;
  iconColor?: string;
  backgroundColor: string;
};

const iconColorMap = {
  facebook: {
    text: '#fff',
    background: '#007dff',
  },
  apple: {
    text: '#fff',
    background: '#0f0f0f',
  },
  google: {
    text: '#000',
    background: 'transparent',
  },
} as const;

const SocialLoginButton = (props: SocialLoginButtonProps) => {
  const { iconName, iconColor, children } = props;
  return (
    <Styled.Btn {...props} iconStyle={iconName}>
      <Styled.IconPlaceholder>
        <Styled.Icon name={iconName} size={24} color={iconColor} />
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text color={iconColorMap[iconName].text}>{children}</Text>
        </View>
      </Styled.IconPlaceholder>
    </Styled.Btn>
  );
};

export default SocialLoginButton;

type StyledSocialLoginButtonProps = {
  iconStyle: string;
  backgroundColor: string;
};

const Styled = {
  Btn: styled(Btn)<StyledSocialLoginButtonProps>`
    background-color: ${({ iconStyle }) => iconColorMap[iconStyle].background};
  `,

  IconPlaceholder: styled.View`
    width: 100%;
    flex-direction: row;
  `,

  Icon: styled(FontAwesome5)`
    ${flexBox('row', 'center', 'center')};
    position: absolute;
  `,
};
