import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { BsList } from 'react-icons/bs';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import { IStorage } from '../../../../types/storage/storage';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ListStorage: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [storages, setStorages] = useState<IStorage[]>([]);

  useEffect(() => {
    api.get('/storage').then(response => {
      setStorages(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Estoque" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/storage/register">Novo</NewButton>
          {storages.length > 0 ? (
            <DefaultTable tbh={['Código', 'Estoque', 'Ações']}>
              <tbody>
                {storages.map(storage => (
                  <tr key={storage.id}>
                    <td>{storage.code}</td>
                    <td>{storage.description}</td>
                    <td id="align-action-icons">
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/storage/${storage.id}`}
                      >
                        <FiEye size={24} color={colors.main} />
                      </Link>
                      {/* <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/consult/${storage.id}`}
                      >
                        <BsList size={24} color={colors.main} />
                      </Link> */}
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

export default ListStorage;
