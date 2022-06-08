import React from "react";
import styled from "styled-components/native";

function Home() {
  return (
    <Styled.Container>
      <Styled.Text>HOME</Styled.Text>
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

export default Home;
