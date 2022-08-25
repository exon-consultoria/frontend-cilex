import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from 'services/api';
import { IEntry } from 'types/entry/entry';

import { NewButton,DefaultTable, Header, ButtonBack, EmptyData } from 'components'

import { Container, Main } from './styles';

export const ListEntry: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    api.get<IEntry[]>('/entry').then(response => {
      setEntries(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Contas" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/financial" />
          <div id="align-buttons">
            <NewButton to="/financial/entry/register">Novo</NewButton>
          </div>
          {entries.length > 0 ? (
            <DefaultTable tbh={['Código', 'Conta', 'Tipo']}>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.id}>
                    <td>{entry.date_income}</td>
                    <td>{entry.cash_flow}</td>
                    <td>{entry.chart_of_accounts}</td>
                    <td>{entry.date_income}</td>
                    <td>{entry.date_payed}</td>
                    <td>{entry.date_to_pay}</td>
                    <td>{entry.description}</td>
                    <td>{entry.financial_entity}</td>
                    <td>{entry.payed_status}</td>
                    <td>{entry.title_status}</td>
                    <td>{entry.type}</td>
                    <td>{entry.value}</td>
                    <td>{entry.value_payed}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/financial/entry/${entry.id}`}
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

