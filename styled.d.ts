// import original module declarations
import 'styled-components';

type FlexDirection = 'row' | 'column';
type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'start' | 'end';
type FlexJustify =
  | FlexAlign
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    white: string;
    tint: string;
    text: string;
    flexBox: (
      direction: FlexDirection,
      align: FlexAlign,
      justify: FlexJustify
    ) => string;
  }
}
