import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 60%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2rem;

  #containerHeader {
    display: flex;
    align-items: center;
    gap: 2rem;

    button {
      display: grid;
      align-self: center;
      padding: 0.5rem;
      border: none;
      background: transparent;
    }
  }

  #contentCompromises {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    text-align: center;
  }
`;
