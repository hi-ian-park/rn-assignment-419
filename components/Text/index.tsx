import React from 'react';
import { TypographyScale } from 'styled-components';
import styled from 'styled-components/native';

import { textStyle } from 'styles/utils';

type TextFontWeightType = 'regular' | 'semiBold' | 'bold';

type TextProps = StyledTextProps & {
  children: React.ReactChildren | string;
};

const Text = (props: TextProps) => {
  const { children, size, color, fontWeight } = props;

  return (
    <Styled.Text size={size} color={color} fontWeight={fontWeight}>
      {children}
    </Styled.Text>
  );
};

export default Text;

type StyledTextProps = {
  size?: TypographyScale;
  color?: string;
  fontWeight?: TextFontWeightType;
};

const Styled = {
  Text: styled.Text<StyledTextProps>`
    font-family: ${({ theme, fontWeight }) =>
      theme.fontFamilies[fontWeight ?? 'regular']};
    ${({ size }) => textStyle(size ?? 'base')};
    color: ${({ theme, color }) => color ?? theme.colors.text};
  `,
};
