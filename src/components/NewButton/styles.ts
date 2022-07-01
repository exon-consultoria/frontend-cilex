import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  background-color: #8dc73e;
  color: #fff;
  padding: 0.5rem;
  text-decoration: none;
  border-radius: 5%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;

  width: 8rem;
  height: 3rem;
`;
