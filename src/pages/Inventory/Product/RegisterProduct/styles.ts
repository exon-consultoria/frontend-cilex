import styled, { css } from 'styled-components';

interface InputFileProps {
  hasThumb?: string;
}

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 0.5fr 1fr 1fr;
  grid-gap: 10px;
`;

export const Main = styled.main`
  padding: 0 2rem 2rem 2rem;
`;

export const FormCustom = styled.form`
  #align-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    margin-bottom: 1rem;

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

    @media (max-width: 900px) {
      width: 100%;
    }
  }
`;

export const ContainerInputFile = styled.label<InputFileProps>`
  border: 1px dashed #666360;
  border-radius: 10px;
  background-size: cover;
  cursor: pointer;
  height: 10rem;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-right: 1rem;
  }

  input {
    display: none;
  }

  ${props =>
    props.hasThumb &&
    css`
      border: 0;
    `}

  .has-thumbnail {
    border: 0;
    padding: 10rem;
  }

  .has-thumbnail img {
    display: none;
  }
`;
