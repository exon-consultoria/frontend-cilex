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
          to="/financial/income"
          classIcon="bi bi-cash-coin"
          title="Cadastro de contas"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/financial/entry"
          classIcon="bi bi-cash-coin"
          title="Lançamentos"
          description="Gerencie suas entradas e saídas"
        />
      </Main>
    </Container>
  );
};

export default Financial;
