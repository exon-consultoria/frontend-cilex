import { lighten } from 'polished';
import styled, { css } from 'styled-components';

interface InputFileProps {
  hasThumb: boolean;
}

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

export const ContainerPetData = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: space-around;
  align-items: center;

  margin: 4rem 2rem;
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0;

  h4 {
    font-weight: bold;
    color: ${props => props.theme.colors.main};
  }

  span {
    max-width: 100%;
    word-break: break-all;
    text-align: center;
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

  #align-button-save {
    width: 50%;
    margin-right: auto;
    margin-top: 10px;

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
