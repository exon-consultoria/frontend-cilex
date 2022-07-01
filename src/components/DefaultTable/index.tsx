import React, { TableHTMLAttributes } from 'react';

import { Table, TableHead } from './styles';

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  tbh: string[] | null;
};

const DefaultTable: React.FC<TableProps> = ({ children, tbh }) => {
  return (
    <Table>
      <thead>
        <TableHead>
          {tbh && tbh.map(item => <th key={item}>{item}</th>)}
        </TableHead>
      </thead>
      {children}
    </Table>
  );
};

export default DefaultTable;
