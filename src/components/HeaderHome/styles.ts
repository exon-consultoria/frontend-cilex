import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 15% 1fr 15%;
  text-align: center;
  align-items: center;
  margin-top: 1rem;

  padding: 0 1rem;

  button {
    max-width: 4rem;
    margin: 0 auto;
  }

  #container-logo {
    width: 5rem;
    margin: 0 auto;

    @media (max-width: 900px) {
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }

    @media (min-width: 900px) {
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }
`;

export const Greetings = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h2 {
    font-size: 2.5rem;
    color: #161616;
  }

  h3 {
    font-size: 1.25rem;
  }

  @media (max-width: 900px) {
    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1rem;
    }
  }
`;
