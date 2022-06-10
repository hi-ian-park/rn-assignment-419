import React from 'react';
import styled from 'styled-components/native';

function Account() {
  return (
    <Styled.Container>
      <Styled.Text>Account</Styled.Text>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,

  Text: styled.Text`
    font-size: 36px;
  `,
};

export default Account;
