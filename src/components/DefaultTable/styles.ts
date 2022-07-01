import styled from 'styled-components';
import { shade, opacify } from 'polished';

export const Table = styled.table`
  max-width: 100%;
  min-width: 90%;
  text-align: center;
  border-spacing: 0px;
`;

export const TableHead = styled.tr`
  background-color: #ffa700;
  color: #fff;
  padding: 10px;
  font-weight: normal;

  th {
    font-weight: normal;
    padding: 5px;
  }
`;
