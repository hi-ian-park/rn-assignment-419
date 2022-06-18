// import original module declarations
import 'styled-components';
// and extend them!
declare module 'styled-components' {
  export type TypographyScale =
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'base'
    | 'md'
    | 'lg'
    | 'xl';
  export interface DefaultTheme {
    colors: {
      white: string;
      overlayBackground: string;
      primary: string;
      border: string;
      ghost: string;
      text: string;
      placeholder: string;
    };

    fontFamilies: {
      bold: string;
      semiBold: string;
      regular: string;
    };

    fontSizes: {
      xxs: string;
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
    };

    lineHeights: {
      xxs: string;
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
    };

    levels: {
      overlay: number;
      bottomSheetModal: number;
    };
  }
}
