import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromRight = keyframes`
 from {
  opacity: 0;
  transform: translateX(-100px);

 }
 to {
  opacity:1;
  transform: translateX(0)
 }
`;

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 0.5fr 1fr;
  grid-gap: 50px;

  animation: ${appearFromRight} 1s;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.3fr;
  text-align: center;
  margin-top: 30px;
  button {
    max-width: 100px;
  }
  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #ff7a00;
  }
`;

export const Greetings = styled.div`
  margin-right: 5px;
  h2 {
    margin-bottom: 5px;
    font-size: 3vw;
  }

  h3 {
    margin-bottom: 15px;
    font-size: 1.5vw;
  }
`;

export const Options = styled.main`
  display: grid;
  grid-template-columns: 0.3fr 0.4fr 0.3fr;

  button {
    max-width: 200px;
    margin: auto;
  }

  img {
    height: 400px;
    margin: auto;
  }
`;
