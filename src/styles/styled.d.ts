import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      main: string;
      mainHover: string;
      green: string;
    };
  }
}
