import { DefaultTheme } from 'styled-components';

const colors = {
  white: '#fff',
  overlayBackground: '#111',
  primary: '#ff3c78',
  ghost: 'transparent',
  border: '#bfbfbf',
  text: '#0f0f0f',
  hintText: '#3c3c3c',
  placeholder: '#7b7b7b',
};

const fontFamilies = {
  bold: 'Poppins_600SemiBold',
  semiBold: 'Poppins_500Medium',
  regular: 'Poppins_400Regular',
};

const fontSizes = {
  xxs: '12px',
  xs: '13px',
  sm: '14px',
  base: '16px',
  md: '18px',
  lg: '20px',
  xl: '24px',
};

const lineHeights = {
  xxs: '16px',
  xs: '20px',
  sm: '24px',
  base: '24px',
  md: '28px',
  lg: '30px',
  xl: '34px',
};

const levels = {
  overlay: 100,
  bottomSheetModal: 200,
};

export const theme: DefaultTheme = {
  colors,
  fontFamilies,
  fontSizes,
  lineHeights,
  levels,
};
