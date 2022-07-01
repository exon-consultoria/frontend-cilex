import React from 'react';

import DefaultLayout from '../../../../components/DefaultLayout';

import { Main } from './styles';

const SeeAllEnclosures: React.FC = () => {
  return (
    <DefaultLayout pageNameHeader="Ver Todos Canis">
      <Main>
        <div id="align-content">
          <h1>Todos Canis</h1>
        </div>
      </Main>
    </DefaultLayout>
  );
};

export default SeeAllEnclosures;
