import { TypographyScale } from 'styled-components';

import { theme } from 'styles/theme';

// XXX: letter-spacing이 있다면 추가 하기
export const textStyle = (size: TypographyScale = 'base') => `
  font-size: ${theme.fontSizes[size]};
  line-height: ${theme.lineHeights[size]};
`;
