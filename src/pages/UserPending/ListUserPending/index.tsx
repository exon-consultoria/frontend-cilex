import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from '../../../services/api';

import Header from '../../../components/Header';
import ButtonBack from '../../../components/ButtonBack';
import DefaultTable from '../../../components/DefaultTable';
import EmptyData from '../../../components/EmptyData';

import { Container, Main } from './styles';

interface UsersPending {
  id: string;
  person: {
    code: string;
    nome: string;
  };
}

const ListUserPending: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [usersPending, setUsersPending] = useState<UsersPending[]>([]);

  useEffect(() => {
    api.get('/pendinguser').then(response => {
      setUsersPending(response.data);
    });

    localStorage.removeItem('@Cilex:hasPendingUser');
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Usuários Pendentes" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu/users" />
            {usersPending.length > 0 ? (
              <DefaultTable tbh={['ID', 'Nome']}>
                <tbody>
                  {usersPending.map(user => (
                    <tr key={user.id}>
                      <td>{user.person.code}</td>
                      <td>{user.person.nome}</td>
                      <td>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/user/pending/${user.id}`}
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

export default ListUserPending;
