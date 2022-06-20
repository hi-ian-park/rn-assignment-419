import React, { useRef, useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Text from 'components/Text';

import InputBase from '.';

type PasswordInputProps = TextInputProps & {
  value: string;
  isHint?: boolean;
};

const RULES = {
  length: (value) => value.length >= 6 && value.length <= 20,
  atLeast1Letter: (value) => /[a-zA-Z]+/.test(value),
  atLeast1Number: (value) => /[0-9]+/.test(value),
  atLeast1SpecialCharacter: (value) =>
    /[!"#$%&'()*+,-./:;<=>?@\[\\\]^_`{|}~]+/.test(value),
};

const PasswordInput = ({ value, ...props }: PasswordInputProps) => {
  const { isHint } = props;

  const [hidePassword, setHidePassword] = useState(true);
  const handleShowPassword = () => setHidePassword(!hidePassword);
  const usable =
    RULES.length(value) &&
    RULES.atLeast1Letter(value) &&
    RULES.atLeast1Number(value) &&
    RULES.atLeast1SpecialCharacter(value);
  const isHelpTextShow = isHint && !usable;

  const hintStatus = () => {
    if (isHint && !usable) return 'hint';
    if (usable) return 'success';
    else return 'none';
  };

  const helpText = {
    hint: (
      <Styled.HintWrapper>
        <Text size="xs">
          Your password should be{' '}
          <Text
            size="xs"
            fontWeight="bold"
            textDecoration={RULES.length(value) ? 'line-through' : 'none'}
          >
            6-20 characters
          </Text>{' '}
          long and must contain{' '}
          <Text
            size="xs"
            fontWeight="bold"
            textDecoration={
              RULES.atLeast1Letter(value) ? 'line-through' : 'none'
            }
          >
            1 letter
          </Text>
          ,{' '}
          <Text
            size="xs"
            fontWeight="bold"
            textDecoration={
              RULES.atLeast1Number(value) ? 'line-through' : 'none'
            }
          >
            1 number
          </Text>{' '}
          and{' '}
          <Text
            size="xs"
            fontWeight="bold"
            textDecoration={
              RULES.atLeast1SpecialCharacter(value) ? 'line-through' : 'none'
            }
          >
            1 special character
          </Text>
          .
        </Text>
      </Styled.HintWrapper>
    ),
    success: (
      <Text size="xs" color="#00cb61">
        Now, that's a secure password 👍
      </Text>
    ),
    error: (
      <Text size="xs" color="#ff4747">
        You got a wrong number
      </Text>
    ),
    none: null,
  };

  return (
    <Styled.Container>
      <Styled.Input {...props} secureTextEntry={hidePassword} usable={usable} />
      <Styled.HelpText>
        {helpText[hintStatus()]}
        <TouchableOpacity onPress={handleShowPassword}>
          <Text size="sm" style={{ textDecorationLine: 'underline' }}>
            {hidePassword ? 'Show password' : 'Hide password'}
          </Text>
        </TouchableOpacity>
      </Styled.HelpText>
    </Styled.Container>
  );
};

export default PasswordInput;

const Styled = {
  Container: styled.View`
    margin: 30px 0 60px 0;
    padding: 0 8px;
  `,

  // TODO: isFocus일 때 제대로 동작 하도록
  Input: styled(InputBase)`
    border-bottom-color: ${({ theme, isFocus, usable }) =>
      usable
        ? '#00cb61'
        : isFocus
        ? theme.colors.text
        : theme.colors.placeholder};
  `,

  HintWrapper: styled.View`
    margin-bottom: 24px;
  `,

  HelpText: styled.View`
    margin-top: 8px;
    padding: 0 8px;
  `,
};