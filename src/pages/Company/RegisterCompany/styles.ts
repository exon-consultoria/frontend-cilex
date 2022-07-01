import styled, { css } from 'styled-components';

interface ModuleProps {
  selected: boolean;
}

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 0.5fr 1fr;
  grid-gap: 10px;
`;

export const Step = styled.main`
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
`;

export const Select = styled.select`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 1rem;
  width: 100%;
`;

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 15.5rem));
  gap: 1rem;
  justify-content: center;
`;

export const Module = styled.div<ModuleProps>`
  display: inline-block;
  padding: 0 12px;
  perspective: 900px;
  text-align: center;

  &:hover .card {
    transform: rotateY(180deg);
  }

  .card {
    background: ${props => props.theme.colors.main};

    ${props =>
      props.selected
        ? css`
            border: 5px solid ${props.theme.colors.green};
          `
        : css`
            border: 2px solid ${props.theme.colors.mainHover};
          `}

    border-radius: 5%;

    position: relative;
    min-height: 15rem;
    transition: all 0.6s ease;
    transform-style: preserve-3d;
  }

  .front,
  .back {
    width: 100%;
    height: 100%;
    overflow-y: overlay;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;

    ::-webkit-scrollbar {
      width: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.colors.main};
    }
  }

  .front {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    color: #fff;
    padding: 0 1rem;

    i {
      font-size: 2rem;
    }
  }

  .back {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    color: #fff;
    padding: 1rem;
    transform: rotateY(180deg);

    ul {
      list-style: none;
    }

    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 4px 0;
      border-bottom: 1px solid #fff;

      i {
        font-size: 1rem;
      }

      p {
        text-align: start;
      }
    }

    button {
      height: 2rem;
    }
  }
`;

export const AlignButtonsStepTwo = styled.div`
  padding: 1rem 5rem;

  display: flex;
  align-items: center;

  gap: 1rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
