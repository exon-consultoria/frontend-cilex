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

  #align-button-save {
    width: 50%;
    margin-right: auto;
    margin-top: 10px;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  .select-custom {
    border: 2px solid #666360;
    border-radius: 10px;

    padding: 1rem;
    width: 100%;
  }
`;

export const ContainerListModules = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  div.content-modules {
    border: 2px solid #666360;
    border-radius: 10px;

    padding: 1rem;
    width: 100%;

    h3 {
      color: ${props => props.theme.colors.main};
    }

    ul {
      list-style: none;
      margin-top: 1rem;

      li {
        margin-left: 0.2rem;
        margin-top: 0.3rem;

        button {
          border: none;
          background-color: transparent;

          .bi {
            color: ${props => props.theme.colors.main};
            font-size: 1rem;
            margin: 0.3rem;
          }
        }
      }
    }
  }
`;
