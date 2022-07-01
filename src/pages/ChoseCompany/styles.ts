import styled, { keyframes } from 'styled-components';

const appearFromBottom = keyframes`
 from {
  opacity: 0;
  transform: translateY(-100px);

 }
 to {
  opacity:1;
  transform: translateY(0)
 }
`;

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 0.3fr 1fr;
  grid-gap: 1rem;

  animation: ${appearFromBottom} 0.6s;
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  padding-top: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Options = styled.div`
  img {
    height: 100%;
    width: 100%;

    @media (max-width: 900px) {
      display: none;
    }
  }
`;

export const Companies = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 70vh;

  padding: 0 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Company = styled.button`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.main};
  border-radius: 3rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: transparent;

  & + button {
    margin-top: 0.5rem;
  }

  svg {
    color: ${props => props.theme.colors.main};
  }

  &:hover {
    background-color: ${props => props.theme.colors.main};
    color: white;

    svg {
      color: white;
    }
  }

  span {
    margin-left: 1rem;
  }
`;
