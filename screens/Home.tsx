import styled from 'styled-components/native';

import Text from 'components/Text';

function Home() {
  return (
    <Styled.Container>
      <Text size="xl" fontWeight="bold">
        HOME
      </Text>
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
