import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
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

  animation: ${appearFromLeft} 1s;
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 15.5rem));
  grid-template-rows: repeat(auto-fit, minmax(10rem, 12.5rem));
  gap: 1rem;
  justify-content: center;
`;
