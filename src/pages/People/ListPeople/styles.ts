import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  margin-top: 2rem;

  #align-content {
    width: 95%;

    padding: 0 2rem;

    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  td#td-options {
    display: flex;
    margin-left: 1rem;
    gap: 1rem;

    #share {
      background-color: transparent;
      border: none;
    }
  }
`;

// MODAL SHARE
export const ContentModalShare = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContainerContentModalShare = styled.div`
  width: 100%;
  margin: 2rem 0;

  max-height: 50vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  #row-share {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    padding: 0 1rem;

    .MuiCheckbox-colorPrimary:hover {
      background-color: transparent;
    }
  }
`;
