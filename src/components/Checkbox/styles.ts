import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    all: unset;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #666360;
    border-radius: 0.25rem;
  }

  input[type='checkbox']:checked {
    border-color: ${props => props.theme.colors.main};
    background: ${props => props.theme.colors.mainHover};
  }
`;
