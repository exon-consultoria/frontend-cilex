import React from 'react';

import Header from '../../components/Header';
import ButtonBack from '../../components/ButtonBack';
import ModuleCard from '../../components/ModuleCard';

import { Container, Main } from './styles';

const Financial: React.FC = () => {
  return (
    <Container>
      <Header pageName="Financeiro" />
      <ButtonBack destinationBack="/menu" />
      <Main>
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
        <ModuleCard
          to="/home"
          classIcon="bi bi-cash-coin"
          title="Transações"
          description="Gerencie suas entradas e saídas"
        />
      </Main>
    </Container>
  );
};

export default Financial;
