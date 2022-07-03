import { useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

import { theme } from 'styles/theme';
import { flexBox, textStyle } from 'styles/utils';

type InputBaseProps = TextInputProps & {
  label?: string;
  error?: any;
};

const InputBase = (props: InputBaseProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = useCallback(() => setIsFocus(true), []);
  const handleBlur = useCallback(() => setIsFocus(false), []);

  return (
    // FIXME: type 에러 고치기
    <Styled.Input
      {...props}
      isFocus={isFocus}
      onFocus={handleFocus}
      onBlur={handleBlur}
      selectionColor={theme.colors.primary}
      placeholderTextColor={theme.colors.placeholder}
    />
  );
};

export default InputBase;

type StyledInputType = {
  isFocus: boolean;
  usable?: boolean;
};

const Styled = {
  Input: styled.TextInput<StyledInputType>`
    ${flexBox()}
    ${textStyle('sm')}
    font-family: ${({ theme }) => theme.fontFamilies.regular};
    padding: 12px 8px;
    border-bottom-color: ${({ isFocus, theme }) =>
      isFocus ? theme.colors.text : theme.colors.border};
    border-bottom-width: 1px;
  `,
};
