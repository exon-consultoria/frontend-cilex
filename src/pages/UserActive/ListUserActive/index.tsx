import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from 'services/api';

import { DefaultTable, Header, ButtonBack, EmptyData } from 'components';


import { Container, Main } from './styles';

interface User {
  id: string;
  name: string;
  isActive: boolean;
}

const ListUserActive: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get('/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Usuários Ativos" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu/users" />
            {users.length > 0 ? (
              <DefaultTable tbh={['Nome', 'Ativo ?']}>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.isActive === true ? 'Sim' : 'Não'}</td>
                      <td>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/user/${user.id}`}
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
    </>
  );
};

export default ListUserActive;
