import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from 'services/api';
import { IEntry } from 'types/entry/entry';

import { NewButton,DefaultTable, Header, ButtonBack, EmptyData } from 'components'

import { Container, Main } from './styles';
import { IIncome } from 'types/Income/income';

export const ListEntry: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [entries, setEntries] = useState<IEntry[]>([]);
  const [incomes, setIncomes] = useState<IIncome[]>([]);

  useEffect(() => {
    api.get<IEntry[]>('/entry').then(response => {
      setEntries(response.data);
    });
    api.get<IIncome[]>('/income').then(response => {
      setIncomes(response.data);
    });
  }, []);

  const findIncome = (id:string | undefined) => { 
    const income = incomes.find((income) => income.id === id)
    return income?.account
  }

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
            <DefaultTable tbh={[
              'Data do lançamento',
              'tipo',
              'Entidade Financeira',
              'Plano de contas',
              'Descrição', 
              'Valor',
              'Vencimento',
              'Valor Baixa',
              'Data Baixa',
              'Status do titulo',
              'Status Baixa',
              'Fluxo de caixa',
            ]}>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.id}>
                    <td>{entry.date_income}</td>
                    <td>{entry.type}</td>
                    <td>{entry.financial_entity}</td>
                    <td>{findIncome(entry.income_id)}</td>
                    <td>{entry.description}</td>
                    <td>{entry.value}</td>
                    <td>{entry.date_to_pay}</td>
                    <td>{entry.value_payed}</td>
                    <td>{entry.date_payed}</td>
                    <td>{entry.title_status}</td>
                    <td>{entry.payed_status}</td>
                    <td>{entry.cash_flow}</td>
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

