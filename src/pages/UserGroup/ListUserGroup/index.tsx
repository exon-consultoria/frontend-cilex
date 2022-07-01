import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import api from '../../../services/api';

import DefaultTable from '../../../components/DefaultTable';
import Header from '../../../components/Header';
import ButtonBack from '../../../components/ButtonBack';
import NewButton from '../../../components/NewButton';
import EmptyData from '../../../components/EmptyData';

import { Container, Main } from './styles';

export interface Group {
  id: string;
  code: string;
  description: string;
}

const ListUserGroup: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    api.get<Group[]>('/group').then(response => {
      setGroups(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Grupo de Usuários" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu" />
            <NewButton to="/group/register">Novo</NewButton>
            {groups.length > 0 ? (
              <DefaultTable tbh={['Código', 'Descrição']}>
                <tbody>
                  {groups.map(group => (
                    <tr key={group.id}>
                      <td>{group.code}</td>
                      <td>{group.description}</td>

                      <td>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/group/${group.id}`}
                        >
                          <FiEye size={24} color="#ff7a00" />
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
    </>
  );
};

export default ListUserGroup;
