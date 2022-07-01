import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import { IDimension } from '../../../../types/storage/dimension';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ListDimension: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [dimensions, setDimensions] = useState<IDimension[]>([]);

  useEffect(() => {
    api.get('/product_dimension').then(response => {
      setDimensions(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Dimensão" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/dimension/register">Novo</NewButton>
          {dimensions.length > 0 ? (
            <DefaultTable tbh={['Código', 'Dimensão']}>
              <tbody>
                {dimensions.map(dimension => (
                  <tr key={dimension.id}>
                    <td>{dimension.code}</td>
                    <td>{dimension.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/dimension/${dimension.id}`}
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

export default ListDimension;
