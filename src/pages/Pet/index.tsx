import React from 'react';

import Header from '../../components/Header';
import ButtonBack from '../../components/ButtonBack';
import ModuleCard from '../../components/ModuleCard';

import { Container, Main } from './styles';

const Inventory: React.FC = () => {
  return (
    <Container>
      <Header pageName="Pet" />
      <ButtonBack destinationBack="/menu" />
      <Main>
        <ModuleCard
          to="/pet/pets"
          classIcon="fas fa-paw"
          title="Pets"
          description="Gerencie seus pets"
        />
        <ModuleCard
          to="/pet/vaccine"
          classIcon="fas fa-syringe"
          title="Vacinas"
          description="Gerencie suas vacinas"
        />
        <ModuleCard
          to="/pet/enclosure"
          classIcon="fas fa-map-marker-alt"
          title="Canis"
          description="Gerencie seus canis"
        />
      </Main>
    </Container>
  );
};

export default Inventory;
