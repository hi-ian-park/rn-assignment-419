import React, { useCallback, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { flexBox } from 'styles/utils';

type BottomSheetProps = {
  visible: boolean;
  children: React.ReactNode;
  onCloseModal: () => void;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheet = (props: BottomSheetProps) => {
  const { children, visible, onCloseModal } = props;

  return (
    <>
      <Styled.Container visible={visible}>{children}</Styled.Container>
      <Styled.Overlay
        visible={visible}
        activeOpacity={0.5}
        onPressOut={onCloseModal}
      />
    </>
  );
};

export default BottomSheet;

type StyledBottomSheetProps = {
  visible: boolean;
};

const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT / 2.75;

const Styled = {
  Container: styled(Animated.View)<StyledBottomSheetProps>`
    ${flexBox('column', 'center', 'center')};
    position: absolute;
    bottom: ${({ visible }) => (visible ? 0 : -BOTTOM_SHEET_HEIGHT)};
    width: 100%;
    height: ${BOTTOM_SHEET_HEIGHT};
    padding: 28px 16px;
    background-color: #fff;
    border-radius: 25px;
    z-index: ${({ theme }) => theme.levels.bottomSheetModal};
  `,

  Overlay: styled.TouchableOpacity<StyledBottomSheetProps>`
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
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
