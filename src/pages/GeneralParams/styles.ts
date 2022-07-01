import styled, { css } from 'styled-components';

interface InputFileProps {
  hasThumb?: string;
}

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin: 0 auto;
  padding: 2rem;
  max-width: 1080px;
`;

export const Section = styled.section`
  & + & {
    border-top: 1px solid black;
    padding-top: 1rem;
    margin-top: 1rem;
  }

  .box-input {
    margin-top: 2rem;
    display: flex;

    input {
      margin-left: 2rem;
    }

    input + span {
      margin-left: 2rem;
    }
  }
`;

export const ContainerInputFile = styled.label<InputFileProps>`
  border: 1px dashed #666360;
  border-radius: 10px;
  background-size: cover;
  cursor: pointer;
  height: 10rem;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-right: 1rem;
  }

  input {
    display: none;
  }

  ${props =>
    props.hasThumb &&
    css`
      border: 0;

      img,
      span {
        display: none;
      }
    `}
`;

export const ContainerActions = styled.div`
  display: flex;
  gap: 1rem;
`;
