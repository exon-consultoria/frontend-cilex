import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';
import { IVaccine } from '../../../../types/pet/vaccine';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ListVaccine: React.FC = () => {
  const { user } = useAuth();
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
