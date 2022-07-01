import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerStatusProps {
  isFocus: boolean;
  isError: boolean;
}

export const Container = styled.div<ContainerStatusProps>`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 1rem;
  width: 100%;

  display: flex;
  align-items: center;

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

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;

    ${props =>
      props.isFocus &&
      css`
        color: ${props.theme.colors.main};
      `}

    ${props =>
      props.isError &&
      css`
        color: #c53030;
      `}
  }
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
