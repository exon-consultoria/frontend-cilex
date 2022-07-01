import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  height: 85vh;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'a b';

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;

    margin-top: 4rem;
    gap: 4rem;
  }

  div#info-user {
    grid-area: a;
    align-self: center;
    justify-self: center;

    text-align: center;

    span:not(#activate-user) {
      color: ${props => props.theme.colors.main};
      font-weight: bold;
    }

    p {
      margin-bottom: 1rem;
    }
  }

  form {
    width: 80%;

    grid-area: b;
    align-self: center;
    justify-self: center;
  }
`;

export const FormCustom = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  #container-switch {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
`;

export const CheckboxContainer = styled.div`
  margin: auto;

  div {
    display: flex;
    gap: 5rem;
  }
`;

export const Select = styled.select`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 1rem;
  width: 100%;
`;
