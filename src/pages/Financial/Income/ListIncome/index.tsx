import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from 'services/api';
import { IIncome } from 'types/Income/income';

import { NewButton,DefaultTable, Header, ButtonBack, EmptyData } from 'components'

import { Container, Main } from './styles';

export const ListIncome: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [incomes, setIncomes] = useState<IIncome[]>([]);

  useEffect(() => {
    api.get<IIncome[]>('/income').then(response => {
      setIncomes(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Contas" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/financial" />
          <div id="align-buttons">
            <NewButton to="/financial/income/register">Novo</NewButton>
          </div>
          {incomes.length > 0 ? (
            <DefaultTable tbh={['Código', 'Conta', 'Tipo']}>
              <tbody>
                {incomes.map(income => (
                  <tr key={income.id}>
                    <td>{income.code}</td>
                    <td>{income.account}</td>
                    <td>{income.type}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/financial/income/${income.id}`}
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

