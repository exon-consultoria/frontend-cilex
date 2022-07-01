import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;
`;

export const Content = styled.div`
  position: relative;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;

  max-width: 100%;
  max-height: 100%;

  #button-exit {
    position: absolute;
    top: 1rem;
    right: 1rem;

    width: 2rem;
    height: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    outline: none;
    background-color: transparent;
  }
`;
