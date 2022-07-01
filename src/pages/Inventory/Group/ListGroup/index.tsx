import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import { IGroup } from '../../../../types/storage/group';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ListGroup: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    api.get('/product_group').then(response => {
      setGroups(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Grupo" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/group/register">Novo</NewButton>
          {groups.length > 0 ? (
            <DefaultTable tbh={['Código', 'Grupo']}>
              <tbody>
                {groups.map(group => (
                  <tr key={group.id}>
                    <td>{group.code}</td>
                    <td>{group.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/group/${group.id}`}
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

export default ListGroup;
