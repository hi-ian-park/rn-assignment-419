import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

import Btn, { ButtonProps } from 'components/Btn';
import { flexBox } from 'styles/utils';

type SocialLoginButtonProps = ButtonProps & {
  iconName?: string;
  iconColor?: string;
  backgroundColor: string;
};

const SocialLoginButton = (props: SocialLoginButtonProps) => {
  const {
    iconName,
    iconColor,
    backgroundColor,
    variant,
    size,
    onPress,
    children,
    ...ohters
  } = props;
  return (
    <Styled.Btn
      variant={variant}
      size={size}
      onPress={onPress}
      backgroundColor={backgroundColor}
      iconStyle={iconName}
    >
      <Styled.IconPlaceholder>
        <Styled.Icon name={iconName} size={24} color={iconColor} />
        <Styled.Text iconStyle={iconName}>{children}</Styled.Text>
      </Styled.IconPlaceholder>
    </Styled.Btn>
  );
};

export default SocialLoginButton;

type StyledSocialLoginButtonProps = {
  iconStyle: string;
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

const Styled = {
  Btn: styled(Btn)<StyledSocialLoginButtonProps>`
    background-color: ${({ iconStyle }) => iconColorMap[iconStyle].background};
  `,

  Text: styled.Text<StyledSocialLoginButtonProps>`
    color: ${({ iconStyle }) => iconColorMap[iconStyle].text};
    font-size: 16px;
  `,

  IconPlaceholder: styled.View`
    ${flexBox()};
    width: 100%;
  `,

  Icon: styled(FontAwesome5)`
    ${flexBox('row', 'center', 'start')};
    position: absolute;
    left: 10px;
  `,
};
