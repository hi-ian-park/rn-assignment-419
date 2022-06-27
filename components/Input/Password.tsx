import { useCallback, useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Text from 'components/Text';

import InputBase from '.';

type PasswordValidationType = {
  [key: string]: (text: string) => boolean;
};

type PasswordInputProps = TextInputProps & {
  value: string;
  validation?: PasswordValidationType;
  isHint?: boolean;
};

const PasswordInput = ({ value, validation, ...props }: PasswordInputProps) => {
  const { isHint } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const handleShowPassword = () => setHidePassword(!hidePassword);
  const usable =
    validation?.length(value) &&
    validation?.atLeast1Letter(value) &&
    validation?.atLeast1Number(value) &&
    validation?.atLeast1SpecialCharacter(value);

  const getHintStatus = useCallback(() => {
    if (isHint && !usable) return 'hint';
    if (usable) return 'success';
    else return 'none';
  }, [isHint, usable]);

  const helpText = {
    hint: (
      <Styled.HintWrapper>
        <Text size="xs">
          Your password should be{' '}
          <Text
            size="xs"
            fontWeight="bold"
            textDecoration={validation?.length(value) ? 'line-through' : 'none'}
          >
            6-20 characters
          </Text>{' '}
          long and must contain{' '}
          <Text
            size="xs"
            fontWeight="bold"
            textDecoration={
              validation?.atLeast1Letter(value) ? 'line-through' : 'none'
            }
          >
            1 letter
          </Text>
          ,{' '}
          <Text
            size="xs"
            fontWeight="bold"
            textDecoration={
              validation?.atLeast1Number(value) ? 'line-through' : 'none'
            }
          >
            1 number
          </Text>{' '}
          and{' '}
          <Text
            size="xs"
            fontWeight="bold"
            textDecoration={
              validation?.atLeast1SpecialCharacter(value)
                ? 'line-through'
                : 'none'
            }
          >
            1 special character
          </Text>
          .
        </Text>
      </Styled.HintWrapper>
    ),
    success: (
      <Styled.HintWrapper>
        <Text size="xs" color="#00cb61">
          Now, that's a secure password 👍
        </Text>
      </Styled.HintWrapper>
    ),
    error: (
      <Styled.HintWrapper>
        <Text size="xs" color="#ff4747">
          You got a wrong number
        </Text>
      </Styled.HintWrapper>
    ),
    none: null,
  };

  return (
    <Styled.Container>
      <Styled.Input {...props} secureTextEntry={hidePassword} usable={usable} />
      <Styled.HelpText>
        {helpText[getHintStatus()]}
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
