import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import NewButton from '../../../components/NewButton';
import DefaultTable from '../../../components/DefaultTable';
import Header from '../../../components/Header';
import ButtonBack from '../../../components/ButtonBack';
import EmptyData from '../../../components/EmptyData';

import { Container, Main } from './styles';

export interface IWork {
  id: string;
  code: string;
  description: string;
  color: string;
}

const ListWork: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);

  const [works, setWorks] = useState<IWork[]>([
    { id: '1', code: '1000', description: 'Banho e Tosa', color: '#F00' },
    { id: '2', code: '2000', description: 'Hospedagem', color: '#FF0' },
    { id: '3', code: '3000', description: 'Creche', color: '#0FF' },
  ]);

  useEffect(() => {
    api.get<IWork[]>('/work').then(response => {
      setWorks(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Trabalhos" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/menu" />
          <NewButton to="/work/register">Novo</NewButton>
          {works.length > 0 ? (
            <DefaultTable tbh={['Código', 'Trabalhos']}>
              <tbody>
                {works.map(work => (
                  <tr key={work.id}>
                    <td>{work.code}</td>
                    <td>{work.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/work/${work.id}`}
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

export default ListWork;
