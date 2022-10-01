import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from 'services/api';

import { NewButton, DefaultTable, Header, ButtonBack, EmptyData} from 'components';


import { Container, Main } from './styles';

export interface IPets {
  id: string;
  name: string;
  breed: string;
  gender: string;
  castrated: boolean;
  size: string;
}

const ListPet: React.FC = () => {
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
            <DefaultTable tbh={['Nome', 'Raça', 'Castrado ?', 'Porte']}>
              <tbody>
                {pets.map(pet => (
                  <tr key={pet.id}>
                    <td>{pet.name}</td>
                    <td>{pet.breed}</td>
                    <td>{pet.castrated ? 'Sim' : 'Não'}</td>
                    <td>{pet.size}</td>
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
