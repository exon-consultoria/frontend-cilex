import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface StatusProps {
  isFocus: boolean;
  isError: boolean;
}

export const Container = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;

  width: 100%;

  border: 2px solid #666360;
  border-radius: 10px;

  ${props =>
    props.isFocus &&
    css`
      border-color: ${props.theme.colors.main};
    `}

  ${props =>
    props.isError &&
    css`
      border-color: #c53030;
    `}
`;

export const SelectStyle = styled.select<StatusProps>`
  border: none;
  border-radius: 10px;

  width: 100%;
  padding: 1rem;

  ${props =>
    props.isError &&
    css`
      width: 90%;
    `}
`;

export const Error = styled(Tooltip)`
  height: 1.25rem;
  margin-right: 0.5rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
