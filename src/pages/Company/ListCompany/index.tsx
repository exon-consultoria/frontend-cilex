import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import ButtonBack from '../../../components/ButtonBack';
import NewButton from '../../../components/NewButton';
import DefaultTable from '../../../components/DefaultTable';
import ChangeCompany from '../../../components/ChangeCompany';
import Header from '../../../components/Header';
import EmptyData from '../../../components/EmptyData';

import { Container, Main } from './styles';

export interface Icompany {
  id: string;
  code: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
}

const ListCompany: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { user } = useAuth();

  const [companies, setCompanies] = useState<Icompany[]>([]);

  useEffect(() => {
    api.get<Icompany[]>('/company').then(response => {
      setCompanies(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Empresas" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu" />
            <NewButton to="/company/register">Novo</NewButton>
            {companies.length > 0 ? (
              <DefaultTable
                tbh={['Código', 'CNPJ', 'Razão Social', 'Nome Fantasia']}
              >
                <tbody>
                  {companies &&
                    companies.map(company => (
                      <tr key={company.id}>
                        <td>{company.code}</td>
                        <td>{company.cnpj}</td>
                        <td>{company.razao_social}</td>
                        <td>{company.nome_fantasia}</td>
                        <td>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/company/${company.id}`}
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

export default ListCompany;
