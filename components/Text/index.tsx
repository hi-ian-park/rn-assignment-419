import { TextStyle } from 'react-native';
import { TypographyScale } from 'styled-components';
import styled from 'styled-components/native';

import { textStyle } from 'styles/utils';

type TextFontWeightType = 'regular' | 'semiBold' | 'bold';
type TextDecorationType = 'line-through' | 'underline' | 'none';

type TextProps = StyledTextProps & {
  children: any;
  style?: TextStyle;
  textDecoration?: TextDecorationType;
};

const Text = (props: TextProps) => {
  const {
    children,
    size,
    color,
    fontWeight,
    textDecoration = 'none',
    style,
  } = props;

  // TODO: 이거먼저 밑줄, 취소선 style을 기본컴포넌트에서 만드는 방법 찾기
  return (
    <Styled.Text
      size={size}
      color={color}
      fontWeight={fontWeight}
      textDecoration={textDecoration}
      style={style}
    >
      {children}
    </Styled.Text>
  );
};

export default Text;

type StyledTextProps = {
  size?: TypographyScale;
  color?: string;
  fontWeight?: TextFontWeightType;
  textDecoration?: TextDecorationType;
};

const Styled = {
  Text: styled.Text<StyledTextProps>`
    font-family: ${({ theme, fontWeight }) =>
      theme.fontFamilies[fontWeight ?? 'regular']};
    ${({ size }) => textStyle(size ?? 'base')};
    color: ${({ theme, color }) => color ?? theme.colors.text};
    text-decoration: ${({ textDecoration }) => textDecoration}; ;
  `,
};
