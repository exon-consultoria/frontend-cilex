import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

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
  height: calc(100vh - 15vh);

  animation: ${appearFromLeft} 1s;
`;

export const Main = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 2rem;
`;

export const Module = styled(Link)`
  position: relative;

  width: 20rem;
  height: 15rem;
  padding: 1rem;

  text-decoration: none;
  text-align: center;
  color: #6a6c72;
  cursor: pointer;

  border: 1px solid ${props => props.theme.colors.mainHover};
  border-radius: 5%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    margin: 1rem 0;
    color: #161616;
  }

  &:hover {
    background-color: ${props => props.theme.colors.mainHover};
  }

  #notification {
    position: absolute;
    background: ${props => props.theme.colors.main};

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    padding: 8px;

    top: 1rem;
    right: 1rem;
  }
`;
