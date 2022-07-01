import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 15.5rem));
  grid-template-rows: repeat(auto-fit, minmax(10rem, 12.5rem));
  gap: 1rem;
  justify-content: center;
`;
