import { ReactChildren } from 'react';
import styled from 'styled-components/native';

import { flexBox } from '../styles/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost';
type ButtonSize = '100%';
type ButtonFontWeight = 300 | 400 | 500 | 600 | 700 | 900;

type ButtonProps = {
  variant: ButtonVariant;
  size: '100%';
  children?: ReactChildren | string;
  fontWeight?: ButtonFontWeight;
  onPress?: () => void;
};

// TODO: children 일 때랑 일반 text가 들어올 때랑 다르게 만들어야 할 것 같다.
// ex) Facebook 로그인 아이콘이 들어온다면 Text 안에서는 안될 것 같으니까.
// 어느정도 추상화를 해야 할까??

function Button(props: ButtonProps) {
  const { variant, children, size, fontWeight, onPress, ...others } = props;

  if (typeof children === 'string')
    return (
      <Styled.Button
        variant={variant}
        size={size}
        onPress={onPress}
        {...others}
      >
        <Styled.Text variant={variant} fontWeight={fontWeight}>
          {children}
        </Styled.Text>
      </Styled.Button>
    );

  return (
    <Styled.Button variant={variant} size={size} onPress={onPress} {...others}>
      {children}
    </Styled.Button>
  );
}

export default Button;

// Styled
type StyledButtonProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
  fontWeight?: ButtonFontWeight;
};

const Styled = {
  Button: styled.TouchableOpacity<StyledButtonProps>`
    ${flexBox()};
    width: ${({ size }) => size};
    background-color: ${({ theme, variant }) => theme.colors[variant]};
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 15px;
  `,

  Text: styled.Text<StyledButtonProps>`
    color: ${({ theme, variant }) =>
      variant === 'primary' ? theme.colors.white : theme.colors.text};
    font-size: 16px;
    font-weight: ${({ fontWeight }) => fontWeight || 400};
  `,
};
