import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

interface ThemeInterface {
  theme: {
    body: string;
    text: string;
    toggleBackground: string;
    mainColor: string;
    navBar: string;
  };
}

export const GlobalStyle = createGlobalStyle<ThemeInterface>`
  ${reset}

	* { box-sizing: border-box; }
  body { margin: 0; }
  ol, ul, li { list-style: none; }
  a { text-decoration: none; cursor: pointer; }
  p,span { margin: 0; }

  :root {
    --primary: #886ce4;
    --primary-30: #886ce44d;
    --primary-50: #886ce480;

    --black: rgba(0, 0, 0, 1);
    --black-05: rgba(0, 0, 0, 0.05);
    --black-10: rgba(0, 0, 0, 0.1);
    --black-15: rgba(0, 0, 0, 0.15);
    --black-20: rgba(0, 0, 0, 0.2);
    --black-30: rgba(0, 0, 0, 0.3);
    --black-40: rgba(0, 0, 0, 0.4);
    --black-50: rgba(0, 0, 0, 0.5);
    --black-60: rgba(0, 0, 0, 0.6);
    --black-70: rgba(0, 0, 0, 0.7);
    --black-80: rgba(0, 0, 0, 0.8);
    --black-90: rgba(0, 0, 0, 0.9);

    --white: rgba(255, 255, 255, 1);
    --white-05: rgba(255, 255, 255, 0.05);
    --white-10: rgba(255, 255, 255, 0.1);
    --white-15: rgba(255, 255, 255, 0.15);
    --white-20: rgba(255, 255, 255, 0.2);
    --white-30: rgba(255, 255, 255, 0.3);
    --white-40: rgba(255, 255, 255, 0.4);
    --white-50: rgba(255, 255, 255, 0.5);
    --white-60: rgba(255, 255, 255, 0.6);
    --white-70: rgba(255, 255, 255, 0.7);
    --white-80: rgba(255, 255, 255, 0.8);
    --white-90: rgba(255, 255, 255, 0.9);

    --box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15), -7px -7px 20px rgba(255, 255, 255, 1), inset 0px 0px 4px rgba(255, 255, 255, 0.2), inset 7px 7px 15px rgba(55, 84, 170, 0), inset -7px -7px 20px rgba(255, 255, 255, 0), 0px 0px 4px rgba(255, 255, 255, 0);
  }
`;

export default GlobalStyle;
