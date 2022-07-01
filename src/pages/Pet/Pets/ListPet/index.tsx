import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import ChangeCompany from '../../../../components/ChangeCompany';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

export interface IPets {
  id: string;
  name: string;
  breed: string;
  gender: string;
  castrated: boolean;
}

const ListPet: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);

  const [pets, setPets] = useState<IPets[]>([]);

  useEffect(() => {
    api.get<IPets[]>('/pet').then(response => {
      setPets(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Pets" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/pet" />
          <NewButton to="/pet/pets/register">Novo</NewButton>
          {pets.length > 0 ? (
            <DefaultTable tbh={['Nome', 'Raça', 'Castrado ?']}>
              <tbody>
                {pets.map(pet => (
                  <tr key={pet.id}>
                    <td>{pet.name}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.castrated ? 'Sim' : 'Não'}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/pet/pets/${pet.id}`}
                      >
                        <FiEye size={24} color={colors.main} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DefaultTable>
          ) : (
            <EmptyData />
          )}
        </div>
      </Main>
    </Container>
  );
};

export default ListPet;
