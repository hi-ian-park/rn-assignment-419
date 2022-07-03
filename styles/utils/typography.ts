import { TypographyScale } from 'styled-components';

import { theme } from 'styles/theme';

export const textStyle = (size: TypographyScale = 'base') => `
  font-size: ${theme.fontSizes[size]};
  line-height: ${theme.lineHeights[size]};
`;
