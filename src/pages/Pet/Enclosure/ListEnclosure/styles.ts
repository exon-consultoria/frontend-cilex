import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  margin-top: 2rem;

  #align-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;

    button:last-child {
      background-color: #8dc73e;
      color: #fff;
      padding: 0.5rem;
      border: none;
      border-radius: 5%;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1rem;

      width: 8rem;
      height: 3rem;
    }
  }

  #align-content {
    width: 95%;

    padding: 0 2rem;

    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
