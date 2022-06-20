import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { flexBox } from 'styles/utils';

interface NavigationBarProps {}

const NavigationBar = (props: NavigationBarProps) => {
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

// FIXME: base component에 margin 노노 수정방법 생각할 것
const Styled = {
  Header: styled.View`
    ${flexBox('row', 'center', 'start')}
    height: 50px;
  `,
};
