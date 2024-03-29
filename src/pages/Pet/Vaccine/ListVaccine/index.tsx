import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from 'services/api';
import { IVaccine } from 'types/pet/vaccine';

import { NewButton, DefaultTable, Header, ButtonBack, EmptyData} from 'components';


import { Container, Main } from './styles';

const ListVaccine: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [vaccines, setVaccines] = useState<IVaccine[]>([]);

  useEffect(() => {
    api.get<IVaccine[]>('/vaccine').then(response => {
      setVaccines(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Vacinas" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/pet" />
          <NewButton to="/pet/vaccine/register">Novo</NewButton>
          {vaccines.length > 0 ? (
            <DefaultTable tbh={['Código', 'Vacina']}>
              <tbody>
                {vaccines.map(vaccine => (
                  <tr key={vaccine.id}>
                    <td>{vaccine.code}</td>
                    <td>{vaccine.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/pet/vaccine/${vaccine.id}`}
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

export default ListVaccine;
