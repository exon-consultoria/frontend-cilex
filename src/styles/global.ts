import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background-color: #FEFFFE;
    color: rgb(22, 22, 22);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, select {
    font-family: 'Sora', sans-serif;
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .button-filled {
    background: ${props => props.theme.colors.main};
    color: #fff;

    &:hover {
      background-color: ${props => props.theme.colors.mainHover};
    }
  }

  .button-outline {
    background: rgba(0, 0, 0, 0);
    color: ${props => props.theme.colors.main};
    border: 1px solid ${props => props.theme.colors.main};
  }

  .button-green {
    background-color: ${props => props.theme.colors.green};
    color: #fff;
  }
`;
