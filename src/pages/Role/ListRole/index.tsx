import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from 'services/api';

import { NewButton, DefaultTable, Header, ButtonBack, EmptyData, ChangeCompany} from 'components';


import { Container, Main } from './styles';

export interface IRole {
  id: string;
  code: string;
  role: string;
  description: string;
}

const ListRole: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    api.get<IRole[]>('/role').then(response => {
      setRoles(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Cargos e Funções" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu" />
            <NewButton to="/role/register">Novo</NewButton>
            {roles.length > 0 ? (
              <DefaultTable tbh={['Código', 'Cargo', 'Função']}>
                <tbody>
                  {roles.map(role => (
                    <tr key={role.id}>
                      <td>{role.code}</td>
                      <td>{role.role}</td>
                      <td>{role.description}</td>
                      <td>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/role/${role.id}`}
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
      <ChangeCompany />
    </>
  );
};

export default ListRole;
