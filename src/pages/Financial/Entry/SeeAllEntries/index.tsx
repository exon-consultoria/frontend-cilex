import React from 'react';

import { DefaultLayout } from 'components';

import { Main } from './styles';

export const SeeAllEntries: React.FC = () => {
  return (
    <DefaultLayout pageNameHeader="Ver Todas as Entradas">
      <Main>
        <div id="align-content">
          <h1>Todas as Contas</h1>
        </div>
      </Main>
    </DefaultLayout>
  );
};
