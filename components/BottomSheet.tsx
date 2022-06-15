import React from 'react';
import { Dimensions, Modal } from 'react-native';
import styled from 'styled-components/native';

import { flexBox } from 'styles/utils';

type BottomSheetProps = {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheet = (props: BottomSheetProps) => {
  const { children, visible, onClose } = props;

  return (
    <Modal
      animationType="slide"
      transparent
      hardwareAccelerated
      visible={visible}
    >
      <Styled.Container>{children}</Styled.Container>
      <Styled.Overlay activeOpacity={0.5} onPressOut={onClose} />
    </Modal>
  );
};

export default BottomSheet;

const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT / 2.75;

const Styled = {
  Container: styled.View`
    ${flexBox('column', 'center', 'center')};
    position: absolute;
    width: 100%;
    bottom: 0;
    height: ${BOTTOM_SHEET_HEIGHT};
    padding: 28px 16px;
    background-color: #fff;
    border-radius: 25px;
    z-index: ${({ theme }) => theme.levels.bottomSheetModal};
  `,

  Overlay: styled.TouchableOpacity`
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${({ theme }) => theme.levels.overlay};
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.overlayBackground};
    opacity: 0.5;
  `,
};
