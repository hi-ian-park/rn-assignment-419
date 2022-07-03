import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { flexBox } from 'styles/utils';

const NavigationBar = () => {
  const navigation = useNavigation();
  const handleGoBackBtn = () => navigation.goBack();
  return (
    <Styled.Header>
      <TouchableOpacity onPress={handleGoBackBtn}>
        <FontAwesome5 name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
    </Styled.Header>
  );
};

export default NavigationBar;

const Styled = {
  Header: styled.View`
    ${flexBox('row', 'center', 'start')}
    height: 50px;
  `,
};
