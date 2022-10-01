import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between; 
`;

export const Content = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
`

export const Field = styled.div`
  margin: 10px 0;
  cursor: pointer;
  text-align: center;
`


export const Target = styled.div`
  display: grid;
  place-items: center;
  color: #fff;
  text-transform: uppercase;
`