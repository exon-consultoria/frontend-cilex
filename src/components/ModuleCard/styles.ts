import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  position: relative;

  padding: 2rem;

  text-decoration: none;
  color: #6a6c72;
  cursor: pointer;

  border: 1px solid ${props => props.theme.colors.mainHover};
  border-radius: 5%;

  display: flex;
  flex-direction: column;

  .bi,
  .fas {
    color: ${props => props.theme.colors.main};
    font-size: 2.5rem;
  }

  h3 {
    margin: 0.5rem 0;
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
