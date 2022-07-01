import styled from 'styled-components';

export const Container = styled.div``;

export const Main = styled.main``;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 4rem 2rem;

  #container-arrow {
    width: 10rem;

    display: flex;
    justify-content: center;

    button {
      border: 0;
      background-color: transparent;
    }
  }

  #container-titles {
    max-width: 60%;
    text-align: center;
  }

  #container-buttons-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const FormCustom = styled.form`
  margin: 2rem 4rem;

  #align-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    @media (max-width: 900px) {
      display: flex;
      flex-direction: column;

      margin-bottom: 1rem;
    }
  }

  #align-switch {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  #align-button-save {
    width: 50%;
    margin-right: auto;
    margin-top: 10px;

    @media (max-width: 900px) {
      width: 100%;
    }
  }
`;
