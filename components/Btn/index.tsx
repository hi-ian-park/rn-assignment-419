import { TypographyScale } from 'styled-components';
import styled from 'styled-components/native';

import Text from 'components/Text';

import { flexBox } from '../../styles/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost';
type ButtonSize = '100%';

export type ButtonProps = {
  variant?: ButtonVariant;
  backgroundColor?: string;
  size: '100%';
  fontSize?: TypographyScale;
  children?: any;
  onPress?: () => void;
};

function Button(props: ButtonProps) {
  const {
    variant,
    children,
    size,
    onPress,
    backgroundColor,
    fontSize,
    ...others
  } = props;

  return (
    <Styled.Button variant={variant} size={size} onPress={onPress} {...others}>
      {typeof children === 'string' ? (
        <Styled.Text variant={variant} size={fontSize}>
          {children}
        </Styled.Text>
      ) : (
        children
      )}
    </Styled.Button>
  );
}

export default Button;

// Styled
type StyledButtonProps = {
  variant: ButtonVariant;
  backgroundColor?: string;
  size?: ButtonSize;
};

type StyledTextProps = {
  variant: ButtonVariant;
};

const Styled = {
  Button: styled.TouchableOpacity<StyledButtonProps>`
    ${flexBox()};
    width: ${({ size }) => size};
    background-color: ${({ theme, variant, backgroundColor }) =>
      variant ? theme.colors[variant] : backgroundColor};
    border: ${({ variant }) =>
      variant === 'outlined' ? '1px solid #ECECEC' : 'none'};
    padding: 16px;
    border-radius: 15px;
  `,

  Text: styled(Text)<StyledTextProps>`
    color: ${({ theme, variant }) => {
      return variant === 'primary' ? theme.colors.white : theme.colors.text;
    }};
  `,
};
