import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import { IApplication } from '../../../../types/storage/application';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ListApplication: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [applications, setApplications] = useState<IApplication[]>([]);

  useEffect(() => {
    api.get('/product_application').then(response => {
      setApplications(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Aplicação" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/application/register">Novo</NewButton>
          {applications.length > 0 ? (
            <DefaultTable tbh={['Código', 'Aplicação']}>
              <tbody>
                {applications.map(application => (
                  <tr key={application.id}>
                    <td>{application.code}</td>
                    <td>{application.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/application/${application.id}`}
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

export default ListApplication;
