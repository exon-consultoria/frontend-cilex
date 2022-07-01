import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import { IType } from '../../../../types/storage/type';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ListType: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [types, setTypes] = useState<IType[]>([]);

  useEffect(() => {
    api.get('/product_type').then(response => {
      setTypes(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Tipo" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/type/register">Novo</NewButton>
          {types.length > 0 ? (
            <DefaultTable tbh={['Código', 'Tipo', 'Aceita Estrutura?']}>
              <tbody>
                {types.map(type => (
                  <tr key={type.id}>
                    <td>{type.code}</td>
                    <td>{type.description}</td>
                    <td>{type.accept_structure === true ? 'Sim' : 'Não'}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/type/${type.id}`}
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

export default ListType;
