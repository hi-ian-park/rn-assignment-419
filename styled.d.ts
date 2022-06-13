// import original module declarations
import 'styled-components';
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      overlayBackground: string;
      primary: string;
      ghost: string;
      text: string;
    };

    levels: {
      overlay: number;
      bottomSheetModal: number;
    };
  }
}
