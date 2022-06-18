import { useState, useRef } from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

import { flexBox, textStyle } from 'styles/utils';

type InputBaseProps = TextInputProps & {
  label?: string;
  error?: any;
};

const InputBase = (props: InputBaseProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    // FIXME: type 에러 고치기
    <Styled.Input
      {...props}
      isFocus={isFocus}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
};

export default InputBase;

type StyledInputType = {
  isFocus: boolean;
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
