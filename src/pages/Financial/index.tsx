import React from 'react';

import { Header, ButtonBack, ModuleCard } from 'components'

import { Container, Main } from './styles';

const Financial: React.FC = () => {
  return (
    <Container>
      <Header pageName="Financeiro" />
      <ButtonBack destinationBack="/menu" />
      <Main>
        <ModuleCard
          to="/Financial/Income"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
      </Main>
    </Container>
  );
};

export default Financial;
