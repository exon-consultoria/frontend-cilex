import { lighten } from 'polished'
import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  margin-top: 2rem;

  .money {
   height: 27px;
   text-align: center;
  }

  #align-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;

    button:last-child {
      background-color: #8dc73e;
      color: #fff;
      padding: 0.5rem;
      border: none;
      border-radius: 5%;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1rem;

      width: 8rem;
      height: 3rem;
    }
  }

  #align-content {
    width: 95%;

    padding: 0 2rem;

    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ContainerInputWithLabel = styled.div`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  input {
    padding: 0.275rem;
    border: 1px solid ${lighten(0.5, '#666360')};
    border-radius: 10px;
  }
`;

export const TotalCashFlow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

type CashFlowTextProps = {
  balance: 'positive' | 'negative'
}

export const CashFlowText = styled.div<CashFlowTextProps>`
  width: 200px;
  height: 100px;
  border-radius: 16px;
  background-color: ${props => props.balance === 'positive' ? '#8dc73e' : 'red'};
  display: grid;
  place-items: center;
  text-align: center;
  color: #fff;
  font-weight: bold;
`