import styled, { css } from 'styled-components';
import { lighten } from 'polished';

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

  #align-button-save {
    width: 50%;
    margin-right: auto;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  // custom select
  .select-custom {
    border: 2px solid #666360;
    border-radius: 10px;

    padding: 1rem;
    width: 100%;
  }

  // custom textarea
  textarea {
    border: 2px solid #666360;
    border-radius: 10px;

    padding: 1rem;
  }

  // custom textarea fonts
  textarea {
    font-size: 1rem;
    color: #666360;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const ContainerSwitch = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
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

export const ContainerInputDate = styled.div`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 70%;
    padding: 0.275rem;
    border: 1px solid ${lighten(0.5, '#666360')};
    border-radius: 10px;
  }
`;
