import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface ServiceIdentifierProps {
  color: string;
}

interface ContainerProps {
  done?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 80%;
  margin: 0 auto;
  padding: 1rem;

  background: ${props =>
    `linear-gradient(to right, ${props.theme.colors.mainHover}, #FBFBFB)`};
  border-radius: 1rem;

  /* ${props =>
    props.done &&
    css`
      border: 2px solid ${props.theme.colors.green};
    `} */
`;

export const InsideContainer = styled.div`
  width: 80%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

export const ServiceIdentifier = styled.div<ServiceIdentifierProps>`
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
  background: ${props => props.color};
`;

export const AlignTexts = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 0.5rem;
`;

export const ContainerButtonsActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ButtonActions = styled.button`
  border: none;
  background: transparent;

  display: grid;
  align-items: center;
`;

export const FormCustom = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;

  margin: 1rem;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;

    margin-bottom: 1rem;
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
    width: 80%;
    padding: 0.275rem;
    border: 1px solid ${lighten(0.5, '#666360')};
    border-radius: 10px;
  }
`;

export const ContainerButtonsModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  margin-top: 3rem;
`;
