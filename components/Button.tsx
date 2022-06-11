import React from 'react';
import styled from 'styled-components/native';

import { flexBox } from '../styles/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost';
type ButtonSize = '100%';
type ButtonFontWeight = 300 | 400 | 500 | 600 | 700 | 900;

type ButtonProps = {
  variant: ButtonVariant;
  children: string;
  size: '100%';
  fontWeight?: ButtonFontWeight;
  onPress?: () => void;
};

function Button(props: ButtonProps) {
  const { variant, children, size, fontWeight, onPress, ...others } = props;

  return (
    <Styled.Button variant={variant} size={size} onPress={onPress} {...others}>
      <Styled.Text variant={variant} fontWeight={fontWeight}>
        {children}
      </Styled.Text>
    </Styled.Button>
  );
}

export default Button;

type StyledButtonProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
  fontWeight?: ButtonFontWeight;
};

const Styled = {
  Button: styled.TouchableOpacity<StyledButtonProps>`
    ${flexBox()};
    width: ${({ size }) => size};
    background-color: ${({ theme, variant }) => theme[variant]};
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 15px;
  `,

  Text: styled.Text<StyledButtonProps>`
    color: ${({ theme, variant }) =>
      variant === 'primary' ? theme.white : theme.text};
    font-size: 16px;
    font-weight: ${({ fontWeight }) => fontWeight || 400};
  `,
};
