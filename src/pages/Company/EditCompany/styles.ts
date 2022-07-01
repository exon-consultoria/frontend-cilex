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

  #company-titles {
    display: flex;
    align-items: center;
    gap: 4rem;

    text-align: center;

    @media (max-width: 900px) {
      svg {
        display: none;
      }
    }
  }

  #container-buttons-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const ContainerCompanyData = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  justify-content: space-around;
  align-items: center;

  margin: 4rem 2rem;
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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

export const Badge = styled.span`
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.main};
  padding: 5px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Select = styled.select`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 1rem;
  width: 100%;
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
`;
